import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star, Clock, Video } from "lucide-react"

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          "Versatile container for grouping related content. Composed of subcomponents: CardHeader, CardTitle, CardDescription, CardContent, CardFooter, and CardAction.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Card size",
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Session Scheduled</CardTitle>
        <CardDescription>
          Your mentoring session has been confirmed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          You have a 1-hour session with <strong>Sarah Johnson</strong> on
          Friday at 2:00 PM.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Reschedule</Button>
        <Button>Join Session</Button>
      </CardFooter>
    </Card>
  ),
}

export const MentorCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src="https://i.pravatar.cc/150?u=mentor1" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle>Sarah Johnson</CardTitle>
            <CardDescription>Senior Frontend Engineer</CardDescription>
          </div>
        </div>
        <CardAction>
          <Badge variant="default">Top Mentor</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="size-4 text-warning" />
            4.9
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-4" />
            120+ sessions
          </span>
          <span className="flex items-center gap-1">
            <Video className="size-4" />
            Online
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">System Design</Badge>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-sm font-medium">$80/hour</span>
        <Button size="sm">Book Session</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example mentor profile card used in the Sessionly platform.",
      },
    },
  },
}

export const Small: Story = {
  render: () => (
    <Card className="w-[300px]" size="sm">
      <CardHeader>
        <CardTitle>Quick Note</CardTitle>
        <CardDescription>A compact card variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Ideal for sidebars and dashboard widgets.</p>
      </CardContent>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
        <CardDescription>Your schedule for today</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { time: "10:00 AM", name: "Alex Chen", topic: "Career Advice" },
            { time: "2:00 PM", name: "Maria Lopez", topic: "Code Review" },
            { time: "4:30 PM", name: "David Kim", topic: "System Design" },
          ].map((session) => (
            <div
              key={session.time}
              className="flex items-center justify-between rounded-md border p-2.5"
            >
              <div>
                <p className="font-medium">{session.name}</p>
                <p className="text-xs text-muted-foreground">{session.topic}</p>
              </div>
              <Badge variant="outline">{session.time}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  ),
}
