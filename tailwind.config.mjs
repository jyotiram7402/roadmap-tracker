/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  // hover: variants only apply on devices that can hover (no stuck hover on touch)
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      // Semantic tokens → CSS variables defined in app/globals.css (light + dark).
      // Components should use these instead of raw hex / palette classes.
      colors: {
        background: "var(--bg)",
        surface: { DEFAULT: "var(--surface)", 2: "var(--surface-2)" },
        fg: "var(--fg)",
        muted: "var(--muted-fg)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        primary: { DEFAULT: "var(--primary)", fg: "#ffffff" },
        brand: "var(--brand)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        info: "var(--info)",
        diff: { easy: "var(--diff-easy)", medium: "var(--diff-medium)", hard: "var(--diff-hard)" },
      },
      fontFamily: {
        sans: ["var(--font-inter, ui-sans-serif)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono, ui-monospace)", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: { chip: "8px", control: "10px", surface: "14px", sheet: "20px" },
      zIndex: { sticky: "20", nav: "30", overlay: "40", modal: "50", toast: "60" },
    },
  },
  plugins: [],
};
