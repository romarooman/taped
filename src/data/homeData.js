import { imagePlaceholders } from "./imagePlaceholders";
import brands from "../images/brand/partner-logos.png";

export const homeSlides = [
  {
    id: 1,
    image: imagePlaceholders.testimonialFirst,
    quote: "is an actor from barcelona, now based in new york.",
    name: "mateu parellada",
  },
  {
    id: 2,
    image: imagePlaceholders.testimonialSecond,
    quote: "is an actor from barcelona, now based in new york.",
    name: "mateu parellada",
  },
  {
    id: 3,
    image: imagePlaceholders.testimonialFirst,
    quote: "is an actor from barcelona, now based in new york.",
    name: "mateu parellada",
  },
  {
    id: 4,
    image: imagePlaceholders.testimonialSecond,
    quote: "is an actor from barcelona, now based in new york.",
    name: "mateu parellada",
  },
];

export const homeImages = {
  hero: imagePlaceholders.hero,
  introduction: imagePlaceholders.introduction,
  mission: imagePlaceholders.mission,
  about: imagePlaceholders.about,
  expert: imagePlaceholders.expert,
  actor: imagePlaceholders.actor,
  community: imagePlaceholders.community,
  brands: { src: brands, alt: "Partner brands" },
};
