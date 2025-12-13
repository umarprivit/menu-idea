/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function InstantAR() {
  const { slug } = useParams(); // e.g., "burger"
  const [status, setStatus] = useState("Detecting device...");

  useEffect(() => {
    // 1. Define your model URLs (You would fetch this from your DB in a real app)
    const modelUrl = `/${slug}.glb`;
    const usdzUrl = `/${slug}.usdz`;

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // 2. Android Logic (Scene Viewer Intent)
    if (/android/i.test(userAgent)) {
      setStatus("Launching Android Scene Viewer...");
      
      // The "intent" scheme opens the native Google App directly
      // mode=ar_only forces it to skip the 3D preview and go straight to camera
      const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${modelUrl}&mode=ar_only&title=${slug}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://your-site.com/fallback;end;`;
      
      window.location.href = intentUrl;
    } 
    
    // 3. iOS Logic (Quick Look)
    else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setStatus("Launching iOS Quick Look...");
      
      // iOS requires a direct link to the USDZ file.
      // Note: iOS might still show a "View" button or download prompt depending on the version.
      // We simulate a click on a hidden link because window.location sometimes fails for AR files.
      const anchor = document.createElement("a");
      anchor.setAttribute("rel", "ar");
      anchor.setAttribute("href", usdzUrl);
      anchor.innerHTML = `<img src="/empty.png">`; // Needs an image to be valid AR link
      document.body.appendChild(anchor);
      anchor.click();
    } 
    
    // 4. Desktop / Unsupported
    else {
      setStatus("Please scan this code with a mobile phone.");
    }
  }, [slug]);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">Opening AR...</h1>
        <p className="text-gray-400">{status}</p>
      </div>
    </div>
  );
}