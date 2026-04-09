import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Mail, Eye } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mask } from "@/utils/mask"
import { CustomInput } from "@/components/CustomInput"
import { FormField } from "@/components/FormField"
import { FieldGroup } from "@/components/ui/field"

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          "Text input field with support for validation, states, and form integration. Built on Base UI Input.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "number",
        "search",
        "tel",
        "url",
        "date",
        "time",
      ],
      description: "HTML input type",
    },
    disabled: {
      control: "boolean",
      description: "Disables the field",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter your name...",
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="you@example.com" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
    value: "Can't edit this",
  },
}

export const WithError: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="error-email">Email</Label>
      <Input
        type="email"
        id="error-email"
        placeholder="you@example.com"
        aria-invalid="true"
        defaultValue="invalid-email"
      />
      <p className="text-sm text-destructive">
        Please enter a valid email address.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use `aria-invalid="true"` to display the error state with a red border and ring.',
      },
    },
  },
}

export const FileInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="file">Upload File</Label>
      <Input type="file" id="file" />
    </div>
  ),
}

export const WithIconComposition: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-3">
      <CustomInput
        leftIcon={{ content: <Search className="size-4" /> }}
        placeholder="Search mentors..."
      />
      <CustomInput
        leftIcon={{ content: <Mail className="size-4" /> }}
        type="email"
        placeholder="Email address"
      />
      <CustomInput
        rightIcon={{ content: <Eye className="size-4" /> }}
        type="password"
        placeholder="Password"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `CustomInput` to render optional left and/or right icons while preserving all native Input props.",
      },
    },
  },
}

const contactSchema = z.object({
  email: z.string().email("Please provide a valid email."),
  query: z.string().min(3, "Search must have at least 3 characters."),
})

function InputWithFormFieldExample() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      query: "",
    },
    mode: "onTouched",
  })

  return (
    <form onSubmit={form.handleSubmit(() => {})} className="w-full max-w-sm">
      <FieldGroup>
        <FormField
          name="email"
          control={form.control}
          id="input-form-email"
          label="Email"
          required
          description="We use this email to notify updates."
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              id="input-form-email"
              type="email"
              placeholder="you@example.com"
              leftIcon={{ content: <Mail className="size-4" /> }}
              aria-invalid={fieldState.invalid}
            />
          )}
        />
        <FormField
          name="query"
          control={form.control}
          id="input-form-query"
          label="Search"
          description="Type a topic to find mentors."
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              id="input-form-query"
              placeholder="React, Node.js, Design..."
              leftIcon={{ content: <Search className="size-4" /> }}
              aria-invalid={fieldState.invalid}
            />
          )}
        />
      </FieldGroup>
    </form>
  )
}

export const WithFormField: Story = {
  render: () => <InputWithFormFieldExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Example of Input usage with `FormField` + React Hook Form validation, including icon support through `CustomInput`.",
      },
    },
  },
}

export const AllTypes: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-3">
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="Number" />
      <Input type="search" placeholder="Search" />
      <Input type="tel" placeholder="Phone" />
      <Input type="url" placeholder="URL" />
      <Input type="date" />
      <Input type="time" />
    </div>
  ),
}

export const DateAndTime: Story = {
  render: () => {
    const [dateTime, setDateTime] = React.useState("")

    return (
      <div className="grid w-full max-w-sm gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="date-time-mask">Date and time (masked)</Label>
          <Input
            id="date-time-mask"
            type="text"
            inputMode="numeric"
            placeholder="00/00/0000, 00:00"
            value={dateTime}
            onChange={(e) => setDateTime(Mask.dateTime(e.target.value))}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="date-native">Date (native)</Label>
          <Input id="date-native" type="date" />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="time-native">Time (native)</Label>
          <Input id="time-native" type="time" />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows one masked input for date and time (`DD/MM/YYYY, HH:mm`) plus native `date` and `time` inputs for comparison.",
      },
    },
  },
}
