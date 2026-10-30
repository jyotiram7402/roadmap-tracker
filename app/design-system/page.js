import { notFound } from "next/navigation";
import DesignSystemGallery from "@/components/DesignSystemGallery";

export const metadata = {
  title: "Design system · CrackDev",
  robots: { index: false, follow: false },
};

// Dev-only preview of tokens + primitives. 404s in production builds.
export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <DesignSystemGallery />;
}
