import type { SVGProps } from "react"

type Props = SVGProps<SVGSVGElement> & {
  size?: number
}

export function SessionlyLogo({ size = 36, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sessionly"
      {...props}
    >
      <rect width="36" height="36" rx="10" fill="oklch(0.55 0.24 230 / 0.18)" />
      <rect
        x="0.5"
        y="0.5"
        width="35"
        height="35"
        rx="9.5"
        stroke="oklch(0.65 0.24 230 / 0.35)"
      />
      <path
        d="M24.5 13C24.5 10.5 22.5 8.5 18.5 8.5C14.5 8.5 11.5 10.2 11.5 13C11.5 15.8 14.5 17.2 18 18C21.5 18.8 24.5 20.2 24.5 23.5C24.5 26.5 21.8 27.5 18 27.5C14.2 27.5 11.5 25.8 11.5 23"
        stroke="oklch(0.82 0.2 230)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
