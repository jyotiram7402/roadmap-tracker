import "./globals.css";

export const metadata = {
  title: "Java Full-Stack Roadmap",
  description: "Track your journey from 1-year Java dev to senior full-stack + AI engineer",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
