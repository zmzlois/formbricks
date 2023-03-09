const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: '"Inter var",...defaultTheme.fontFamily.sans',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "primary-gradient":
          "linear-gradient(92.88deg, rgb(69, 143, 181) 9.16%, rgb(67, 159, 204) 43.89%, rgb(4, 129, 185) 64.72%)",
        "page-gradient": "radial-gradient(ellipse 80% 50% at 50% -20%,rgba(26,143,203,0.3), transparent)",
        "hero-gradient":
          "radial-gradient(ellipse 50% 80% at 20% 40%,rgba(14,161,217,0.1),transparent), radial-gradient(ellipse 50% 80% at 80% 50%,rgba(51,172,219,0.15),transparent)",
        "hero-glow":
          "conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(0, 152, 230) 0deg, rgb(0, 205, 255) 67.5deg, rgb(39, 114, 157) 198.75deg, rgb(6, 71, 103) 251.25deg, rgb(19, 134, 158) 301.88deg, rgb(12, 163, 243) 360deg)",
        "glow-lines":
          "linear-gradient(var(--direction),#9BE4F2 0.43%,#77AFC6 14.11%,rgba(119,184,198,0) 62.95%)",
        "radial-faded": "radial-gradient(circle at bottom center,var(--color),transparent 70%)",
        "glass-gradient": "linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 100%)",
        s,
      },
      colors: {
        brand: {
          DEFAULT: "#00cdff",
          light: "#00cdff",
          dark: "#3B9AC8",
        },
        black: {
          DEFAULT: "#000",
        },
      },
      maxWidth: {
        "8xl": "88rem",
      },
      screens: {
        xs: "430px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
