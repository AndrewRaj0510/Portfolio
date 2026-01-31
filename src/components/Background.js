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
          "rgba(255,255,255,0.7)",
          "rgba(211,211,211,0.6)",
          "rgba(169,169,169,0.5)",
        ]
      : [
          "rgba(0,0,0,0.7)",
          "rgba(64,64,64,0.6)",
          "rgba(192,192,192,0.5)",
        ];

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: particleColors,
      },
      opacity: {
        value: 0.7,
      },
      size: {
        value: { min: 2, max: 5 },
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out",
        },
      },
      number: {
        value: 80,
      },
    },
    detectRetina: true,
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Particles id="tsparticles" options={particlesOptions} />
    </div>
  );
}