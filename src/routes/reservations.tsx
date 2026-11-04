import { createFileRoute } from "@tanstack/react-router";
import interior from "@/assets/interior.jpg";
import { ReservationForm } from "@/components/site/ReservationForm";
import { Reveal } from "@/components/site/Reveal";
import { contact } from "@/lib/restaurant";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — Maison Étoile, Paris" },
      {
        name: "description",
        content:
          "Reserve a table at Maison Étoile. Dinner Tuesday to Saturday, lunch on Saturday, on Rue du Faubourg Saint-Honoré, Paris.",
      },
      { property: "og:title", content: "Reserve a Table — Maison Étoile" },
      {
        property: "og:description",
        content: "Book an evening of French haute cuisine at Maison Étoile in Paris.",
      },
    ],
  }),
  component: ReservationsPage,
});

function ReservationsPage() {
  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src={interior}
          alt="Candlelit dining room"
          width={1200}
          height={1504}
          className="absolute inset-0 h-full w-full object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-veil" />
        <div className="absolute bottom-16 left-12 right-12">
          <p className="eyebrow">Horaires</p>
          <ul className="mt-5 space-y-2">
            {contact.hours.map((h) => (
              <li key={h.days} className="flex justify-between border-b border-border pb-2 text-sm">
                <span className="text-foreground/70">{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center px-6 pb-20 pt-36 md:px-16 lg:pt-40">
        <div className="mx-auto w-full max-w-xl">
          <Reveal>
            <p className="eyebrow">Réservations</p>
            <h1 className="mt-5 text-5xl leading-[0.95] md:text-7xl">
              Reserve a <span className="italic text-gold">table</span>
            </h1>
            <p className="mt-6 text-muted-foreground">
              Share your preferred evening and we will confirm within the day.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-14">
            <ReservationForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
