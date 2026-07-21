"use client";
import QaStudio from "@/components/QaStudio";
import { JAVA_QA_CATEGORIES, loadJavaQa } from "@/data/java-qa";

export default function JavaQaPage() {
  return (
    <QaStudio
      title="📘 Java Interview Q&A"
      categories={JAVA_QA_CATEGORIES}
      load={loadJavaQa}
      storagePrefix="java-qa"
    />
  );
}
