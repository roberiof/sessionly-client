"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CircleCheck, CircleX, Info, Undo2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

const meta = {
  title: "Components/Toast",
  parameters: {
    docs: {
      description: {
        component:
          "Toast feedback component powered by shadcn/ui + Sonner. Includes default, success, error, and actionable notifications.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function ToastShowcase() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Click the buttons below to trigger different toast states.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() =>
            toast("Session saved", {
              description:
                "Your mentoring session has been updated successfully.",
              icon: <Info className="size-4" />,
            })
          }
        >
          Default toast
        </Button>
        <Button
          variant="success"
          onClick={() =>
            toast.success("Payment confirmed", {
              description: "The mentee payment was processed successfully.",
              icon: <CircleCheck className="size-4" />,
            })
          }
        >
          Success toast
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            toast.error("Could not schedule session", {
              description:
                "There was a conflict with this time slot. Try another one.",
              icon: <CircleX className="size-4" />,
            })
          }
        >
          Error toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Session cancelled", {
              description: "You can undo this action for the next 10 seconds.",
              action: {
                label: "Undo",
                onClick: () =>
                  toast.success("Session restored", {
                    description: "The cancelled session was restored.",
                    icon: <Undo2 className="size-4" />,
                  }),
              },
            })
          }
        >
          Action toast
        </Button>
      </div>
      <Toaster richColors closeButton position="top-right" />
    </div>
  )
}

export const Playground: Story = {
  render: () => <ToastShowcase />,
}
