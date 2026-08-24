export function PhoneIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 4.8c.4-1 1.5-1.5 2.5-1.1l1.7.7c.8.3 1.2 1.2 1 2.1l-.5 1.8c-.2.6 0 1.2.4 1.6l3.4 3.4c.4.4 1 .6 1.6.4l1.8-.5c.9-.2 1.8.2 2.1 1l.7 1.7c.4 1-.1 2.1-1.1 2.5-2.3.9-6.3.4-10.4-3.7S5.7 7.1 6.6 4.8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function StepIcon({ name }: { name: "compass" | "chat" | "map" | "spark" | "send" }) {
  return (
    <svg {...iconProps}>
      {name === "compass" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9.5l-2 5-5 2 2-5z" />
        </>
      )}
      {name === "chat" && <path d="M4 5h13a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-5 4V5z" />}
      {name === "map" && <path d="M9 3v15l-6 3V6l6-3zm0 0l6 3m-6-3v15m6-15l6-3v15l-6 3m0-15v15" />}
      {name === "spark" && (
        <>
          <path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z" />
          <path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
        </>
      )}
      {name === "send" && <path d="M2 12l19-9-7 19-3-8-8-2z" />}
    </svg>
  );
}

export function StatIcon({ name }: { name: "star" | "home" | "globe" | "heart" }) {
  return (
    <svg {...iconProps}>
      {name === "star" && <path d="M12 2l2.6 6.2L21 9l-5 4.6L17.4 21 12 17.4 6.6 21 8 13.6 3 9l6.4-.8z" />}
      {name === "home" && (
        <>
          <path d="M4 21V9l8-5 8 5v12" />
          <path d="M9 21v-6h6v6" />
        </>
      )}
      {name === "globe" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
        </>
      )}
      {name === "heart" && (
        <path d="M12 21s-7-4.35-9.5-8.8C.7 8.4 2.6 5 6 5c2 0 3.5 1.1 4.5 2.6C11.5 6.1 13 5 15 5c3.4 0 5.3 3.4 3.5 7.2C19 13.65 12 21 12 21z" />
      )}
    </svg>
  );
}
