import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          "Toggle switch for on/off settings. Available in two sizes with full accessibility support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Switch size",
    },
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    defaultChecked: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="dark-mode" />
      <Label htmlFor="dark-mode">Dark Mode</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Switch id="d1" disabled />
        <Label htmlFor="d1" className="opacity-50">
          Disabled off
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="d2" disabled defaultChecked />
        <Label htmlFor="d2" className="opacity-50">
          Disabled on
        </Label>
      </div>
    </div>
  ),
}

export const SettingsForm: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      {[
        {
          id: "s1",
          label: "Email notifications",
          desc: "Receive session reminders",
          on: true,
        },
        {
          id: "s2",
          label: "Public profile",
          desc: "Allow others to find you",
          on: true,
        },
        {
          id: "s3",
          label: "Auto-record sessions",
          desc: "Record video calls automatically",
          on: false,
        },
        {
          id: "s4",
          label: "Marketing emails",
          desc: "Receive tips and updates",
          on: false,
        },
      ].map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <div>
            <Label htmlFor={item.id} className="text-sm font-medium">
              {item.label}
            </Label>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
          <Switch id={item.id} defaultChecked={item.on} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example settings form using switches.",
      },
    },
  },
}
