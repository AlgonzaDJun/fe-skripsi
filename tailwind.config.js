/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFA447",
        "primary-hover": "#ffad59",
        secondary: "#B7E5B4",
        abu: "#FCEFEC",
      },
    },
  },
  plugins: [
    // require("daisyui")
    // eslint-disable-next-line no-undef
    require("flowbite/plugin"),
  ],
};
