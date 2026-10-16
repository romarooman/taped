import { imagePlaceholders } from "./imagePlaceholders";

// src/data/expertsData.js

export const expertsData = [
  {
    id: 1,
    slug: "anton-volodin-upcoming",
    image: imagePlaceholders.hero,
    heroImage: imagePlaceholders.expert,
    label: "upcoming",
    name: "anton volodin exibition",
    description:
      "is a director from moscow who based in new york. he works in narrative film and photography and brings a calm, focused eye to the work.",

    sections: [
      {
        title: "Max Ishchenko",
        subtitle:
          "is a director from Moscow who based in New York. He works in narrative film and photography and brings a calm, focused eye to the work.",
        image: imagePlaceholders.expert,
      },
      {
        title: "What’s your goal?",
        subtitle:
          "is a director from Moscow who based in New York. He works in narrative film and photography and brings a calm, focused eye to the work.",
        image: imagePlaceholders.expert,
      },
      {
        title: "What music do you usually listen to?",
        subtitle:
          "is a director from Moscow who based in New York. He works in narrative film and photography and brings a calm, focused eye to the work.",
        image: imagePlaceholders.expert,
      },
    ],
  },
  {
    id: 2,
    slug: "anton-volodin-past",
    image: imagePlaceholders.introduction,
    heroImage: imagePlaceholders.expert,
    label: "past",
    name: "anton volodin exibition",
    description:
      "is a director from moscow who based in new york. he works in narrative film and photography and brings a calm, focused eye to the work.",

    sections: [
      {
        title: "Anton Volodin",
        subtitle: "detailed information about this expert.",
        image: imagePlaceholders.expert,
      },
    ],
  },
];
