import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Badge } from "@/components/ui/badge"
import { Check, AlertTriangle, X, Star } from "lucide-react"

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "Compact badge for statuses, labels, and tags. Supports multiple variants and inline icons.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
      description: "Badge visual style",
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">
        <Check data-icon="inline-start" className="size-3" />
        Confirmed
      </Badge>
      <Badge variant="destructive">
        <X data-icon="inline-start" className="size-3" />
        Cancelled
      </Badge>
      <Badge variant="secondary">
        <Star data-icon="inline-start" className="size-3" />
        Featured
      </Badge>
      <Badge variant="outline">
        <AlertTriangle data-icon="inline-start" className="size-3" />
        Pending
      </Badge>
    </div>
  ),
}

export const SessionStatus: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="bg-success text-success-foreground">Scheduled</Badge>
      <Badge className="bg-primary text-primary-foreground">In Progress</Badge>
      <Badge className="bg-warning text-warning-foreground">Pending</Badge>
      <Badge variant="destructive">Cancelled</Badge>
      <Badge variant="secondary">Completed</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Usage example as session status indicators on the platform.",
      },
    },
  },
}

export const AsLink: Story = {
  render: () => (
    <Badge render={<a href="#" />} variant="outline">
      View Profile →
    </Badge>
  ),
  parameters: {
    docs: {
      description: {
        story: "Use the `render` prop to turn the badge into a clickable link.",
      },
    },
  },
}
