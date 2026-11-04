<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Restaurant content (dishes, menu, reviews, hours, address) lives in `src/lib/restaurant.ts`; pages read from it so copy changes happen in one place.
- Shared site chrome (header/footer) is rendered in `src/routes/__root.tsx`; each section (story, menu, reservations, contact) is its own route for SEO.
- Button styles come from `luxe`/`gold` variants backed by `@utility` classes in `src/styles.css`; never hardcode colors in components.
