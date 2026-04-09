import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { Mail, ArrowRight, Plus, Trash2, Check, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Versatile button with multiple variants, sizes, and states. Built on Base UI with CVA for variant management.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "success",
        "warning",
        "link",
      ],
      description: "Button visual style",
    },
    size: {
      control: "select",
      options: [
        "xs",
        "sm",
        "default",
        "lg",
        "xl",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
      description: "Button size",
    },
    loading: {
      control: "boolean",
      description: "Shows spinner and disables interactions",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
}

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
}

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
}

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
}

export const Destructive: Story = {
  args: {
    children: "Delete Account",
    variant: "destructive",
  },
}

export const Success: Story = {
  args: {
    children: "Confirmed",
    variant: "success",
  },
}

export const Warning: Story = {
  args: {
    children: "Caution",
    variant: "warning",
  },
}

export const Link: Story = {
  args: {
    children: "Learn more",
    variant: "link",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available variants shown side by side.",
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available text sizes.",
      },
    },
  },
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Mail data-icon="inline-start" />
        Login with Email
      </Button>
      <Button variant="outline">
        Download
        <Download data-icon="inline-end" />
      </Button>
      <Button variant="success">
        <Check data-icon="inline-start" />
        Confirmed
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use `data-icon="inline-start"` or `data-icon="inline-end"` on icons for automatic padding adjustment.',
      },
    },
  },
}

export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon-xs" variant="ghost">
        <Plus />
      </Button>
      <Button size="icon-sm" variant="ghost">
        <Plus />
      </Button>
      <Button size="icon" variant="outline">
        <Plus />
      </Button>
      <Button size="icon-lg" variant="destructive">
        <Trash2 />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icon-only buttons in different sizes.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    children: "Please wait",
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading state displays an animated spinner and disables the button automatically.",
      },
    },
  },
}

export const LoadingVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Saving...</Button>
      <Button variant="outline" loading>
        Processing...
      </Button>
      <Button variant="success" loading>
        Confirming...
      </Button>
      <Button variant="destructive" loading>
        Deleting...
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
}

export const AsLink: Story = {
  render: () => (
    <Button render={<a href="https://sessionly.com" />}>
      <ArrowRight data-icon="inline-start" />
      Go to Sessionly
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Renders as an `<a>` using the Base UI `render` prop while preserving button styling.",
      },
    },
  },
}
