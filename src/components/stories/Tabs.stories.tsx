import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          "Tabs for navigating between content sections. Supports default and line variants, plus vertical orientation.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Mentor profile summary and stats.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>120+ sessions completed with a 4.9 average rating.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sessions">
        <Card>
          <CardHeader>
            <CardTitle>Sessions</CardTitle>
            <CardDescription>Upcoming and past sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>3 upcoming sessions this week.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reviews">
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>What mentees say.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>"Amazing session! Very insightful and well-structured."</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
}

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-[400px]">
      <TabsList variant="line">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-3">
        <p className="text-muted-foreground">Showing all sessions.</p>
      </TabsContent>
      <TabsContent value="scheduled" className="mt-3">
        <p className="text-muted-foreground">Showing scheduled sessions.</p>
      </TabsContent>
      <TabsContent value="completed" className="mt-3">
        <p className="text-muted-foreground">Showing completed sessions.</p>
      </TabsContent>
      <TabsContent value="cancelled" className="mt-3">
        <p className="text-muted-foreground">Showing cancelled sessions.</p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The "line" variant uses an underline indicator, ideal for secondary navigation.',
      },
    },
  },
}

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="profile" orientation="vertical" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Manage your public profile information.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="sessions" className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Session Settings</CardTitle>
            <CardDescription>
              Configure session defaults and preferences.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="billing" className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Manage payment methods and invoices.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose how you get notified.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Vertical tabs for side navigation in settings pages.",
      },
    },
  },
}
