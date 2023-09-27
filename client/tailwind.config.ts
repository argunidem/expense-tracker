import type { Config } from "tailwindcss";

const config: Config = {
   darkMode: ["class"],
   content: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
   ],
   theme: {
      container: {
         center: true,
         padding: "2rem",
         screens: {
            "2xl": "1400px",
         },
      },
      extend: {
         backgroundImage: {
            hero: "url('/hero.jpg')",
            "sign-up": "url('/sign-up.svg')",
         },
         keyframes: {
            up: {
               from: { transform: "translateY(30px)", opacity: "0" },
               to: { transform: "translateY(0)", opacity: "1" },
            },
            right: {
               from: { transform: "translateX(-200px)", opacity: "0" },
               to: { transform: "translateX(0)", opacity: "1" },
            },
            down: {
               from: { transform: "translateY(-30px)", opacity: "0" },
               to: { transform: "translateY(0)", opacity: "1" },
            },
            left: {
               from: { transform: "translateX(200px)", opacity: "0" },
               to: { transform: "translateX(0)", opacity: "1" },
            },
            "accordion-down": {
               from: { height: "0" },
               to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
               from: { height: "var(--radix-accordion-content-height)" },
               to: { height: "0" },
            },
         },
         animation: {
            up: "up 0.8s ease",
            right: "right 1.5s ease",
            down: "down 0.8s ease",
            left: "left 1.5s ease",
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
         },
      },
   },
   plugins: [require("tailwindcss-animate")],
};

export default config;
