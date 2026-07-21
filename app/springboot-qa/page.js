"use client";
import QaStudio from "@/components/QaStudio";
import { SPRINGBOOT_QA_CATEGORIES, loadSpringbootQa } from "@/data/springboot-qa";

export default function SpringbootQaPage() {
  return (
    <QaStudio
      title="🍃 Spring Boot Interview Q&A"
      categories={SPRINGBOOT_QA_CATEGORIES}
      load={loadSpringbootQa}
      storagePrefix="springboot-qa"
    />
  );
}
