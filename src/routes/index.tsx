import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroDish from "@/assets/hero-dish.jpg";
import interior from "@/assets/interior.jpg";
import chefPlating from "@/assets/chef-plating.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { MenuBoard } from "@/components/site/MenuBoard";
import { Reviews } from "@/components/site/Reviews";
import { contact, signatureDishes, tastingMenu } from "@/lib/restaurant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Étoile — French Haute Cuisine in Paris" },
      {
        name: "description",
        content:
          "Maison Étoile: candlelit contemporary French fine dining on Rue du Faubourg Saint-Honoré. Discover our signature dishes and reserve a table.",
      },
      { property: "og:title", content: "Maison Étoile — French Haute Cuisine in Paris" },
      {
        property: "og:description",
        content: "Candlelit contemporary French fine dining in the heart of Paris.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex h-svh min-h-[640px] items-center overflow-hidden">
        <img
          src={heroDish}
          alt="Seared scallops with caviar and beurre blanc"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] animate-kenburns"
        />
        <div className="absolute inset-0 bg-side-veil" />
        <div className="absolute inset-0 bg-veil opacity-70" />

        <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="flex items-center gap-4 animate-rise">
            <span className="h-px w-12 origin-left bg-gold animate-line" />
            <p className="eyebrow">Haute Cuisine · Paris VIII</p>
          </div>
          <h1 className="mt-8 font-display text-[4.6rem] leading-[0.88] animate-rise [animation-delay:200ms] sm:text-8xl lg:text-[10rem]">
            Maison
            <br />
            <span className="italic text-gold-gradient">Étoile</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-foreground/75 animate-rise [animation-delay:400ms] md:text-lg">
            An intimate table where French tradition meets quiet modernity —
            composed nightly by candlelight.
          </p>
          <div className="mt-12 flex flex-col gap-4 animate-rise [animation-delay:600ms] sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link to="/reservations">Reserve a table</Link>
            </Button>
            <Button asChild variant="luxe" size="xl">
              <Link to="/menu">Discover the menu</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">Scroll</span>
          <span className="h-12 w-px animate-pulse bg-gold/60" />
        </div>
      </section>

      {/* STORY */}
      <section className="section-ivory py-28 md:py-40">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-12 md:px-10">
          <Reveal className="relative md:col-span-5">
            <div className="overflow-hidden">
              <img
                src={interior}
                alt="Candlelit dining room of Maison Étoile"
                width={1200}
                height={1504}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[2000ms] ease-luxe hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 hidden h-40 w-40 border border-ink/30 md:block" />
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="eyebrow text-ink/60">Notre histoire</p>
              <h2 className="mt-6 text-5xl leading-[1.02] md:text-7xl">
                A house built on <span className="italic">patience</span> and light.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-10 text-lg leading-relaxed text-muted-foreground">
                Since 1998, Maison Étoile has welcomed guests into a candlelit salon on
                Rue du Faubourg Saint-Honoré. Chef Laurent Delacroix cooks with the seasons,
                sourcing from a small circle of farmers, fishermen and cheesemakers across France.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Every evening is unhurried. Every plate, an act of care.
              </p>
            </Reveal>
            <Reveal delay={300} className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-10">
              {[
                ["1998", "Established"],
                ["2", "Michelin stars"],
                ["32", "Covers nightly"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-4xl md:text-5xl">{n}</p>
                  <p className="mt-2 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">{l}</p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={400}>
              <Link
                to="/story"
                className="link-underline mt-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em]"
              >
                Read our story <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SIGNATURE DISHES */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow="Les signatures"
            title={
              <>
                Signature <span className="italic text-gold">dishes</span>
              </>
            }
          />
          <div className="mt-20 grid gap-14 md:grid-cols-3 md:gap-8">
            {signatureDishes.map((d, i) => (
              <Reveal key={d.name} delay={i * 150} className={i === 1 ? "md:mt-20" : ""}>
                <article className="group">
                  <div className="relative overflow-hidden">
                    <img
                      src={d.image}
                      alt={d.name}
                      width={1024}
                      height={1280}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] ease-luxe group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <span className="absolute left-5 top-5 font-display text-sm italic text-ivory/80">
                      N° 0{i + 1}
                    </span>
                  </div>
                  <div className="mt-7 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl transition-colors duration-500 group-hover:text-gold md:text-[1.75rem]">
                      {d.name}
                    </h3>
                    <span className="font-display text-xl text-gold">{d.price}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{d.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH IMAGE BREAK */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={chefPlating}
          alt="Chef plating a dish with tweezers"
          width={1920}
          height={1088}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/45" />
        <div className="relative flex h-full items-center justify-center px-6 text-center">
          <Reveal>
            <p className="font-display text-3xl italic leading-snug md:text-6xl">
              “Cooking is the art of
              <br /> listening to ingredients.”
            </p>
            <p className="eyebrow mt-8">Chef Laurent Delacroix</p>
          </Reveal>
        </div>
      </section>

      {/* MENU */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow="La carte"
            title={
              <>
                The <span className="italic text-gold">menu</span>
              </>
            }
          />
          <Reveal className="mt-16">
            <MenuBoard />
          </Reveal>
          <Reveal className="mx-auto mt-20 max-w-3xl border border-border p-10 text-center md:p-14">
            <p className="eyebrow">{tastingMenu.name}</p>
            <p className="mt-5 font-display text-5xl text-gold">{tastingMenu.price}</p>
            <p className="mt-4 text-muted-foreground">{tastingMenu.description}</p>
            <p className="mt-2 text-sm text-muted-foreground">{tastingMenu.pairing}</p>
            <Button asChild variant="luxe" size="xl" className="mt-10">
              <Link to="/menu">View full menu</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section-ivory py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="text-center">
            <p className="eyebrow text-ink/60">Ils en parlent</p>
          </Reveal>
          <Reveal delay={150} className="mt-10">
            <Reviews />
          </Reveal>
        </div>
      </section>

      {/* RESERVATION CTA */}
      <section className="relative overflow-hidden py-32 md:py-48">
        <img
          src={interior}
          alt=""
          width={1200}
          height={1504}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-veil" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="eyebrow">Réservations</p>
            <h2 className="mt-6 text-5xl leading-[1.02] md:text-7xl">
              Your table <span className="italic text-gold">awaits</span>
            </h2>
            <p className="mx-auto mt-8 max-w-lg text-lg text-foreground/75">
              Thirty-two seats, one seating each evening. We recommend booking two to three weeks in advance.
            </p>
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild variant="gold" size="xl">
                <Link to="/reservations">Reserve online</Link>
              </Button>
              <Button asChild variant="luxe" size="xl">
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3 md:px-10">
          <Reveal>
            <p className="eyebrow">Adresse</p>
            <p className="mt-5 font-display text-2xl leading-snug">
              {contact.address}
              <br />
              {contact.city}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Horaires</p>
            <ul className="mt-5 space-y-2">
              {contact.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={240}>
            <p className="eyebrow">Contact</p>
            <p className="mt-5 text-sm leading-loose">
              {contact.phone}
              <br />
              {contact.email}
            </p>
            <Link
              to="/contact"
              className="link-underline mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold"
            >
              Find us <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
