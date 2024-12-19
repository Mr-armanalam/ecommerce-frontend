"use client";
import React from "react";


export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <section className="center bg-primary-100 h-screen">
          <div className="w-[40rem] center flex-col bg-white rounded-lg h-[15rem]">
            <h1 className="font-bold text-3xl">Something went wrong!</h1>
            <p className="text-xl font-semibold text-primary-300">
              {error.message}
            </p>
            <button
              className="btn-primary1 btn_primary_noOutline mt-5 py-1.5 px-5 "
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
