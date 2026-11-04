import { Link } from "@tanstack/react-router";
import { contact } from "@/lib/restaurant";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <p className="font-display text-4xl">
            Maison <span className="italic text-gold">Étoile</span>
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Contemporary French haute cuisine in the heart of the 8th arrondissement.
          </p>
        </div>
        <div>
          <p className="eyebrow">Visit</p>
          <p className="mt-5 text-sm leading-relaxed text-foreground/80">
            {contact.address}
            <br />
            {contact.city}
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-foreground/80">
            <li><Link to="/story" className="link-underline hover:text-gold">Our Story</Link></li>
            <li><Link to="/menu" className="link-underline hover:text-gold">Menu</Link></li>
            <li><Link to="/reservations" className="link-underline hover:text-gold">Reservations</Link></li>
            <li><Link to="/contact" className="link-underline hover:text-gold">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground md:flex-row md:justify-between md:px-10">
          <span>© {new Date().getFullYear()} Maison Étoile</span>
          <span>Haute Cuisine · Paris</span>
        </div>
      </div>
    </footer>
  );
}
