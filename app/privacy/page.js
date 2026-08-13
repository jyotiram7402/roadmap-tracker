import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Privacy Policy — CrackDev" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="August 2026"
      intro="This policy explains what information CrackDev collects and how it is used. We aim to collect as little as possible."
      sections={[
        { heading: "1. Information we collect", body: [
          "Account information such as your email address when you sign up.",
          "Learning activity — progress, streaks, and items you mark as done — is stored to power your dashboard. Most of this is kept on your device (localStorage); some may sync to your account so it works across devices.",
        ] },
        { heading: "2. How we use it", body: [
          "To provide and personalise the platform, save your progress, and improve the content and experience.",
          "We do not sell your personal information.",
        ] },
        { heading: "3. Storage & third parties", body: [
          "Authentication and any synced data are handled by our backend provider (Supabase). Uploaded solution screenshots are stored in your private storage space.",
        ] },
        { heading: "4. Your choices", body: [
          "You can clear device-stored activity from your browser at any time, and you can request deletion of your account data by contacting us.",
        ] },
        { heading: "5. Contact", body: [
          "For any privacy question or a data-deletion request, email us using the address below.",
        ] },
      ]}
    />
  );
}
