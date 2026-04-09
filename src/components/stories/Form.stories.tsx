"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff } from "lucide-react"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/FormField"
import {
  Combobox,
  ComboboxBadges,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
} from "@/components/ui/combobox"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Mask } from "@/utils/mask"

const meta = {
  title: "Components/Form",
  component: Field,
  parameters: {
    docs: {
      description: {
        component:
          "Form system built with React Hook Form, Zod for validation, and shadcn/ui Field components. Includes Field, FieldGroup, FieldLabel, FieldDescription, FieldError, FieldSet, and FieldLegend.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

const loginSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
})

function LoginFormExample() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const [submitted, setSubmitted] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  function onSubmit(data: z.infer<typeof loginSchema>) {
    setSubmitted(true)
    console.log("Login:", data)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Access your account on the Sessionly platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormField
              name="email"
              control={form.control}
              id="login-email"
              label="Email"
              required
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                />
              )}
            />
            <FormField
              name="password"
              control={form.control}
              id="login-password"
              label="Password"
              required
              render={({ field, fieldState }) => (
                <div className="relative">
                  <Input
                    {...field}
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="login-form"
          className="w-full"
          loading={submitted}
        >
          Sign in
        </Button>
      </CardFooter>
    </Card>
  )
}

export const Login: Story = {
  render: () => <LoginFormExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Login form with email and password validation using Zod + React Hook Form.",
      },
    },
  },
}

const profileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(50, "Name must be at most 50 characters."),
  email: z.string().email("Invalid email."),
  bio: z
    .string()
    .min(20, "Bio must be at least 20 characters.")
    .max(300, "Bio must be at most 300 characters."),
  expertise: z.string().min(2, "Provide your expertise area."),
  hourlyRate: z
    .string()
    .refine((v) => Mask.parseCurrency(v) > 0, "Invalid amount."),
})

function MentorProfileFormExample() {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      expertise: "",
      hourlyRate: "",
    },
  })

  const [submitted, setSubmitted] = React.useState(false)

  function onSubmit(data: z.infer<typeof profileSchema>) {
    setSubmitted(true)
    console.log("Profile:", data)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Mentor Profile</CardTitle>
        <CardDescription>
          Fill in your information to register as a mentor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormField
              name="name"
              control={form.control}
              id="profile-name"
              label="Full name"
              required
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="profile-name"
                  placeholder="John Doe"
                  aria-invalid={fieldState.invalid}
                />
              )}
            />
            <FormField
              name="email"
              control={form.control}
              id="profile-email"
              label="Email"
              required
              description="Used for notifications and communication with mentees."
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="profile-email"
                  type="email"
                  placeholder="mentor@sessionly.com"
                  aria-invalid={fieldState.invalid}
                />
              )}
            />
            <FormField
              name="expertise"
              control={form.control}
              id="profile-expertise"
              label="Expertise area"
              required
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="profile-expertise"
                  placeholder="Ex: Frontend, Backend, DevOps..."
                  aria-invalid={fieldState.invalid}
                />
              )}
            />
            <FormField
              name="bio"
              control={form.control}
              id="profile-bio"
              label="Bio"
              required
              description={({ field }) =>
                `${field.value.length}/300 characters`
              }
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  id="profile-bio"
                  placeholder="Share a bit about your experience and how you can help mentees..."
                  rows={4}
                  className="resize-none"
                  aria-invalid={fieldState.invalid}
                />
              )}
            />
            <FormField
              name="hourlyRate"
              control={form.control}
              id="profile-rate"
              label="Hourly rate (R$)"
              required
              description="Set the hourly price for your sessions."
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="profile-rate"
                  type="text"
                  inputMode="numeric"
                  placeholder="R$ 150,00"
                  aria-invalid={fieldState.invalid}
                  onChange={(event) => {
                    field.onChange(Mask.currency(event.target.value))
                  }}
                />
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Clear
        </Button>
        <Button type="submit" form="profile-form">
          {submitted ? "Saving..." : "Save Profile"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export const MentorProfile: Story = {
  render: () => <MentorProfileFormExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Complete mentor registration form with multiple fields, validation, and helper descriptions.",
      },
    },
  },
}

const expertiseComboboxSchema = z.object({
  expertise: z.array(z.string()).min(1, "Select at least one expertise area."),
})

const expertiseOptions = [
  { value: "react", label: "React" },
  { value: "next.js", label: "Next.js" },
  { value: "vue", label: "Vue.js" },
  { value: "node.js", label: "Node.js" },
  { value: "go", label: "Go" },
]

function FormWithComboboxExample() {
  const form = useForm<z.infer<typeof expertiseComboboxSchema>>({
    resolver: zodResolver(expertiseComboboxSchema),
    defaultValues: { expertise: ["react", "next.js"] },
  })

  function onSubmit(data: z.infer<typeof expertiseComboboxSchema>) {
    console.log("Expertise:", data)
  }

  const selectedValues = form.watch("expertise")
  const selectedOptions = expertiseOptions.filter((option) =>
    selectedValues.includes(option.value),
  )

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Mentor Expertise</CardTitle>
        <CardDescription>
          Choose one or more expertise areas using the combobox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-with-combobox" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormField
              name="expertise"
              control={form.control}
              id="expertise-combobox"
              label="Expertise areas"
              required
              description="You can search, select multiple items, and remove them below."
              render={({ field, fieldState }) => {
                const removeValue = (valueToRemove: string) => {
                  field.onChange(
                    field.value.filter((value) => value !== valueToRemove),
                  )
                }

                const selectedLabel =
                  field.value.length > 0
                    ? `${field.value.length} selected`
                    : "Select expertise..."

                return (
                  <Combobox
                    items={expertiseOptions}
                    multiple
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ComboboxTrigger
                      id="expertise-combobox"
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      {selectedLabel}
                    </ComboboxTrigger>
                    <ComboboxContent className="p-0">
                      <ComboboxInput
                        placeholder="Search expertise..."
                        className="h-9"
                      />
                      <ComboboxEmpty>No expertise found.</ComboboxEmpty>
                      {expertiseOptions.map((option) => (
                        <ComboboxItem key={option.value} value={option.value}>
                          {option.label}
                        </ComboboxItem>
                      ))}
                    </ComboboxContent>
                    <ComboboxBadges
                      items={selectedOptions}
                      removeValue={removeValue}
                    />
                  </Combobox>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="form-with-combobox">
          Save preferences
        </Button>
      </CardFooter>
    </Card>
  )
}

export const WithComboboxMultipleSelect: Story = {
  render: () => <FormWithComboboxExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Form example integrating the multiple-select Combobox with removable badges.",
      },
    },
  },
}

const feedbackSchema = z.object({
  rating: z.string().min(1, "Select a rating."),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters.")
    .max(500, "Comment must be at most 500 characters."),
})

function SessionFeedbackFormExample() {
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { rating: "", comment: "" },
  })

  const [submitted, setSubmitted] = React.useState(false)

  function onSubmit(data: z.infer<typeof feedbackSchema>) {
    setSubmitted(true)
    console.log("Feedback:", data)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Session Feedback</CardTitle>
        <CardDescription>
          How was your experience with{" "}
          <span className="font-medium text-foreground">Sarah Johnson</span>?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="feedback-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormField
              name="rating"
              control={form.control}
              label="Rating"
              required
              description="1 = Unsatisfied, 5 = Excellent"
              render={({ field }) => (
                <div className="flex gap-2">
                  {["1", "2", "3", "4", "5"].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => field.onChange(value)}
                      className={`inline-flex size-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                        field.value === value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background hover:bg-muted"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              )}
            />
            <FormField
              name="comment"
              control={form.control}
              id="feedback-comment"
              label="Comment"
              required
              description={({ field }) =>
                `${field.value.length}/500 characters`
              }
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  id="feedback-comment"
                  placeholder="Share what you thought about the session..."
                  rows={4}
                  className="resize-none"
                  aria-invalid={fieldState.invalid}
                />
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="feedback-form" className="w-full">
          {submitted ? "Submitting..." : "Submit Feedback"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export const SessionFeedback: Story = {
  render: () => <SessionFeedbackFormExample />,
  parameters: {
    docs: {
      description: {
        story: "Session feedback form with custom rating and comment textarea.",
      },
    },
  },
}

const contactSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(20, "Message must be at least 20 characters."),
})

function ContactFormExample() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "", message: "" },
  })

  function onSubmit(data: z.infer<typeof contactSchema>) {
    console.log("Contact:", data)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Contact</CardTitle>
        <CardDescription>Send a message to support.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormField
              name="subject"
              control={form.control}
              id="contact-subject"
              label="Subject"
              required
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="contact-subject"
                  placeholder="Question about scheduling"
                  aria-invalid={fieldState.invalid}
                />
              )}
            />
            <FormField
              name="message"
              control={form.control}
              id="contact-message"
              label="Message"
              required
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  id="contact-message"
                  placeholder="Describe your question or issue..."
                  rows={5}
                  className="resize-none"
                  aria-invalid={fieldState.invalid}
                />
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Clear
        </Button>
        <Button type="submit" form="contact-form">
          Send
        </Button>
      </CardFooter>
    </Card>
  )
}

export const Contact: Story = {
  render: () => <ContactFormExample />,
  parameters: {
    docs: {
      description: {
        story: "Simple contact form with subject and message.",
      },
    },
  },
}

function ValidationShowcaseExample() {
  const schema = z.object({
    required: z.string().min(1, "Required field."),
    minLength: z.string().min(5, "Minimum of 5 characters."),
    email: z.string().email("Invalid email."),
    number: z
      .string()
      .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Invalid number."),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { required: "", minLength: "", email: "", number: "" },
    mode: "onTouched",
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Validation Showcase</CardTitle>
        <CardDescription>
          Examples of different validation rules. Click outside a field to
          trigger validation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(() => {})}>
          <FieldGroup>
            <FormField
              name="required"
              control={form.control}
              id="v-required"
              label={"Required field"}
              required
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="v-required"
                  placeholder="Type something..."
                  aria-invalid={fieldState.invalid}
                />
              )}
            />
            <FormField
              name="minLength"
              control={form.control}
              id="v-minlength"
              label="Minimum characters"
              description={({ field }) =>
                `${field.value.length}/5 minimum characters`
              }
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="v-minlength"
                  placeholder="Minimum 5 characters"
                  aria-invalid={fieldState.invalid}
                />
              )}
            />
            <FormField
              name="email"
              control={form.control}
              id="v-email"
              label="Email validation"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="v-email"
                  type="email"
                  placeholder="email@example.com"
                  aria-invalid={fieldState.invalid}
                />
              )}
            />
            <FormField
              name="number"
              control={form.control}
              id="v-number"
              label="Numeric validation"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="v-number"
                  placeholder="Positive numbers only"
                  aria-invalid={fieldState.invalid}
                />
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          className="w-full"
        >
          Reset Fields
        </Button>
      </CardFooter>
    </Card>
  )
}

export const ValidationShowcase: Story = {
  render: () => <ValidationShowcaseExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Demonstration of different validation types: required, minimum length, email format, and numeric validation.",
      },
    },
  },
}

export const WithFieldSet: Story = {
  render: () => (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Session Configuration</CardTitle>
        <CardDescription>
          Configure the details of your next mentoring session.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Session Information</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fs-topic">Topic</FieldLabel>
                <Input id="fs-topic" placeholder="Ex: Code Review" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fs-description">Description</FieldLabel>
                <Textarea
                  id="fs-description"
                  placeholder="Describe what you would like to discuss..."
                  rows={3}
                  className="resize-none"
                />
                <FieldDescription>
                  Helps the mentor prepare for the session.
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Preferences</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fs-duration">Duration</FieldLabel>
                <Input id="fs-duration" placeholder="30, 45, or 60 minutes" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fs-notes">Additional notes</FieldLabel>
                <Textarea
                  id="fs-notes"
                  placeholder="Anything else the mentor should know..."
                  rows={2}
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Schedule Session</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Form using FieldSet and FieldLegend to group related fields into logical sections.",
      },
    },
  },
}
