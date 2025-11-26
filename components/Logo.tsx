"use client";

export default function Logo({ className = "h-8 w-8", ...props }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* M */}
      <path
        d="M20 70 L20 20 L40 45 L60 20 L60 70"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* P */}
      <path
        d="M70 20 L70 70 
           M70 20 L90 20 L95 30 L95 45 L90 55 L70 55"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
