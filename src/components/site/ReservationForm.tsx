import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(6, "Please enter a phone number").max(30),
  date: z.string().min(1, "Choose a date"),
  time: z.string().min(1, "Choose a time"),
  guests: z.string().min(1),
  notes: z.string().max(500).optional(),
});

type Values = z.infer<typeof schema>;
const times = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

const field =
  "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors duration-500 focus:border-gold";
const label = "text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground";

export function ReservationForm() {
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [done, setDone] = useState<Values | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Partial<Record<keyof Values, string>> = {};
      for (const issue of parsed.error.issues) {
        errs[issue.path[0] as keyof Values] ??= issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setDone(parsed.data);
  }

  if (done) {
    return (
      <div className="animate-rise py-16 text-center">
        <p className="eyebrow">Merci</p>
        <h3 className="mt-5 font-display text-4xl md:text-5xl">
          We look forward to welcoming you, {done.name.split(" ")[0]}.
        </h3>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">
          Your request for {done.guests} {done.guests === "1" ? "guest" : "guests"} on {done.date} at{" "}
          {done.time} has been received. A confirmation will follow to {done.email}.
        </p>
        <Button variant="luxe" size="xl" className="mt-10" onClick={() => setDone(null)}>
          New reservation
        </Button>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-10 gap-y-9 md:grid-cols-2">
      <Field label="Full name" error={errors.name}>
        <input name="name" autoComplete="name" placeholder="Jean Dupont" className={field} />
      </Field>
      <Field label="Email" error={errors.email}>
        <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} />
      </Field>
      <Field label="Phone" error={errors.phone}>
        <input name="phone" type="tel" autoComplete="tel" placeholder="+33 6 00 00 00 00" className={field} />
      </Field>
      <Field label="Guests" error={errors.guests}>
        <select name="guests" defaultValue="2" className={cn(field, "[&>option]:bg-background")}>
          {Array.from({ length: 8 }, (_, i) => (
            <option key={i + 1} value={String(i + 1)}>
              {i + 1} {i === 0 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Date" error={errors.date}>
        <input name="date" type="date" min={today} className={cn(field, "[color-scheme:dark]")} />
      </Field>
      <Field label="Time" error={errors.time}>
        <select name="time" defaultValue="" className={cn(field, "[&>option]:bg-background")}>
          <option value="" disabled>
            Select a time
          </option>
          {times.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>
      <div className="md:col-span-2">
        <Field label="Special requests" error={errors.notes}>
          <textarea
            name="notes"
            rows={3}
            placeholder="Allergies, celebrations, seating preferences…"
            className={cn(field, "resize-none")}
          />
        </Field>
      </div>
      <div className="flex flex-col items-center gap-4 md:col-span-2">
        <Button type="submit" variant="gold" size="xl" className="w-full md:w-auto md:px-16">
          Request a table
        </Button>
        <p className="text-xs text-muted-foreground">
          For parties of more than eight, please call us directly.
        </p>
      </div>
    </form>
  );
}

function Field({ label: l, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={label}>{l}</span>
      {children}
      {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
