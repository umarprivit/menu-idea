"use client";

import React, { useState, useEffect } from "react";

interface MindARViewerProps {
  slug?: string;
}

export default function MindARViewer({ slug = "burger" }: MindARViewerProps) {
  const [loaded, setLoaded] = useState(false);
  
  // Set scale based on slug
  const scale = slug === "pizza" ? "0.04 0.04 0.04" : "0.1 0.1 0.1";
  const modelSrc = `/${slug}.glb`;

  useEffect(() => {
    // Load A-Frame first
    const aframeScript = document.createElement("script");
    aframeScript.src = "https://aframe.io/releases/1.5.0/aframe.min.js";
    aframeScript.async = false;
    
    aframeScript.onload = () => {
      console.log("A-Frame loaded");
      
      // Then load MindAR
      const mindarScript = document.createElement("script");
      mindarScript.src = "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js";
      mindarScript.async = false;
      
      mindarScript.onload = () => {
        console.log("MindAR loaded");
        // Wait a bit for AFRAME to be fully ready
        setTimeout(() => {
          setLoaded(true);
        }, 100);
      };
      
      document.head.appendChild(mindarScript);
    };
    
    document.head.appendChild(aframeScript);
  }, []);

  return (
    <div
      style={{ margin: 0, overflow: "hidden", height: "100vh", width: "100vw" }}
    >
      {/* Only render scene after both scripts are loaded */}
      {loaded && (
        <>
          {/* @ts-expect-error - Ignoring TS error since we haven't added the d.ts file yet */}
          <a-scene
            mindar-image="imageTargetSrc: /targets.mind; autoStart: true; filterMinCF: 0.0001; filterBeta: 0.001;"
            color-space="sRGB"
            renderer="colorManagement: true, physicallyCorrectLights"
            vr-mode-ui="enabled: false"
            device-orientation-permission-ui="enabled: false"
            style={{ width: "100%", height: "100%" }}
          >
            {/* @ts-expect-error - Ignoring TS error since we haven't added the d.ts file yet */}
            <a-assets>
              {/* @ts-expect-error - Ignoring TS error since we haven't added the d.ts file yet */}
              <a-asset-item id={`${slug}Model`} src={modelSrc}></a-asset-item>
              {/* @ts-expect-error - Ignoring TS error since we haven't added the d.ts file yet */}
            </a-assets>

            {/* @ts-expect-error - Ignoring TS error since we haven't added the d.ts file yet */}
            <a-camera position="0 0 0" look-controls="enabled: false" cursor="rayOrigin: mouse"></a-camera>

            {/* @ts-expect-error - Ignoring TS error since we haven't added the d.ts file yet */}
            <a-entity mindar-image-target="targetIndex: 0">
              {/* @ts-expect-error - Ignoring TS error since we haven't added the d.ts file yet */}
              <a-gltf-model
                src={modelSrc}
                rotation="0 0 0"
                position="0 0 0"
                scale={scale}
                
              >
                {/* @ts-expect-error - Ignoring TS error since we haven't added the d.ts file yet */}
              </a-gltf-model>
              {/* @ts-expect-error - Ignoring TS error since we haven't added the d.ts file yet */}
            </a-entity>
            {/* @ts-expect-error - Ignoring TS error since we haven't added the d.ts file yet */}
          </a-scene>
        </>
      )}
    </div>
  );
}
