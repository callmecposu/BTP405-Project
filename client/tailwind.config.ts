import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#f7c873",

                    secondary: "#faebcd",

                    accent: "#434343",

                    neutral: "#ffffff",

                    "base-100": "#f8f8f8",

                    info: "#d2e0fb",

                    success: "#b7e5b4",

                    warning: "#ff9843",

                    error: "#ff6868",
                },
            },
        ],
    },
};
export default config;
