import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Terms & Conditions — CrackDev" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="August 2026"
      intro="By accessing or using CrackDev, you agree to these Terms & Conditions. If you do not agree, please do not use the platform."
      sections={[
        { heading: "1. Use of the platform", body: [
          "CrackDev provides interview-preparation content — roadmaps, DSA and logic problems, SQL, and curated interview questions and answers — for personal, educational use.",
          "You agree not to misuse the service, attempt to disrupt it, or scrape and redistribute its content without permission.",
        ] },
        { heading: "2. Accounts", body: [
          "Some features require an account. You are responsible for keeping your login credentials secure and for all activity under your account.",
        ] },
        { heading: "3. Content & accuracy", body: [
          "Content is provided for learning and may be updated or corrected at any time. We do not guarantee that any material will lead to a specific job outcome.",
        ] },
        { heading: "4. Intellectual property", body: [
          "The CrackDev name, logo, and original explanations belong to their respective owners. Third-party problem names and public sheets remain the property of their creators.",
        ] },
        { heading: "5. Changes", body: [
          "We may update these terms from time to time. Continued use of the platform after changes means you accept the revised terms.",
        ] },
      ]}
    />
  );
}
