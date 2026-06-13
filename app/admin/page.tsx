"use client";

import { Suspense } from "react";
import { AdminEditor } from "./AdminEditor";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="container-x py-24 text-center text-ink-muted">
          Loading admin…
        </div>
      }
    >
      <AdminEditor />
    </Suspense>
  );
}
