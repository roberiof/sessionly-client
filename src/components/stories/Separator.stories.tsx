import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Separator } from "@/components/ui/separator"

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    docs: {
      description: {
        component:
          "Visual separator for dividing content sections. Supports horizontal and vertical orientation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-3">
      <div>
        <h4 className="text-sm font-medium">Session Details</h4>
        <p className="text-sm text-muted-foreground">
          Review your upcoming session info.
        </p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Mentor Notes</h4>
        <p className="text-sm text-muted-foreground">
          Prepare topics for discussion.
        </p>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3">
      <span className="text-sm">Dashboard</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Sessions</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Messages</span>
    </div>
  ),
}
