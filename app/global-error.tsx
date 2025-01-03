"use client";
import React from "react";

export default function GlobalError ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <section className="center h-screen bg-primary-100">
          <div className="center h-[15rem] w-[40rem] flex-col rounded-lg bg-white">
            <h1 className="text-3xl font-bold">Something went wrong!</h1>
            <p className="text-xl font-semibold text-primary-300">
              {error.message}
            </p>
            <button
              className="btn-primary1 btn_primary_noOutline mt-5 px-5 py-1.5 "
              onClick={() => reset()}
            >
              Try again
            </button>
          </div>
        </section>
      </body>
    </html>
  );
}
