import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import chefPlating from "@/assets/chef-plating.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/restaurant";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location — Maison Étoile, Paris" },
      {
        name: "description",
        content:
          "Find Maison Étoile at 14 Rue du Faubourg Saint-Honoré, Paris 8e. Opening hours, phone, email and directions.",
      },
      { property: "og:title", content: "Contact & Location — Maison Étoile" },
      {
        property: "og:description",
        content: "Opening hours, address and directions to Maison Étoile in Paris.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const items = [
    { icon: MapPin, label: "Adresse", lines: [contact.address, contact.city] },
    { icon: Phone, label: "Téléphone", lines: [contact.phone], href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", lines: [contact.email], href: `mailto:${contact.email}` },
  ];

  return (
    <>
      <PageHero
        image={chefPlating}
        eyebrow="Nous trouver"
        title={
          <>
            Contact & <span className="italic text-gold">location</span>
          </>
        }
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-5">
            {items.map((it, i) => (
              <Reveal key={it.label} delay={i * 100} className="flex gap-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-gold">
                  <it.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="eyebrow">{it.label}</p>
                  {it.href ? (
                    <a href={it.href} className="link-underline mt-3 inline-block break-all font-display text-2xl hover:text-gold">
                      {it.lines[0]}
                    </a>
                  ) : (
                    <p className="mt-3 font-display text-2xl leading-snug">
                      {it.lines.map((l) => (
                        <span key={l} className="block">{l}</span>
                      ))}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
            <Reveal delay={300} className="flex gap-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-gold">
                <Clock className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="eyebrow">Horaires</p>
                <ul className="mt-4 space-y-3">
                  {contact.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4 border-b border-border pb-3 text-sm">
                      <span className="text-muted-foreground">{h.days}</span>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <Button asChild variant="gold" size="xl">
                <Link to="/reservations">Reserve a table</Link>
              </Button>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:col-span-7">
            <div className="relative h-[420px] overflow-hidden border border-border lg:h-full lg:min-h-[560px]">
              <iframe
                title="Map to Maison Étoile"
                src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
                className="absolute inset-0 h-full w-full grayscale invert-[0.9] contrast-[0.9]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
