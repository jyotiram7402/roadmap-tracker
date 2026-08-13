"use client";
import { useEffect, useState } from "react";

// Rotates the highlighted hero phrase through roles: "Crack your next ___ job".
const ROLES = [
  "software engineering",
  "Java backend",
  "Java full-stack",
  "MERN stack",
  "AI engineer",
  "ML engineer",
  "data engineer",
  "SQL developer",
  "GenAI engineer",
  "DevOps engineer",
  "frontend",
  "backend",
];

export default function RotatingRoles() {
  const [i, setI] = useState(0);
  const [on, setOn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setOn(false); // fade current word out
      setTimeout(() => {
        setI((p) => (p + 1) % ROLES.length);
        setOn(true); // fade next word in
      }, 260);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`inline-block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent transition-[opacity,transform] duration-300 ease-out ${
        on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      }`}
      style={{ willChange: "opacity, transform" }}
    >
      {ROLES[i]}
    </span>
  );
}
