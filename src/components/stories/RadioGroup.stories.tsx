import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          "Accessible radio button group. Allows exclusive selection between options. Built on Base UI Radio.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="r3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const SessionDuration: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <p className="text-sm font-medium mb-3">Session Duration</p>
      <RadioGroup defaultValue="60">
        {[
          { value: "30", label: "30 minutes", price: "$40" },
          { value: "60", label: "1 hour", price: "$80" },
          { value: "90", label: "1.5 hours", price: "$110" },
        ].map((opt) => (
          <div
            key={opt.value}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value={opt.value} id={`d-${opt.value}`} />
              <Label htmlFor={`d-${opt.value}`}>{opt.label}</Label>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {opt.price}
            </span>
          </div>
        ))}
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of selecting a session duration on the platform.",
      },
    },
  },
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="da" />
        <Label htmlFor="da" className="opacity-50">
          Selected (disabled)
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="db" />
        <Label htmlFor="db" className="opacity-50">
          Unselected (disabled)
        </Label>
      </div>
    </RadioGroup>
  ),
}
