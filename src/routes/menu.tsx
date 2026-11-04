import { createFileRoute, Link } from "@tanstack/react-router";
import heroDish from "@/assets/hero-dish.jpg";
import { PageHero } from "@/components/site/PageHero";
import { MenuBoard } from "@/components/site/MenuBoard";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { tastingMenu } from "@/lib/restaurant";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Maison Étoile, Paris" },
      {
        name: "description",
        content:
          "The à la carte and seven-course tasting menu at Maison Étoile: scallops with caviar, wagyu with black truffle, Breton lobster and more.",
      },
      { property: "og:title", content: "The Menu — Maison Étoile" },
      {
        property: "og:description",
        content: "À la carte and a seven-course tasting menu of seasonal French haute cuisine.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <>
      <PageHero
        image={heroDish}
        eyebrow="La carte · Automne"
        title={
          <>
            The <span className="italic text-gold">menu</span>
          </>
        }
        subtitle="Composed with the season. Our menu changes as the markets do."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <MenuBoard />
          </Reveal>
        </div>
      </section>

      <section className="section-ivory py-24 md:py-32">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow text-ink/60">{tastingMenu.name}</p>
          <h2 className="mt-6 text-5xl md:text-7xl">
            Seven courses, <span className="italic">one evening</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground">{tastingMenu.description}.</p>
          <p className="mt-10 font-display text-6xl">{tastingMenu.price}</p>
          <p className="mt-3 text-sm text-muted-foreground">{tastingMenu.pairing}</p>
          <p className="mt-10 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Vegetarian menu available on request · Prices include service
          </p>
        </Reveal>
      </section>

      <section className="py-24 text-center">
        <Reveal>
          <Button asChild variant="gold" size="xl">
            <Link to="/reservations">Reserve a table</Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
