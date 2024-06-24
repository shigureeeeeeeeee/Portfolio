/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
  
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
          animation: {
            aurora: "aurora 60s linear infinite",
          },
          keyframes: {
            aurora: {
              from: {
                backgroundPosition: "50% 50%, 50% 50%",
              },
              to: {
                backgroundPosition: "350% 50%, 350% 50%",
              },
            },
          },
        },
      },
      plugins: [],
    };