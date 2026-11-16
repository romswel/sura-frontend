# Sura design foundation

## Identity

Sura is an approachable, independent two-person web team. The site should feel intentional, calm, and human. The working tagline is “Your next chapter, online.” Do not imply a large agency, established client history, or guarantees.

The original interlocking S mark lives in `public/sura-mark.svg` and `src/components/Brand.tsx`. Preserve its silhouette across favicon and wordmark. It is a working brand mark, not a trademark clearance or registered logo claim.

## Visual system

- Main background: charcoal `#121313`; panel `#1a1b1b`; text `#eeeee8`; muted text `#9b9e99`; line `#303232`.
- Light concept gallery: warm off-white `#e8e8e1`. Keep Sura surfaces neutral; tiny muted sage details are accents, not a replacement brand palette.
- Typography: local/system Arial/Helvetica for interface and display copy; Georgia italic for selected expressive phrases. No third-party font network requests.
- Large, tightly spaced headings, short readable paragraphs, clear numeric section labels. Avoid decorative dashboards, fabricated activity, fake metrics, or repeating generic cards without purpose.
- Borders and small radii, restrained shadow on the hero browser, gradients limited to quiet surface depth and original concept illustrations.
- Four industry concepts have their own subdued art direction: café/olive, studio/stone, shop/lilac, personal brand/blue. These sit inside the neutral Sura shell.

## Interaction

Every visible control must do what its label promises. The concept miniatures are illustrations; open their detail dialog to see the intended features and start a brief. Never style nonfunctional mini-navigation as real operational links. Use native buttons/links/labels and a native dialog with keyboard dismissal and focus restoration.

Keep navigation and touch controls usable from 320px upward, prevent horizontal overflow, use 16px form text on narrow screens, and respect reduced motion. Do not rely solely on color, hover, or animation. Test focus visibility and dialog behavior with the keyboard. Keep success/status wording truthful about sending and saving.
