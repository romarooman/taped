import { imagePlaceholders } from "./imagePlaceholders";

export const servicesOverviewImage = imagePlaceholders.hero;

const photos = [
  { id: "session-01", ...imagePlaceholders.hero },
  { id: "session-02", ...imagePlaceholders.introduction },
  { id: "session-03", ...imagePlaceholders.mission },
  { id: "session-04", ...imagePlaceholders.expert },
  { id: "session-05", ...imagePlaceholders.actor },
  { id: "session-06", ...imagePlaceholders.introduction },
  { id: "session-07", ...imagePlaceholders.actor },
];

const serviceOptions = [
  {
    id: "quick-shot",
    label: "quick shot",
    title: ["headshot", "quick", "shot"],
    description:
      "short and focused headshot session for getting a strong result quickly.",
    price: "200$",
    duration: "30 min",
  },
  {
    id: "session",
    label: "the session",
    title: ["headshot", "studio", "session"],
    description:
      "a full headshot studio session with enough time for different looks and setups.",
    price: "340$",
    duration: "1 hour",
  },
  {
    id: "half-day",
    label: "half day",
    title: ["headshot", "half", "day"],
    description:
      "an extended session with more time for different looks, setups and creative directions.",
    price: "1000$",
    duration: "4 hours",
  },
  {
    id: "all-in",
    label: "all in",
    title: ["headshot", "all", "in"],
    description:
      "a complete package with maximum shooting time and flexibility for different types of content.",
    price: "1500$",
    duration: "full day",
  },
];

export const headshotsService = {
  image: imagePlaceholders.testimonialFirst,
  preview: imagePlaceholders.hero,
  photos,
  options: serviceOptions,
};
