import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { profile } from "../data/site";
import { EASE } from "../lib/motion";
import { MagneticButton } from "./MagneticButton";
import { SocialLinks } from "./SocialLinks";

const ROLE_INTERVAL_MS = 3200;
const GLOW_SPRING = { stiffness: 50, damping: 20 };

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useSpring(pointerX, GLOW_SPRING);
  const glowY = useSpring(pointerY, GLOW_SPRING);
  const glowTranslateX = useTransform(glowX, [-0.5, 0.5], [-120, 120]);
  const glowTranslateY = useTransform(glowY, [-0.5, 0.5], [-80, 80]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((index) => (index + 1) % profile.roles.length);
    }, ROLE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    pointerX.set(event.clientX / window.innerWidth - 0.5);
    pointerY.set(event.clientY / window.innerHeight - 0.5);
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden px-6 pt-28 pb-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          style={{ x: glowTranslateX, y: glowTranslateY }}
          className="absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--c-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--c-line)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.25fr_1fr]"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-lg text-muted"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-3 text-[clamp(3.25rem,9vw,7rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-fg"
          >
            {profile.name}
          </motion.h1>

          <div className="mt-5 min-h-[3.5rem] text-lg font-medium text-accent sm:min-h-[2.25rem] sm:text-xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={profile.roles[roleIndex]}
                aria-hidden="true"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {profile.roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
            <span className="sr-only">{profile.roles.join(", ")}</span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-xl text-lg text-muted"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-fg transition-shadow duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              Explore My Work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="inline-flex h-12 items-center rounded-full border border-line bg-surface px-6 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Get in Touch
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8"
          >
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <motion.div
            whileHover={{ scale: 1.02, rotate: -1 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface shadow-xl shadow-black/5"
          >
            <img
              src={profile.photo}
              alt="Portrait of Sohail Ahmad"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.1 },
          y: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
      >
        <ArrowDown size={20} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
