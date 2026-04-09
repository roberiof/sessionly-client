import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTable, type DataTableColumn } from "@/components/DataTable"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpDown, Star } from "lucide-react"

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          "Table component for displaying tabular data. Composed of subcomponents: TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, and TableCaption.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const sessions = [
  {
    id: "SS001",
    mentor: "Sarah Johnson",
    mentee: "Carlos Silva",
    topic: "System Design",
    date: "2026-04-10",
    duration: "60 min",
    status: "confirmed" as const,
    price: "R$ 200,00",
  },
  {
    id: "SS002",
    mentor: "Alex Chen",
    mentee: "Maria Lopez",
    topic: "Career Advice",
    date: "2026-04-11",
    duration: "45 min",
    status: "pending" as const,
    price: "R$ 150,00",
  },
  {
    id: "SS003",
    mentor: "David Kim",
    mentee: "Ana Souza",
    topic: "Code Review",
    date: "2026-04-12",
    duration: "30 min",
    status: "completed" as const,
    price: "R$ 120,00",
  },
  {
    id: "SS004",
    mentor: "Emily Brown",
    mentee: "Pedro Santos",
    topic: "React Advanced",
    date: "2026-04-13",
    duration: "60 min",
    status: "cancelled" as const,
    price: "R$ 180,00",
  },
  {
    id: "SS005",
    mentor: "James Wilson",
    mentee: "Lucia Fernandes",
    topic: "TypeScript Patterns",
    date: "2026-04-14",
    duration: "45 min",
    status: "confirmed" as const,
    price: "R$ 160,00",
  },
]
type Session = (typeof sessions)[number]

const statusMap = {
  confirmed: { label: "Confirmed", variant: "default" as const },
  pending: { label: "Pending", variant: "secondary" as const },
  completed: { label: "Completed", variant: "outline" as const },
  cancelled: { label: "Cancelled", variant: "destructive" as const },
}

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>List of recent mentoring sessions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>Mentor</TableHead>
          <TableHead>Mentee</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <TableRow key={session.id}>
            <TableCell className="font-medium">{session.id}</TableCell>
            <TableCell>{session.mentor}</TableCell>
            <TableCell>{session.mentee}</TableCell>
            <TableCell>{session.topic}</TableCell>
            <TableCell>{session.date}</TableCell>
            <TableCell>{session.duration}</TableCell>
            <TableCell>
              <Badge variant={statusMap[session.status].variant}>
                {statusMap[session.status].label}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{session.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default table with mentoring session data and status badges.",
      },
    },
  },
}

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableCaption>Financial summary of sessions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Session</TableHead>
          <TableHead>Mentor</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions
          .filter((s) => s.status !== "cancelled")
          .map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.id}</TableCell>
              <TableCell>{session.mentor}</TableCell>
              <TableCell>{session.duration}</TableCell>
              <TableCell className="text-right">{session.price}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right font-bold">R$ 630,00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: "Table with footer showing the accumulated total.",
      },
    },
  },
}

export const WithAvatars: Story = {
  render: () => {
    const mentors = [
      {
        name: "Sarah Johnson",
        role: "Frontend Engineer",
        avatar: "SJ",
        rating: 4.9,
        sessions: 128,
        initials: "SJ",
      },
      {
        name: "Alex Chen",
        role: "Tech Lead",
        avatar: "AC",
        rating: 4.8,
        sessions: 95,
        initials: "AC",
      },
      {
        name: "David Kim",
        role: "Staff Engineer",
        avatar: "DK",
        rating: 4.7,
        sessions: 74,
        initials: "DK",
      },
      {
        name: "Emily Brown",
        role: "Engineering Manager",
        avatar: "EB",
        rating: 4.9,
        sessions: 156,
        initials: "EB",
      },
    ]

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mentor</TableHead>
            <TableHead>
              <span className="inline-flex items-center gap-1">
                Rating <ArrowUpDown className="size-3" />
              </span>
            </TableHead>
            <TableHead>Sessions</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mentors.map((mentor) => (
            <TableRow key={mentor.name}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`https://i.pravatar.cc/40?u=${mentor.initials}`}
                    />
                    <AvatarFallback>{mentor.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{mentor.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {mentor.role}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3.5 fill-warning text-warning" />
                  {mentor.rating}
                </span>
              </TableCell>
              <TableCell>{mentor.sessions} sessions</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon-xs">
                  <MoreHorizontal className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Table with avatars, ratings, and actions - ideal for listing mentors.",
      },
    },
  },
}

export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Session</TableHead>
          <TableHead>Mentor</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={4}
            className="h-24 text-center text-muted-foreground"
          >
            No sessions found.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: "Empty state for the table when there is no data to display.",
      },
    },
  },
}

export const Striped: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Topic</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Sessions Completed</TableHead>
          <TableHead className="text-right">Popularity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          {
            topic: "System Design",
            category: "Architecture",
            count: 342,
            popularity: "High",
          },
          {
            topic: "React Advanced",
            category: "Frontend",
            count: 289,
            popularity: "High",
          },
          {
            topic: "TypeScript Patterns",
            category: "Languages",
            count: 215,
            popularity: "Medium",
          },
          {
            topic: "Career Advice",
            category: "Career",
            count: 198,
            popularity: "Medium",
          },
          {
            topic: "Code Review",
            category: "Practices",
            count: 156,
            popularity: "Medium",
          },
          {
            topic: "Node.js Performance",
            category: "Backend",
            count: 124,
            popularity: "Low",
          },
        ].map((item, i) => (
          <TableRow
            key={item.topic}
            className={i % 2 === 0 ? "bg-muted/30" : ""}
          >
            <TableCell className="font-medium">{item.topic}</TableCell>
            <TableCell>
              <Badge variant="secondary">{item.category}</Badge>
            </TableCell>
            <TableCell>{item.count}</TableCell>
            <TableCell className="text-right">{item.popularity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: "Table with striped rows for better readability.",
      },
    },
  },
}

export const Compact: Story = {
  render: () => (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead className="h-8 px-2">Date</TableHead>
          <TableHead className="h-8 px-2">Time</TableHead>
          <TableHead className="h-8 px-2">Mentor</TableHead>
          <TableHead className="h-8 px-2">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          {
            date: "10/04",
            time: "10:00",
            mentor: "Sarah J.",
            status: "Confirmed",
          },
          {
            date: "11/04",
            time: "14:00",
            mentor: "Alex C.",
            status: "Pending",
          },
          {
            date: "12/04",
            time: "09:30",
            mentor: "David K.",
            status: "Confirmed",
          },
          {
            date: "13/04",
            time: "16:00",
            mentor: "Emily B.",
            status: "Cancelled",
          },
          {
            date: "14/04",
            time: "11:00",
            mentor: "James W.",
            status: "Confirmed",
          },
        ].map((row) => (
          <TableRow key={`${row.date}-${row.time}`}>
            <TableCell className="p-1.5 px-2">{row.date}</TableCell>
            <TableCell className="p-1.5 px-2">{row.time}</TableCell>
            <TableCell className="p-1.5 px-2">{row.mentor}</TableCell>
            <TableCell className="p-1.5 px-2">{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: "Compact table version, ideal for sidebars and widgets.",
      },
    },
  },
}

export const WithPagination: Story = {
  render: () => {
    const [pagination, setPagination] = React.useState({
      pageIndex: 0,
      pageSize: 3,
    })
    const columns: DataTableColumn<Session>[] = [
      {
        kind: "key",
        key: "id",
        header: "ID",
        headClassName: "w-[80px]",
        cellClassName: "font-medium",
      },
      {
        kind: "key",
        key: "mentor",
        header: "Mentor",
      },
      {
        kind: "key",
        key: "topic",
        header: "Topic",
      },
      {
        kind: "custom",
        id: "status",
        header: "Status",
        renderCell: (session: Session) => (
          <Badge variant={statusMap[session.status].variant}>
            {statusMap[session.status].label}
          </Badge>
        ),
      },
      {
        kind: "key",
        key: "price",
        header: "Price",
        headClassName: "text-right",
        cellClassName: "text-right",
      },
    ]

    return (
      <DataTable
        data={sessions}
        columns={columns}
        caption="Sessions with pagination controls."
        getRowKey={(session: Session) => session.id}
        pagination={{
          pagination,
          onPaginationChange: setPagination,
          className: "justify-end",
        }}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Table with TanStack-style pagination state (pageIndex/pageSize), page size selector, and page navigation.",
      },
    },
  },
}
