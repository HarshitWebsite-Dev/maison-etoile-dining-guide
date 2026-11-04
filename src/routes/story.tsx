import { createFileRoute, Link } from "@tanstack/react-router";
import interior from "@/assets/interior.jpg";
import chefPlating from "@/assets/chef-plating.jpg";
import lobster from "@/assets/dish-lobster.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Maison Étoile, Paris" },
      {
        name: "description",
        content:
          "The story of Maison Étoile and Chef Laurent Delacroix: a candlelit Paris salon devoted to seasonal French haute cuisine since 1998.",
      },
      { property: "og:title", content: "Our Story — Maison Étoile" },
      {
        property: "og:description",
        content: "A candlelit Paris salon devoted to seasonal French haute cuisine since 1998.",
      },
    ],
  }),
  component: StoryPage,
});

const chapters = [
  {
    year: "1998",
    title: "A salon on Saint-Honoré",
    text: "Laurent Delacroix opens a twelve-table dining room in a former 19th-century hôtel particulier, with a single promise: cook only what the season offers.",
  },
  {
    year: "2006",
    title: "The first star",
    text: "Recognition arrives quietly. The kitchen grows, but the dining room stays intimate — never more than thirty-two guests a night.",
  },
  {
    year: "2015",
    title: "A second star",
    text: "The lobster in saffron becomes the house signature, and our cellar grows to over 1,800 references from small French domaines.",
  },
  {
    year: "Today",
    title: "Patience and light",
    text: "A new generation joins the brigade. The candles, the velvet and the care remain exactly as they were.",
  },
];

function StoryPage() {
  return (
    <>
      <PageHero
        image={chefPlating}
        eyebrow="Notre histoire"
        title={
          <>
            Our <span className="italic text-gold">story</span>
          </>
        }
        subtitle="Twenty-eight years of seasonal French cooking, one candlelit evening at a time."
      />

      <section className="section-ivory py-28 md:py-40">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:px-10">
          <Reveal>
            <p className="font-display text-4xl leading-tight md:text-5xl">
              “I wanted a room where time slows down — where a meal is remembered for years, not minutes.”
            </p>
            <p className="eyebrow mt-8 text-ink/60">Laurent Delacroix, Chef & Founder</p>
          </Reveal>
          <Reveal delay={150} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Born in Lyon to a family of butchers, Laurent trained under the great masters of
              classical French cuisine before opening Maison Étoile at twenty-nine.
            </p>
            <p>
              His cooking is precise yet generous — rooted in the techniques of Escoffier, lit by the
              produce of a handful of trusted growers in Brittany, Périgord and the Loire.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <ol className="relative border-l border-border pl-10 md:pl-16">
            {chapters.map((c, i) => (
              <Reveal as="li" key={c.year} delay={i * 80} className="relative pb-20 last:pb-0">
                <span className="absolute -left-[45px] top-3 h-2 w-2 rotate-45 bg-gold md:-left-[69px]" />
                <p className="font-display text-6xl italic text-gold md:text-7xl">{c.year}</p>
                <h3 className="mt-4 text-3xl md:text-4xl">{c.title}</h3>
                <p className="mt-4 max-w-xl text-muted-foreground">{c.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        {[interior, lobster].map((src, i) => (
          <div key={i} className="group h-[60vh] overflow-hidden">
            <img
              src={src}
              alt={i === 0 ? "The dining room" : "Lobster in saffron"}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[2000ms] ease-luxe group-hover:scale-105"
            />
          </div>
        ))}
      </section>

      <section className="py-28 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl">
            Join us at the <span className="italic text-gold">table</span>
          </h2>
          <Button asChild variant="gold" size="xl" className="mt-10">
            <Link to="/reservations">Reserve a table</Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
