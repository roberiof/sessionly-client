import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    docs: {
      description: {
        component:
          "Popover for displaying contextual content triggered by an element. Implementation based on Base UI Popover.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">Quick profile</h4>
            <p className="text-sm text-muted-foreground">
              Edit a few settings without leaving the current screen.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-3 items-center gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                defaultValue="Robert"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-3">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                defaultValue="Mentor"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const IconTrigger: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Settings />
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-muted p-2">
            <User className="size-4" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Personal account</p>
            <p className="text-sm text-muted-foreground">
              Adjust notification and privacy preferences.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
