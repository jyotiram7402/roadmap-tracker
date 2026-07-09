import "./globals.css";

export const metadata = {
  title: "Crack Any Job — Tech Interview Prep",
  description: "Roadmaps, 1,600+ interview Q&A, system-design diagrams, DSA & role-specific question banks to crack your next software engineering job.",
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
