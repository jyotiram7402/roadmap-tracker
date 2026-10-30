import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import PwaInstaller from "@/components/PwaInstaller";
import ActivityTracker from "@/components/ActivityTracker";
import SyncManager from "@/components/SyncManager";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
// Self-hosted by next/font; used only for real code (CodeBlock, snippets, IDs).
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" });

export const metadata = {
  title: "CrackDev — Software Engineering Interview Prep",
  description: "Roadmaps, 1,600+ interview Q&A, system-design diagrams, DSA & role-specific question banks to crack your next software engineering job.",
  applicationName: "CrackDev",
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
    title: "CrackDev",
    statusBarStyle: "black",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            // Theme before first paint. 'light' → light; 'system' → follow the OS;
            // anything else (incl. unset) → dark, the brand default.
            __html: "(function(){try{var t=localStorage.getItem('crackdev-theme');var l=t==='light'||(t==='system'&&window.matchMedia('(prefers-color-scheme: light)').matches);if(l){document.documentElement.classList.add('light');}}catch(e){}})();",
          }}
        />
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
        <SyncManager />
      </body>
    </html>
  );
}
