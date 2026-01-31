'use client'

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function AIBackground() {
  const [init, setInit] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  // Default = light, dark only when toggled
  const isDarkMode = resolvedTheme === "dark";

  const particleColors = isDarkMode
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

    interactivity: {
      events: {
        onHover: {
          enable: true, // moveParticlesOnHover
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 150, // particleHoverFactor ≈ 1.5
          duration: 0.4,
        },
      },
    },

    particles: {
      number: {
        value: 500, // particleCount
        density: {
          enable: true,
          area: 900,
        },
      },

      color: {
        value: particleColors,
      },

      opacity: {
        value: 0.7,
      },

      size: {
        value: { min: 1, max: 5 },
        random: {
          enable: true,
          minimumValue: 0.6, // sizeRandomness ≈ 1.6
        },
      },

      rotate: {
        enable: true,
        direction: "counter-clockwise", // anti-clockwise rotation
        animation: {
          enable: true,
          speed: 4,
        },
      },

      move: {
        enable: true,
        speed: 0.05, // speed
        direction: "none",
        random: true, // particleSpread feel
        straight: false,
        outModes: {
          default: "out",
        },
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