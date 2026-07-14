export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      delay: 0.45,
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },

  show: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 1,
      delay: 0.30,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: 60,
  },

  show: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 1,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
