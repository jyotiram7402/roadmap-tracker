import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import PwaInstaller from "@/components/PwaInstaller";
import ActivityTracker from "@/components/ActivityTracker";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata = {
  title: "Crack Any Job — Tech Interview Prep",
  description: "Roadmaps, 1,600+ interview Q&A, system-design diagrams, DSA & role-specific question banks to crack your next software engineering job.",
  applicationName: "Crack Any Job",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "Crack Any Job",
    statusBarStyle: "black",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {/* Capture the install prompt as early as possible — Chrome fires
            beforeinstallprompt during load, before React hydrates. */}
        <Script id="pwa-bip-capture" strategy="beforeInteractive">{`
          (function () {
            window.__bipEvent = null;
            window.addEventListener('beforeinstallprompt', function (e) {
              e.preventDefault();
              window.__bipEvent = e;
              try { window.dispatchEvent(new Event('bip-available')); } catch (_) {}
            });
            window.addEventListener('appinstalled', function () {
              window.__bipEvent = null;
              try { window.dispatchEvent(new Event('bip-installed')); } catch (_) {}
            });
          })();
        `}</Script>
        {children}
        <PwaInstaller />
        <ActivityTracker />
      </body>
    </html>
  );
}
