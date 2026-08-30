"use client";

import React, { Suspense } from "react";
import WorkingVolumesShelf from "@/components/WorkingVolumesShelf";

export default function HomePage() {
  return (
    <main className="relative isolate w-full h-screen overflow-hidden bg-[#171a24]">
      <Suspense fallback={null}>
        <WorkingVolumesShelf />
      </Suspense>
    </main>
  );
}
