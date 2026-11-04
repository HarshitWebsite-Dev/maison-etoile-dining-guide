export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
}: {
  image: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden">
      <img
        src={image}
        alt=""
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover animate-kenburns"
      />
      <div className="absolute inset-0 bg-veil" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="mt-5 text-5xl leading-[0.95] animate-rise [animation-delay:150ms] md:text-8xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 animate-rise [animation-delay:300ms] md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
