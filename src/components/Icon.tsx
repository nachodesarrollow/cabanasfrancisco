import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "whatsapp"
  | "arrowRight"
  | "arrowUpRight"
  | "arrowDown"
  | "close"
  | "menu"
  | "chevronLeft"
  | "chevronRight"
  | "pin"
  | "users"
  | "bed"
  | "sofa"
  | "waves"
  | "flame"
  | "sun"
  | "clock"
  | "expand";

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  className?: string;
};

const strokeIcons: Partial<Record<IconName, ReactNode>> = {
  arrowRight: <path d="M4 12h15.5M13 5.5 19.5 12 13 18.5" />,
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  arrowDown: <path d="M12 4.5v15M5.5 13 12 19.5 18.5 13" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M3.5 8.5h17M3.5 15.5h17" />,
  chevronLeft: <path d="m14.5 5.5-7 6.5 7 6.5" />,
  chevronRight: <path d="m9.5 5.5 7 6.5-7 6.5" />,
  pin: (
    <>
      <path d="M12 21.5c4.2-4 7-7.2 7-11a7 7 0 1 0-14 0c0 3.8 2.8 7 7 11Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </>
  ),
  users: (
    <>
      <path d="M15.5 20v-1.6a4 4 0 0 0-4-4H6.5a4 4 0 0 0-4 4V20" />
      <circle cx="9" cy="7" r="3.4" />
      <path d="M16.2 3.9a3.4 3.4 0 0 1 0 6.5M21.5 20v-1.6a4 4 0 0 0-3-3.87" />
    </>
  ),
  bed: (
    <>
      <path d="M2.5 20v-7.5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2V20" />
      <path d="M4.5 10.5V6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v4" />
      <path d="M2.5 16.5h19" />
    </>
  ),
  sofa: (
    <>
      <path d="M19.5 9.5V6.8a2 2 0 0 0-2-2h-11a2 2 0 0 0-2 2v2.7" />
      <path d="M2.5 16.2v-4.4a2.2 2.2 0 0 1 4.4 0v1.7h10.2v-1.7a2.2 2.2 0 0 1 4.4 0v4.4a2 2 0 0 1-2 2H4.5a2 2 0 0 1-2-2Z" />
      <path d="M4.8 18.2V20M19.2 18.2V20" />
    </>
  ),
  waves: (
    <>
      <path d="M2.5 9.2c1.6 0 1.6-2 3.2-2s1.6 2 3.2 2 1.6-2 3.2-2 1.6 2 3.2 2 1.6-2 3.2-2 1.6 2 3.2 2" />
      <path d="M2.5 15.4c1.6 0 1.6-2 3.2-2s1.6 2 3.2 2 1.6-2 3.2-2 1.6 2 3.2 2 1.6-2 3.2-2 1.6 2 3.2 2" />
    </>
  ),
  flame: (
    <path d="M8.7 14.7A2.7 2.7 0 0 0 11.4 12c0-1.5-.5-2.2-1.1-3.2-1.1-2.3-.2-4.3 2.1-6.3.5 2.7 2.1 5.2 4.3 6.9 2.1 1.7 3.2 3.7 3.2 5.8a7.4 7.4 0 1 1-14.8 0c0-1.2.5-2.4 1.1-3.2a2.7 2.7 0 0 0 2.5 2.7Z" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
    </>
  ),
  expand: <path d="M9 3.5H3.5V9M15 3.5h5.5V9M9 20.5H3.5V15M15 20.5h5.5V15" />,
};

export function Icon({ name, className = "h-5 w-5", ...rest }: IconProps) {
  if (name === "whatsapp") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className={className}
        {...rest}
      >
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.17 6.44 6.6 2 12.05 2c2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.89 9.89m8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.9 0-3.17-1.24-6.16-3.48-8.41Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {strokeIcons[name]}
    </svg>
  );
}
