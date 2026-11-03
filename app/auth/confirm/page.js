import ConfirmClient from "./ConfirmClient";

export const metadata = {
  title: "Confirm · CrackDev",
  robots: { index: false, follow: false },
};

// Opening this page changes nothing: the Continue button verifies the link
// (see actions.js), so scanners that pre-open email links can't consume them.
export default async function ConfirmPage({ searchParams }) {
  const params = await searchParams;
  const str = (k) => (typeof params?.[k] === "string" ? params[k] : "");
  return (
    <ConfirmClient
      tokenHash={str("token_hash")}
      type={str("type")}
      next={str("next")}
      hasCode={Boolean(str("code"))}
      errorDescription={str("error_description")}
    />
  );
}
