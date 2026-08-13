import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Refund & Cancellation — CrackDev" };

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & Cancellation"
      updated="August 2026"
      intro="CrackDev is currently free to use. This policy applies if and when paid plans are introduced."
      sections={[
        { heading: "1. Free access", body: [
          "The core platform is free. No payment is required to use the roadmaps, DSA and logic problems, SQL, or interview Q&A.",
        ] },
        { heading: "2. Paid plans (if applicable)", body: [
          "Should paid plans be offered, the price and billing cycle will be shown clearly before you pay.",
        ] },
        { heading: "3. Refunds", body: [
          "If you are charged in error, or are unsatisfied within 7 days of a purchase, contact us and we will review your request for a refund.",
        ] },
        { heading: "4. Cancellation", body: [
          "You can cancel a subscription at any time. Access continues until the end of the current billing period; you will not be charged again after cancelling.",
        ] },
        { heading: "5. Contact", body: [
          "For any billing question, refund, or cancellation request, email us using the address below.",
        ] },
      ]}
    />
  );
}
