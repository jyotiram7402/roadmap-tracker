import { Rocket } from "@/components/icons";

// CrackDev brand lockup. Rocket mark in the brand maroon→coral gradient + wordmark.
// To swap in a raster/illustrated logo later, replace the <span> mark with an <img>.
export default function Logo({ size = 32, showText = true, className = "", textClass = "text-white" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="rounded-xl grid place-items-center flex-shrink-0"
        style={{ width: size, height: size, background: "linear-gradient(135deg,#7a1f5c,#f0654f)", boxShadow: "0 6px 18px -10px rgba(240,101,79,.6)" }}
      >
        <Rocket size={Math.round(size * 0.56)} strokeWidth={2.2} className="text-white" />
      </span>
      {showText && (
        <span className={`font-bold tracking-tight ${textClass}`}>
          Crack<span className="text-[#f0654f]">Dev</span>
        </span>
      )}
    </span>
  );
}
