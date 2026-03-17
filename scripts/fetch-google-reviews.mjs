// Fetch Google Maps reviews into public/data/google-reviews.json
//
// NOTE:
// - This script uses Playwright to render Google Maps (JS-heavy) and extract visible reviews.
// - Google may show consent dialogs or rate-limit scraping. The site UI has graceful fallbacks.
//
// Run: pnpm fetch:reviews

import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
// Playwright is available in the sandbox environment.
// We load it via require() to avoid ESM resolution issues.
const { chromium } = require("playwright");

const OUT_PATH = path.resolve("public/data/google-reviews.json");
const MAPS_URL = "https://maps.app.goo.gl/yfBRjfcRRfpuudui9";

function nowIso() {
  return new Date().toISOString();
}

function safeTrim(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

async function main() {
  // Use system Chrome to avoid Playwright browser downloads in some environments.
  const browser = await chromium.launch({ headless: true, channel: "chrome" });
  const context = await browser.newContext({
    locale: "pl-PL",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
  });
  const page = await context.newPage();

  try {
    await page.goto(MAPS_URL, { waitUntil: "domcontentloaded", timeout: 60_000 });

    // Cookie consent (Polish / English)
    const consent = page
      .getByRole("button", { name: /Zaakceptuj wszystko|Accept all|Zgadzam się|I agree/i })
      .first();
    if (await consent.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await consent.click();
      await page.waitForTimeout(800);
    }

    // Open reviews panel
    const reviewsBtn = page
      .locator(
        "button[aria-label*='opini'], button[aria-label*='reviews'], a[aria-label*='opini'], a[aria-label*='reviews']"
      )
      .first();

    if (await reviewsBtn.isVisible({ timeout: 15_000 }).catch(() => false)) {
      await reviewsBtn.click();
      await page.waitForTimeout(1200);
    }

    // Scroll reviews container to load more
    const container = page.locator("div[role='region']").first();
    if (await container.isVisible({ timeout: 10_000 }).catch(() => false)) {
      for (let i = 0; i < 6; i++) {
        await container.evaluate((el) => {
          el.scrollBy(0, 1200);
        });
        await page.waitForTimeout(900);
      }
    }

    const reviewNodes = page.locator("div[data-review-id]");
    const count = await reviewNodes.count();

    const reviews = [];
    for (let i = 0; i < Math.min(count, 12); i++) {
      const node = reviewNodes.nth(i);
      const id = (await node.getAttribute("data-review-id")) || `r${i}`;

      const authorName = safeTrim(
        await node
          .locator(".d4r55")
          .first()
          .innerText()
          .catch(() => "")
      );

      const authorUrl = await node
        .locator("a[href*='contrib']")
        .first()
        .getAttribute("href")
        .then((href) => (href ? new URL(href, "https://www.google.com").toString() : undefined))
        .catch(() => undefined);

      const ratingLabel = safeTrim(
        await node
          .locator("span[role='img']")
          .first()
          .getAttribute("aria-label")
          .catch(() => "")
      );
      const ratingMatch = ratingLabel.match(/([0-9]+([\.,][0-9]+)?)\s*(gwiazd|star)/i);
      const rating = ratingMatch ? Number(ratingMatch[1].replace(",", ".")) : 0;

      const relativeTime = safeTrim(
        await node
          .locator(".rsqaWe")
          .first()
          .innerText()
          .catch(() => "")
      );

      // Expand "Więcej" if present
      const more = node.getByRole("button", { name: /Więcej|More/i }).first();
      if (await more.isVisible().catch(() => false)) {
        await more.click().catch(() => null);
        await page.waitForTimeout(150);
      }

      const text = safeTrim(
        await node
          .locator("span[jsname='bN97Pc'], span[jsname='fbQN7e']")
          .first()
          .innerText()
          .catch(() => "")
      );

      // Review photos (best-effort)
      const photos = [];
      const photoNodes = node.locator("img[src*='googleusercontent.com']");
      const pcount = await photoNodes.count();
      for (let j = 0; j < Math.min(pcount, 6); j++) {
        const src = await photoNodes.nth(j).getAttribute("src");
        if (src && !photos.includes(src)) photos.push(src);
      }

      // Keep only meaningful reviews
      if (authorName || text) {
        reviews.push({ id, authorName: authorName || "Klient", authorUrl, rating, relativeTime, text, photos });
      }
    }

    const payload = {
      updatedAt: nowIso(),
      source: MAPS_URL,
      reviews,
    };

    await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
    await fs.writeFile(OUT_PATH, JSON.stringify(payload, null, 2), "utf-8");

    console.log(`Saved ${reviews.length} reviews → ${OUT_PATH}`);
  } catch (e) {
    console.error("Review fetch failed:", e);
    // Keep existing file, but ensure it exists
    try {
      await fs.access(OUT_PATH);
    } catch {
      await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
      await fs.writeFile(OUT_PATH, JSON.stringify({ updatedAt: null, reviews: [] }, null, 2), "utf-8");
    }
    process.exitCode = 1;
  } finally {
    await page.close().catch(() => null);
    await context.close().catch(() => null);
    await browser.close().catch(() => null);
  }
}

main();
