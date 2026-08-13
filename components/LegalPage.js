import Link from "next/link";
import Logo from "@/components/Logo";
import BrandFooter from "@/components/BrandFooter";

// Simple dark-theme shell for the Terms / Privacy / Refund pages.
// `sections` = [{ heading, body: [paragraph, ...] }]
export default function LegalPage({ title, updated, intro, sections = [] }) {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-20 bg-[#0e0e11]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link href="/" className="text-sm text-blue-400 hover:underline whitespace-nowrap">← Home</Link>
          <div className="flex-1" />
          <Logo size={26} textClass="text-sm text-white" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-10 flex-1">
        <h1 className="text-2xl sm:text-3xl font-black text-white">{title}</h1>
        {updated && <p className="mt-2 text-xs text-zinc-500">Last updated: {updated}</p>}

        <div className="mt-4 rounded-lg border border-amber-700/40 bg-amber-500/10 p-3 text-[13px] text-amber-200/90">
          This is a starter template. Review and customise it (ideally with a professional) before relying on it for your product.
        </div>

        {intro && <p className="mt-6 text-[15px] text-zinc-300 leading-relaxed">{intro}</p>}

        <div className="mt-6 space-y-6">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-base font-bold text-white">{s.heading}</h2>
              {s.body.map((p, j) => (
                <p key={j} className="mt-2 text-[14px] text-zinc-300 leading-relaxed">{p}</p>
              ))}
            </section>
          ))}
        </div>

        <p className="mt-10 text-[13px] text-zinc-500">
          Questions? Email <a href="mailto:jyotiramkamble7402@gmail.com" className="text-blue-400 hover:underline">jyotiramkamble7402@gmail.com</a>.
        </p>
      </main>

      <BrandFooter />
    </div>
  );
}
