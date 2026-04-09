import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"

const ColorSwatch = ({
  name,
  className,
  textClass = "text-foreground",
}: {
  name: string
  className: string
  textClass?: string
}) => (
  <div className="flex items-center gap-3">
    <div className={`size-10 rounded-lg border border-border ${className}`} />
    <span className={`text-sm font-mono ${textClass}`}>{name}</span>
  </div>
)

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
type Step = (typeof STEPS)[number]
type ColorPrefix =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "warning"
  | "error"

const BG_CLASS_MAP: Record<ColorPrefix, Record<Step, string>> = {
  primary: {
    50: "bg-primary-50",
    100: "bg-primary-100",
    200: "bg-primary-200",
    300: "bg-primary-300",
    400: "bg-primary-400",
    500: "bg-primary-500",
    600: "bg-primary-600",
    700: "bg-primary-700",
    800: "bg-primary-800",
    900: "bg-primary-900",
    950: "bg-primary-950",
  },
  secondary: {
    50: "bg-secondary-50",
    100: "bg-secondary-100",
    200: "bg-secondary-200",
    300: "bg-secondary-300",
    400: "bg-secondary-400",
    500: "bg-secondary-500",
    600: "bg-secondary-600",
    700: "bg-secondary-700",
    800: "bg-secondary-800",
    900: "bg-secondary-900",
    950: "bg-secondary-950",
  },
  neutral: {
    50: "bg-neutral-50",
    100: "bg-neutral-100",
    200: "bg-neutral-200",
    300: "bg-neutral-300",
    400: "bg-neutral-400",
    500: "bg-neutral-500",
    600: "bg-neutral-600",
    700: "bg-neutral-700",
    800: "bg-neutral-800",
    900: "bg-neutral-900",
    950: "bg-neutral-950",
  },
  success: {
    50: "bg-success-50",
    100: "bg-success-100",
    200: "bg-success-200",
    300: "bg-success-300",
    400: "bg-success-400",
    500: "bg-success-500",
    600: "bg-success-600",
    700: "bg-success-700",
    800: "bg-success-800",
    900: "bg-success-900",
    950: "bg-success-950",
  },
  warning: {
    50: "bg-warning-50",
    100: "bg-warning-100",
    200: "bg-warning-200",
    300: "bg-warning-300",
    400: "bg-warning-400",
    500: "bg-warning-500",
    600: "bg-warning-600",
    700: "bg-warning-700",
    800: "bg-warning-800",
    900: "bg-warning-900",
    950: "bg-warning-950",
  },
  error: {
    50: "bg-error-50",
    100: "bg-error-100",
    200: "bg-error-200",
    300: "bg-error-300",
    400: "bg-error-400",
    500: "bg-error-500",
    600: "bg-error-600",
    700: "bg-error-700",
    800: "bg-error-800",
    900: "bg-error-900",
    950: "bg-error-950",
  },
}

const ColorScale = ({
  name,
  prefix,
}: {
  name: string
  prefix: ColorPrefix
}) => {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-2 capitalize">{name}</h3>
      <div className="flex gap-1">
        {STEPS.map((step) => (
          <div key={step} className="flex flex-col items-center gap-1">
            <div
              className={`size-10 rounded-md ${BG_CLASS_MAP[prefix][step]}`}
            />
            <span className="text-[10px] text-muted-foreground">{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SemanticColors() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Semantic Colors</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <ColorSwatch name="background" className="bg-background" />
          <ColorSwatch name="foreground" className="bg-foreground" />
          <ColorSwatch name="primary" className="bg-primary" />
          <ColorSwatch
            name="primary-foreground"
            className="bg-primary-foreground"
          />
          <ColorSwatch name="secondary" className="bg-secondary" />
          <ColorSwatch name="muted" className="bg-muted" />
          <ColorSwatch
            name="muted-foreground"
            className="bg-muted-foreground"
          />
          <ColorSwatch name="accent" className="bg-accent" />
          <ColorSwatch name="destructive" className="bg-destructive" />
          <ColorSwatch name="success" className="bg-success" />
          <ColorSwatch name="warning" className="bg-warning" />
          <ColorSwatch name="border" className="bg-border" />
          <ColorSwatch name="ring" className="bg-ring" />
          <ColorSwatch name="card" className="bg-card" />
          <ColorSwatch name="popover" className="bg-popover" />
          <ColorSwatch name="input" className="bg-input" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Color Scales</h2>
        <div className="space-y-5">
          <ColorScale name="Primary (Purple)" prefix="primary" />
          <ColorScale
            name="Secondary (Purple-tinted Neutral)"
            prefix="secondary"
          />
          <ColorScale name="Neutral" prefix="neutral" />
          <ColorScale name="Success (Green)" prefix="success" />
          <ColorScale name="Warning (Amber)" prefix="warning" />
          <ColorScale name="Error (Red)" prefix="error" />
        </div>
      </div>
    </div>
  )
}

function TypographyShowcase() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Typography</h2>
      <div className="space-y-4">
        <div>
          <span className="text-xs text-muted-foreground font-mono">
            font-heading / text-4xl
          </span>
          <p className="font-heading text-4xl font-bold">Heading Display</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground font-mono">
            font-heading / text-3xl
          </span>
          <p className="font-heading text-3xl font-semibold">Heading Large</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground font-mono">
            font-heading / text-2xl
          </span>
          <p className="font-heading text-2xl font-semibold">Heading Medium</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground font-mono">
            font-heading / text-xl
          </span>
          <p className="font-heading text-xl font-medium">Heading Small</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground font-mono">
            font-heading / text-lg
          </span>
          <p className="font-heading text-lg font-medium">Heading XSmall</p>
        </div>
      </div>
      <hr className="border-border" />
      <div className="space-y-3">
        <div>
          <span className="text-xs text-muted-foreground font-mono">
            text-base / body
          </span>
          <p className="text-base">
            Body text for paragraphs and main content. This is the default
            reading size used across the platform for optimal readability.
          </p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground font-mono">
            text-sm / body-sm
          </span>
          <p className="text-sm">
            Smaller body text for secondary content, descriptions, and
            supporting information.
          </p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground font-mono">
            text-xs / caption
          </span>
          <p className="text-xs text-muted-foreground">
            Caption text for timestamps, metadata, and tertiary information.
          </p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground font-mono">
            text-sm font-medium / label
          </span>
          <p className="text-sm font-medium">Form label text</p>
        </div>
      </div>
      <hr className="border-border" />
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground font-mono">
          Font Weights
        </span>
        <div className="space-y-1">
          <p className="font-light">Light (300)</p>
          <p className="font-normal">Regular (400)</p>
          <p className="font-medium">Medium (500)</p>
          <p className="font-semibold">Semibold (600)</p>
          <p className="font-bold">Bold (700)</p>
        </div>
      </div>
    </div>
  )
}

function SpacingShowcase() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Spacing Scale</h2>
      <div className="space-y-2">
        {[
          { name: "0.5 (2px)", size: "w-0.5" },
          { name: "1 (4px)", size: "w-1" },
          { name: "1.5 (6px)", size: "w-1.5" },
          { name: "2 (8px)", size: "w-2" },
          { name: "3 (12px)", size: "w-3" },
          { name: "4 (16px)", size: "w-4" },
          { name: "6 (24px)", size: "w-6" },
          { name: "8 (32px)", size: "w-8" },
          { name: "12 (48px)", size: "w-12" },
          { name: "16 (64px)", size: "w-16" },
          { name: "24 (96px)", size: "w-24" },
        ].map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div className={`h-4 rounded-sm bg-primary ${item.size}`} />
            <span className="text-xs font-mono text-muted-foreground">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RadiusShowcase() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Border Radius</h2>
      <div className="flex flex-wrap gap-4">
        {[
          { name: "sm", className: "rounded-sm" },
          { name: "md", className: "rounded-md" },
          { name: "lg", className: "rounded-lg" },
          { name: "xl", className: "rounded-xl" },
          { name: "2xl", className: "rounded-2xl" },
          { name: "3xl", className: "rounded-3xl" },
          { name: "full", className: "rounded-full" },
        ].map((item) => (
          <div key={item.name} className="flex flex-col items-center gap-2">
            <div
              className={`size-16 border-2 border-primary bg-primary/10 ${item.className}`}
            />
            <span className="text-xs font-mono text-muted-foreground">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ShadowShowcase() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Shadows</h2>
      <div className="flex flex-wrap gap-6">
        {[
          { name: "shadow-xs", className: "shadow-xs" },
          { name: "shadow-sm", className: "shadow-sm" },
          { name: "shadow-md", className: "shadow-md" },
          { name: "shadow-lg", className: "shadow-lg" },
          { name: "shadow-xl", className: "shadow-xl" },
          { name: "shadow-2xl", className: "shadow-2xl" },
          { name: "shadow-card", className: "shadow-card" },
          { name: "shadow-elevated", className: "shadow-elevated" },
          { name: "shadow-glow", className: "shadow-glow" },
        ].map((item) => (
          <div key={item.name} className="flex flex-col items-center gap-2">
            <div className={`size-20 rounded-lg bg-card ${item.className}`} />
            <span className="text-xs font-mono text-muted-foreground">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const meta = {
  title: "Foundations/Design Tokens",
  parameters: {
    docs: {
      description: {
        component:
          "Visual documentation of the Sessionly Design System tokens. Includes colors, typography, spacing, border radius, and shadows.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj

export const Colors: Story = {
  render: () => <SemanticColors />,
  parameters: {
    docs: {
      description: {
        story:
          "Semantic colors automatically adapt to the theme (light/dark). Full scales (50-950) are available for each category.",
      },
    },
  },
}

export const Typography: Story = {
  render: () => <TypographyShowcase />,
  parameters: {
    docs: {
      description: {
        story:
          "Typography system based on Geist Sans. Includes semantic tokens for heading, body, caption, and label.",
      },
    },
  },
}

export const Spacing: Story = {
  render: () => <SpacingShowcase />,
  parameters: {
    docs: {
      description: {
        story: "Spacing scale based on 4px increments.",
      },
    },
  },
}

export const BorderRadius: Story = {
  render: () => <RadiusShowcase />,
  parameters: {
    docs: {
      description: {
        story:
          "Border radius values calculated from a base value (`--radius: 0.625rem`). All scale proportionally.",
      },
    },
  },
}

export const Shadows: Story = {
  render: () => <ShadowShowcase />,
  parameters: {
    docs: {
      description: {
        story:
          "Default Tailwind shadows plus custom shadows (card, elevated, glow). Custom shadows automatically adapt to dark mode.",
      },
    },
  },
}
