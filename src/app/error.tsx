"use client";

export default function Error({ retry }: { error: unknown; retry: () => void }) {
  return (
    <main className="page-state" role="alert">
      <h1>We couldn’t load xSchool.</h1>
      <p>Please try again in a moment.</p>
      <button type="button" onClick={retry}>Try again</button>
    </main>
  );
}
