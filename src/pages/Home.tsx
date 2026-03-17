/*
  Page: Home (Landing)
  Design system reminder:
  - Warm Minimal Luxury (Japandi x European boutique spa)
  - Asymmetry, generous whitespace, tactile surfaces, terracotta accent
*/

import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { motion, type Variants } from "framer-motion";
import { toast } from "sonner";

import heroImg from "@/assets/hero-warm-spa.png";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Sparkles,
  Facebook,
  ArrowRight,
  Leaf,
  ShieldCheck,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

interface HomeProps {
  targetSection?: string;
}

type GoogleReview = {
  id: string;
  authorName: string;
  authorUrl?: string;
  rating: number;
  relativeTime?: string;
  text?: string;
  photos?: string[];
};

const BRAND = {
  name: "Day SPA Aleksandra Mazur",
  rating: 4.8,
  ratingCount: 35,
  address: "Górskiego Ochotniczego Pogotowia Ratunkowego 46, 85-794 Bydgoszcz, Poland",
  phone: "+48 794 246 774",
  womenOwned: true,
  mapsUrl: "https://maps.app.goo.gl/yfBRjfcRRfpuudui9",
  facebookUrl: "https://www.facebook.com/KosmetykaProfesjonalnaIMasazAleksandraMazur",
  hours: [
    { label: "Poniedziałek–Piątek", value: "8:30–19:00" },
    { label: "Sobota", value: "10:00–14:00" },
    { label: "Niedziela", value: "Zamknięte" },
  ],
};

function useScrollToSection(targetSection?: string) {
  useEffect(() => {
    if (!targetSection) return;
    window.setTimeout(() => {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }, [targetSection]);
}

function SectionTitle({ overline, title, desc }: { overline: string; title: string; desc?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span className="inline-block h-[1px] w-6 bg-border" />
        <span>{overline}</span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl mt-3 leading-[1.05] text-balance">{title}</h2>
      {desc ? <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{desc}</p> : null}
    </div>
  );
}

function Nav() {
  const items = [
    { id: "start", label: "Start" },
    { id: "o-nas", label: "O nas" },
    { id: "uslugi", label: "Usługi" },
    { id: "opinie", label: "Opinie" },
    { id: "kontakt", label: "Kontakt" },
  ] as const;

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 border border-border flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base">{BRAND.name}</div>
              <div className="text-[11px] text-muted-foreground">Bydgoszcz • kosmetyka & masaż</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <Link
                key={it.id}
                href={`/${it.id}`}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/60 transition"
              >
                {it.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="shadow-soft"
              onClick={() => {
                document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Umów wizytę
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RatingPill() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-card/70 border border-border px-3 py-1.5 shadow-soft">
      <Star className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium">{BRAND.rating.toFixed(1)}</span>
      <span className="text-xs text-muted-foreground">({BRAND.ratingCount} opinii)</span>
    </div>
  );
}

function InfoGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <Card className="p-5 bg-card/70 shadow-soft">
        <div className="flex items-start gap-3">
          <div className="mt-1 h-9 w-9 rounded-lg bg-primary/10 border border-border flex items-center justify-center">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">Adres</div>
            <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{BRAND.address}</div>
            <div className="mt-3">
              <a className="inline-flex items-center gap-1 text-sm text-primary hover:underline" href={BRAND.mapsUrl} target="_blank" rel="noreferrer">
                Otwórz w Google Maps <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-card/70 shadow-soft">
        <div className="flex items-start gap-3">
          <div className="mt-1 h-9 w-9 rounded-lg bg-primary/10 border border-border flex items-center justify-center">
            <Phone className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">Telefon</div>
            <a className="text-sm text-muted-foreground mt-1 inline-block hover:text-foreground" href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}>
              {BRAND.phone}
            </a>
            <div className="mt-3">
              <a className="inline-flex items-center gap-1 text-sm text-primary hover:underline" href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}>
                Zadzwoń teraz <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-card/70 shadow-soft sm:col-span-2 lg:col-span-1">
        <div className="flex items-start gap-3">
          <div className="mt-1 h-9 w-9 rounded-lg bg-primary/10 border border-border flex items-center justify-center">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div className="w-full">
            <div className="text-sm font-medium">Godziny otwarcia</div>
            <div className="mt-2 space-y-1">
              {BRAND.hours.map((h) => (
                <div key={h.label} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{h.label}</span>
                  <span className="font-medium">{h.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ReviewCard({ r }: { r: GoogleReview }) {
  const stars = Math.max(0, Math.min(5, Math.round(r.rating)));
  return (
    <Card className="p-5 bg-card/70 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium">{r.authorName || "Klient"}</div>
          <div className="mt-1 flex items-center gap-1 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn("h-4 w-4", i < stars ? "fill-primary" : "fill-transparent opacity-30")} />
            ))}
            {r.relativeTime ? <span className="ml-2 text-xs text-muted-foreground">{r.relativeTime}</span> : null}
          </div>
        </div>
        {r.authorUrl ? (
          <a className="text-xs text-muted-foreground hover:text-foreground" href={r.authorUrl} target="_blank" rel="noreferrer">
            Profil <ExternalLink className="inline-block h-3 w-3 ml-1" />
          </a>
        ) : null}
      </div>

      {r.text ? <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.text}</p> : null}

      {r.photos?.length ? (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {r.photos.slice(0, 3).map((p) => (
            <a key={p} href={p} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-lg border border-border">
              <img src={p} alt="Zdjęcie z opinii" className="h-20 w-full object-cover hover:scale-[1.03] transition" loading="lazy" />
            </a>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

function GoogleReviews() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<GoogleReview[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        // Filled by our scraper (Task 3). If empty/unavailable, we gracefully fall back.
        const res = await fetch("./data/google-reviews.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { updatedAt?: string; reviews: GoogleReview[] };
        if (!alive) return;
        setReviews(data.reviews || []);
      } catch {
        if (!alive) return;
        setError("Nie udało się wczytać opinii automatycznie.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <RatingPill />
          {BRAND.womenOwned ? (
            <Badge variant="secondary" className="gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> women-owned
            </Badge>
          ) : null}
        </div>
        <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
          Zobacz wszystkie opinie <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {loading ? (
        <div className="mt-6 grid md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-5 bg-card/70 shadow-soft">
              <div className="h-3 w-24 bg-muted rounded" />
              <div className="mt-3 h-3 w-40 bg-muted rounded" />
              <div className="mt-4 h-20 bg-muted rounded" />
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="mt-6 p-6 bg-card/70 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-border flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Opinie z Google</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {error} Jeśli widzisz blokadę lub puste dane, otwórz kartę Google Maps — tam opinie i zdjęcia
                są zawsze aktualne.
              </p>
            </div>
          </div>
        </Card>
      ) : reviews.length === 0 ? (
        <Card className="mt-6 p-6 bg-card/70 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-border flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Opinie z Google</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Nie udało się pobrać treści opinii w tej chwili. Kliknij w Google Maps, aby zobaczyć aktualne recenzje i zdjęcia.
              </p>
              <div className="mt-3">
                <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  Otwórz Google Maps <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="mt-6 grid md:grid-cols-3 gap-3">
          {reviews.slice(0, 6).map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Uwaga: sekcja opinii jest pobierana automatycznie (bez kluczy API) i może być okresowo ograniczana przez Google.
      </p>
    </div>
  );
}

function FacebookEmbed() {
  // NOTE: Facebook often blocks iframe embedding (X-Frame-Options). To keep the site robust,
  // we present a premium "social preview" card and link out to the official page.

  return (
    <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
      <Card className="p-6 bg-card/70 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-medium">Facebook • aktualności</div>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Zobacz najnowsze wpisy, rolki i ogłoszenia na oficjalnej stronie (otwiera się w nowej karcie).
            </p>
          </div>
          <a className="text-sm text-primary hover:underline inline-flex items-center gap-1" href={BRAND.facebookUrl} target="_blank" rel="noreferrer">
            Otwórz <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <Separator className="my-5" />

        <div className="grid sm:grid-cols-2 gap-3">
          <Card className="p-5 bg-background/60 border-border shadow-soft">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-10 w-10 rounded-xl bg-primary/10 border border-border flex items-center justify-center">
                <Facebook className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium">{BRAND.name}</div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Aktualności, promocje, terminy — kliknij i obserwuj.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-background/60 border-border shadow-soft">
            <div className="text-sm font-medium">Szybkie akcje</div>
            <div className="mt-3 grid gap-2">
              <a href={BRAND.facebookUrl} target="_blank" rel="noreferrer">
                <Button className="w-full" variant="outline">
                  Napisz na Facebooku
                </Button>
              </a>
              <a href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}>
                <Button className="w-full">Zadzwoń</Button>
              </a>
            </div>
          </Card>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Uwaga: część treści Facebooka może wymagać zgody na pliki cookie lub zalogowania.
        </p>
      </Card>

      <div className="space-y-3">
        <Card className="p-6 bg-card/70 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-10 w-10 rounded-xl bg-primary/10 border border-border flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Atmosfera</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Cisza, ciepło i uważny dotyk. Dbamy o komfort i prywatność — od wejścia po ostatni oddech.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/70 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-10 w-10 rounded-xl bg-primary/10 border border-border flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Podejście</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Kosmetyka profesjonalna i masaż w jednym miejscu. Efekt ma wyglądać naturalnie — a Ty masz poczuć się lekko.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/70 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-10 w-10 rounded-xl bg-primary/10 border border-border flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Kameralnie • women-owned</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Miejsce prowadzone przez kobietę — dla osób, które cenią jakość, spokój i dyskrecję.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const mapsEmbed = useMemo(() => {
    const q = encodeURIComponent(BRAND.address);
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, []);

  function submit() {
    const text = `Rezerwacja — ${BRAND.name}\nImię: ${name}\nKontakt: ${contact}\nWiadomość: ${message}`;
    navigator.clipboard?.writeText(text).catch(() => null);
    toast.success("Skopiowano treść zapytania. Zadzwoń lub wyślij wiadomość — pomożemy dobrać termin.");
    // Focus call button area
    document.getElementById("call-actions")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="mt-8 grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
      <Card className="p-6 bg-card/70 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-medium">Kontakt i rezerwacje</div>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Formularz poniżej kopiuje treść zapytania (bez backendu). Najszybciej: zadzwoń.
            </p>
          </div>
          <a className="text-sm text-primary hover:underline inline-flex items-center gap-1" href={BRAND.facebookUrl} target="_blank" rel="noreferrer">
            Facebook <Facebook className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-5 grid gap-3">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Imię" />
          <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Telefon lub e-mail" />
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Usługa / preferowany termin / pytania" rows={5} />
          <Button onClick={submit} disabled={!name || !contact} className="shadow-soft">
            Wyślij zapytanie
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-xs text-muted-foreground">
            Po kliknięciu skopiujemy tekst zapytania — możesz go wkleić w wiadomość na Facebooku lub w SMS.
          </p>
        </div>

        <Separator className="my-5" />

        <div id="call-actions" className="flex flex-col sm:flex-row gap-2">
          <a className="flex-1" href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}>
            <Button className="w-full" variant="default">
              Zadzwoń: {BRAND.phone}
            </Button>
          </a>
          <a className="flex-1" href={BRAND.mapsUrl} target="_blank" rel="noreferrer">
            <Button className="w-full" variant="outline">
              Nawiguj w Google Maps
            </Button>
          </a>
        </div>
      </Card>

      <Card className="p-3 bg-card/70 shadow-soft overflow-hidden">
        <iframe title="Mapa" src={mapsEmbed} className="w-full h-[460px] rounded-xl" loading="lazy" />
      </Card>
    </div>
  );
}

export default function Home({ targetSection }: HomeProps) {
  useScrollToSection(targetSection);

  const stagger: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as any },
    },
  };

  return (
    <div className="min-h-screen">
      <Nav />

      {/* HERO */}
      <section id="start" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Wnętrze spa" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/55 to-background" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16">
          <div className="grid lg:grid-cols-[0.62fr_0.38fr] gap-8 items-end">
            <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
              <motion.div variants={stagger} className="inline-flex items-center gap-2">
                <RatingPill />
                {BRAND.womenOwned ? (
                  <Badge variant="secondary" className="gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> women-owned
                  </Badge>
                ) : null}
              </motion.div>

              <motion.h1 variants={stagger} className="mt-5 font-display text-5xl sm:text-6xl leading-[0.92] text-balance">
                Ciepły spokój.
                <br />
                Luksus bez pośpiechu.
              </motion.h1>

              <motion.p variants={stagger} className="mt-5 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                {BRAND.name} to kameralne Day SPA w Bydgoszczy — profesjonalna kosmetyka i masaż, zaprojektowane tak, abyś
                poczuł(a) się lekko, czysto i pięknie.
              </motion.p>

              <motion.div variants={stagger} className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button
                  className="shadow-glow"
                  onClick={() => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Umów wizytę
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <a href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}>
                  <Button variant="outline" className="bg-background/60">
                    Zadzwoń
                    <Phone className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </motion.div>

              <motion.div variants={stagger} className="mt-9 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {BRAND.address}
                </span>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <Card className="p-6 bg-card/80 shadow-glow">
                <div className="text-sm font-medium">Dziś w skrócie</div>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Telefon</span>
                    <a className="font-medium hover:underline" href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}>
                      {BRAND.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Pon.–Pt.</span>
                    <span className="font-medium">8:30–19:00</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Sobota</span>
                    <span className="font-medium">10:00–14:00</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Niedziela</span>
                    <span className="font-medium">Zamknięte</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  Nawiguj <ExternalLink className="h-4 w-4" />
                </a>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="o-nas" className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
          <SectionTitle
            overline="O nas"
            title="Miejsce, w którym ciało odpoczywa — a twarz odzyskuje świeżość"
            desc="Skupiamy się na detalach: technice, rytmie i komforcie. Celem jest efekt widoczny, ale naturalny — oraz relaks, który zostaje z Tobą na dłużej."
          />

          <div className="grid sm:grid-cols-2 gap-3">
            <Card className="p-6 bg-card/70 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-10 w-10 rounded-xl bg-primary/10 border border-border flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Profesjonalna kosmetyka</div>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Pielęgnacja dobrana do skóry — bez pośpiechu, z dbałością o komfort i higienę.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/70 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-10 w-10 rounded-xl bg-primary/10 border border-border flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Masaż i rytuały</div>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Techniki relaksacyjne i liftingujące — dla rozluźnienia, lekkości i harmonii.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/70 shadow-soft sm:col-span-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-10 w-10 rounded-xl bg-primary/10 border border-border flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Kameralnie, spokojnie, elegancko</div>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Wnętrze i obsługa są zaprojektowane tak, by dać poczucie prywatności. To przestrzeń, w której łatwiej zwolnić.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="uslugi" className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <SectionTitle
          overline="Usługi"
          title="Kosmetyka i masaż — w jakości boutique"
          desc="Poniżej znajdziesz przykładowe kategorie usług. Dokładny dobór zabiegu i czas trwania ustalamy podczas kontaktu." 
        />

        <div className="mt-8 grid lg:grid-cols-3 gap-3">
          {[
            {
              title: "Masaże relaksacyjne",
              desc: "Rozluźnienie napięć, wyciszenie, lekkość w ciele.",
              icon: <Leaf className="h-5 w-5 text-primary" />,
            },
            {
              title: "Masaże twarzy",
              desc: "Rytuały liftingujące i drenujące — dla świeżości rysów.",
              icon: <Sparkles className="h-5 w-5 text-primary" />,
            },
            {
              title: "Kosmetyka profesjonalna",
              desc: "Pielęgnacja i zabiegi dopasowane do potrzeb skóry.",
              icon: <ShieldCheck className="h-5 w-5 text-primary" />,
            },
          ].map((c) => (
            <Card key={c.title} className="p-6 bg-card/70 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-10 w-10 rounded-xl bg-primary/10 border border-border flex items-center justify-center">
                  {c.icon}
                </div>
                <div>
                  <div className="text-sm font-medium">{c.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <InfoGrid />
        </div>
      </section>

      {/* REVIEWS */}
      <section id="opinie" className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <SectionTitle overline="Opinie" title="Prawdziwe wrażenia klientów" desc="Opinie i zdjęcia (jeśli dostępne) są pobierane z Google Maps." />
        <GoogleReviews />
      </section>

      {/* SOCIAL */}
      <section id="social" className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <SectionTitle overline="Społeczność" title="Zobacz naszą codzienność" desc="Aktualności, zapowiedzi i kulisy pracy." />
        <FacebookEmbed />
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <SectionTitle overline="Kontakt" title="Umów wizytę — szybko i wygodnie" desc="Zadzwoń lub napisz. Podpowiemy najlepszy termin i dobór zabiegu." />
        <Contact />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <div className="font-display text-lg">{BRAND.name}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{BRAND.address}</p>
              <p className="mt-2 text-sm">
                <a className="text-primary hover:underline" href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}>
                  {BRAND.phone}
                </a>
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} {BRAND.name}. Wszystkie prawa zastrzeżone.</p>
              <p className="mt-2 text-sm text-muted-foreground">Wsparcie techniczne: claritleonelmnicol@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
