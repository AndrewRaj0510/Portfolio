'use client'

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function AIBackground() {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  const particleColors =
    theme === "dark"
      ? [
          "rgba(255,255,255,0.15)",
          "rgba(220,220,220,0.12)",
          "rgba(180,180,180,0.10)",
        ]
      : [
          "rgba(0,0,0,0.18)",
          "rgba(31,31,31,0.14)",
          "rgba(58,58,58,0.12)",
        ];

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Particles
        particleCount={530}
        particleSpread={15}
        speed={0.05}
        particleColors={particleColors}
        moveParticlesOnHover
        particleHoverFactor={1.5}
        alphaParticles={true}
        particleBaseSize={130}
        sizeRandomness={1.6}
        cameraDistance={15}
        disableRotation={false}
      />
    </div>
  );
}