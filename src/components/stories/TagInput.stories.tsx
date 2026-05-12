import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { TagInput } from "@/components/ui/tag-input"
import { FormField } from "@/components/FormField"
import { FieldGroup } from "@/components/ui/field"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/TagInput",
  component: TagInput,
  parameters: {
    docs: {
      description: {
        component:
          "Multi-value tag input. Press Enter to add a tag, Backspace on empty input removes the last tag. Integrates with FormField for validation error states.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    tags: [],
    onAdd: () => {},
    onRemove: () => {},
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder shown when no tags are present",
    },
  },
} satisfies Meta<typeof TagInput>

export default meta
type Story = StoryObj<typeof meta>

function Controlled({ initialTags = [] }: { initialTags?: string[] }) {
  const [tags, setTags] = useState<string[]>(initialTags)
  return (
    <div className="w-full max-w-sm">
      <TagInput
        tags={tags}
        placeholder="e.g. React, TypeScript…"
        onAdd={(tag) => setTags((prev) => [...prev, tag])}
        onRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <Controlled />,
}

export const WithTags: Story = {
  render: () => <Controlled initialTags={["React", "TypeScript", "Next.js"]} />,
  parameters: {
    docs: {
      description: {
        story: "Pre-populated with tags. Press Backspace on empty input to remove the last one.",
      },
    },
  },
}

const tagSchema = z.object({
  skills: z.array(z.string()).min(2, "Add at least 2 skills"),
})

function WithFormFieldExample({ forceError = false }: { forceError?: boolean }) {
  const [tags, setTags] = useState<string[]>(forceError ? [] : [])
  const form = useForm<z.infer<typeof tagSchema>>({
    resolver: zodResolver(tagSchema),
    defaultValues: { skills: [] },
    mode: "onSubmit",
  })

  return (
    <form
      onSubmit={form.handleSubmit(() => {})}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FieldGroup>
        <FormField
          name="skills"
          control={form.control}
          label="Skills"
          required
          description="Press Enter to add each skill"
          render={() => (
            <TagInput
              tags={tags}
              placeholder="e.g. React, Node.js…"
              onAdd={(tag) => {
                const updated = [...tags, tag]
                setTags(updated)
                form.setValue("skills", updated, { shouldValidate: true })
              }}
              onRemove={(tag) => {
                const updated = tags.filter((t) => t !== tag)
                setTags(updated)
                form.setValue("skills", updated, { shouldValidate: true })
              }}
            />
          )}
        />
      </FieldGroup>
      <Button type="submit" size="sm" className="w-fit">
        Submit
      </Button>
    </form>
  )
}

export const WithFormField: Story = {
  render: () => <WithFormFieldExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Integrated with `FormField` + React Hook Form. Click Submit with fewer than 2 tags to trigger the error state.",
      },
    },
  },
}

export const ErrorState: Story = {
  render: () => {
    function ErrorExample() {
      const [tags, setTags] = useState<string[]>([])
      const form = useForm<z.infer<typeof tagSchema>>({
        resolver: zodResolver(tagSchema),
        defaultValues: { skills: [] },
        mode: "onSubmit",
      })

      return (
        <form
          onSubmit={form.handleSubmit(() => {})}
          className="flex w-full max-w-sm flex-col gap-4"
        >
          <FieldGroup>
            <FormField
              name="skills"
              control={form.control}
              label="Skills"
              required
              description="Add at least 2 skills"
              render={() => (
                <TagInput
                  tags={tags}
                  placeholder="e.g. React, Node.js…"
                  onAdd={(tag) => {
                    const updated = [...tags, tag]
                    setTags(updated)
                    form.setValue("skills", updated, { shouldValidate: true })
                  }}
                  onRemove={(tag) => {
                    const updated = tags.filter((t) => t !== tag)
                    setTags(updated)
                    form.setValue("skills", updated, { shouldValidate: true })
                  }}
                />
              )}
            />
          </FieldGroup>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="w-fit"
            onClick={() => form.trigger("skills")}
          >
            Trigger error
          </Button>
        </form>
      )
    }
    return <ErrorExample />
  },
  parameters: {
    docs: {
      description: {
        story:
          'Click "Trigger error" to see the red border and error message. The border style is driven by `group-data-[invalid=true]/field` from the parent `FormField`.',
      },
    },
  },
}
