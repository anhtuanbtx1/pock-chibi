'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TarotBookPopup, { MainTab } from '@/components/TarotBookPopup';
import CelestialYinYangBackground from '@/components/CelestialYinYangBackground';

function GalleryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = (searchParams.get('tab') as MainTab) || 'SEE ALL';

  return (
    <main className="relative isolate w-full h-screen overflow-hidden bg-[#171a24]">
      <CelestialYinYangBackground />
      <TarotBookPopup
        open={true}
        onClose={() => router.push('/')}
        initialTab={tab}
      />
    </main>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-[#171a24]" />}>
      <GalleryContent />
    </Suspense>
  );
}
