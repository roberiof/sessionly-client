import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component:
          "Multiline text field with auto-sizing via `field-sizing-content`. Supports validation and states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Write your message...",
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="message">Message to mentor</Label>
      <Textarea
        id="message"
        placeholder="Describe what you'd like to discuss in the session..."
      />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: "This field is disabled",
    disabled: true,
  },
}

export const WithError: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" aria-invalid="true" defaultValue="Hi" />
      <p className="text-sm text-destructive">
        Bio must be at least 20 characters long.
      </p>
    </div>
  ),
}
