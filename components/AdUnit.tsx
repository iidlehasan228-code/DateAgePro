"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  /** Google AdSense ad slot ID — replace with a real slot from your AdSense account */
  slot: string;
  /** Layout hint, mirrors common AdSense formats */
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
  label?: string;
}

// TODO: Replace with your real AdSense publisher ID (starts with ca-pub-)
const ADSENSE_CLIENT_ID = "ca-pub-XXXXXXXXXXXXXXXX";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({ slot, format = "auto", className = "", label = "Advertisement" }: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (err) {
      // Swallow errors in dev/local where the AdSense script hasn't loaded —
      // ad slots simply render empty instead of crashing the page.
      console.warn("[adsense] Ad push failed (expected in local dev):", err);
    }
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <p className="mb-2 text-center text-[10px] uppercase tracking-widest text-muted dark:text-muted-dark">
        {label}
      </p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
