"use client";
import dynamic from 'next/dynamic';

const TargetCursor = dynamic(() => import('@/components/TargetCursor'), { ssr: false });
const MobileDock = dynamic(() => import('@/components/MobileDock'), { ssr: false });
const SignatureWatermark = dynamic(() => import('@/components/SignatureWatermark'), { ssr: false });

export default function ClientOnlyComponents() {
  return (
    <>
      <TargetCursor spinDuration={2} hoverDuration={0.2} parallaxOn={true} />
      <SignatureWatermark />
      <MobileDock />
    </>
  );
}
