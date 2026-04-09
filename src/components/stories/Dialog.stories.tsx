import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          "Accessible modal dialog with overlay, animations, and automatic focus. Built on Base UI Dialog.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
          <DialogDescription>
            Review and confirm your mentoring session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="topic">Topic</Label>
            <Input id="topic" defaultValue="React Architecture Review" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any specific areas you'd like to focus on?"
            />
          </div>
        </div>
        <DialogFooter showCloseButton>
          <Button>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const SimpleConfirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        Cancel Session
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Session?</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this session? The mentor will be
            notified and you may be eligible for a refund depending on the
            cancellation policy.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="destructive">Yes, Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: "Confirmation dialog for destructive actions.",
      },
    },
  },
}

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Terms of Service
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read and accept our terms to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[200px] overflow-y-auto rounded-md border p-3 text-sm text-muted-foreground">
          <p>
            By using Sessionly, you agree to our terms of service. These terms
            govern your use of the platform, including mentoring sessions, chat
            features, and payment processing...
          </p>
        </div>
        <DialogFooter>
          <Button>I Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
