import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          "Accessible checkbox built on Base UI. Supports checked, unchecked, and indeterminate states with smooth animations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Checkbox id="d1" disabled />
        <Label htmlFor="d1" className="opacity-50">
          Disabled unchecked
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="d2" disabled defaultChecked />
        <Label htmlFor="d2" className="opacity-50">
          Disabled checked
        </Label>
      </div>
    </div>
  ),
}

export const FormGroup: Story = {
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium mb-2">
        Notification preferences
      </legend>
      {[
        { id: "email-notif", label: "Email notifications" },
        { id: "sms-notif", label: "SMS notifications" },
        { id: "push-notif", label: "Push notifications" },
        { id: "session-reminder", label: "Session reminders" },
      ].map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Checkbox id={item.id} defaultChecked={item.id === "email-notif"} />
          <Label htmlFor={item.id}>{item.label}</Label>
        </div>
      ))}
    </fieldset>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example checkbox group for preference forms.",
      },
    },
  },
}
