import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Combobox,
  ComboboxBadges,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxTrigger,
} from "@/components/ui/combobox"
import { Label } from "@/components/ui/label"

type Option = {
  value: string
  label: string
}

const frameworks: Option[] = [
  { value: "next.js", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt" },
]

const specialtyGroups = {
  frontend: [
    { value: "frontend-react", label: "React" },
    { value: "frontend-vue", label: "Vue.js" },
    { value: "frontend-angular", label: "Angular" },
  ],
  backend: [
    { value: "backend-node", label: "Node.js" },
    { value: "backend-python", label: "Python" },
    { value: "backend-go", label: "Go" },
  ],
  other: [
    { value: "other-design", label: "UI/UX Design" },
    { value: "other-devops", label: "DevOps" },
    { value: "other-career", label: "Career Advice" },
  ],
} as const

const allSpecialties = [
  ...specialtyGroups.frontend,
  ...specialtyGroups.backend,
  ...specialtyGroups.other,
]

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component:
          "Styled combobox built on top of Base UI Combobox. Includes search, groups, empty state, and keyboard selection.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null)
    const selectedLabel =
      frameworks.find((framework) => framework.value === value)?.label ??
      "Select framework..."

    return (
      <Combobox items={frameworks} value={value} onValueChange={setValue}>
        <ComboboxTrigger className="w-[220px]">{selectedLabel}</ComboboxTrigger>
        <ComboboxContent className="w-[220px] p-0">
          <ComboboxInput placeholder="Search framework..." className="h-9" />
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          {frameworks.map((framework) => (
            <ComboboxItem key={framework.value} value={framework.value}>
              {framework.label}
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null)
    const selectedLabel =
      allSpecialties.find((specialty) => specialty.value === value)?.label ??
      "Choose your specialty"

    return (
      <div className="grid w-full max-w-sm gap-1.5">
        <Label>Expertise Area</Label>
        <Combobox items={allSpecialties} value={value} onValueChange={setValue}>
          <ComboboxTrigger className="w-full">{selectedLabel}</ComboboxTrigger>
          <ComboboxContent className="p-0">
            <ComboboxInput placeholder="Search expertise..." className="h-9" />
            <ComboboxEmpty>No specialty found.</ComboboxEmpty>
            <ComboboxGroup>
              <ComboboxLabel>Frontend</ComboboxLabel>
              {specialtyGroups.frontend.map((item) => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
            <ComboboxSeparator />
            <ComboboxGroup>
              <ComboboxLabel>Backend</ComboboxLabel>
              {specialtyGroups.backend.map((item) => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
            <ComboboxSeparator />
            <ComboboxGroup>
              <ComboboxLabel>Other</ComboboxLabel>
              {specialtyGroups.other.map((item) => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
}

export const MultipleSelect: Story = {
  render: () => {
    const [values, setValues] = React.useState<string[]>(["react", "next.js"])
    const removeValue = (valueToRemove: string) => {
      setValues((currentValues) =>
        currentValues.filter((value) => value !== valueToRemove),
      )
    }
    const selectedFrameworks = frameworks.filter((framework) =>
      values.includes(framework.value),
    )
    const selectedLabel =
      selectedFrameworks.length > 0
        ? `${selectedFrameworks.length} selected`
        : "Select frameworks..."

    return (
      <div className="grid w-full max-w-md gap-1.5">
        <Label>Frameworks (Multiple)</Label>
        <Combobox
          items={frameworks}
          multiple
          value={values}
          onValueChange={setValues}
        >
          <ComboboxTrigger className="w-full">{selectedLabel}</ComboboxTrigger>
          <ComboboxContent className="p-0">
            <ComboboxInput placeholder="Search frameworks..." className="h-9" />
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
          </ComboboxContent>
          <ComboboxBadges
            items={selectedFrameworks}
            removeValue={removeValue}
          />
        </Combobox>
      </div>
    )
  },
}

export const Small: Story = {
  render: () => {
    const options: Option[] = [
      { value: "all", label: "All Sessions" },
      { value: "upcoming", label: "Upcoming" },
      { value: "completed", label: "Completed" },
      { value: "cancelled", label: "Cancelled" },
    ]
    const [value, setValue] = React.useState<string | null>(null)

    return (
      <Combobox items={options} value={value} onValueChange={setValue}>
        <ComboboxTrigger className="w-[180px]" size="sm">
          {options.find((option) => option.value === value)?.label ?? "Filter"}
        </ComboboxTrigger>
        <ComboboxContent className="w-[180px] p-0">
          <ComboboxInput placeholder="Search..." className="h-8 text-xs" />
          <ComboboxEmpty>No result found.</ComboboxEmpty>
          {options.map((option) => (
            <ComboboxItem key={option.value} value={option.value}>
              {option.label}
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <Combobox items={[{ value: "a", label: "Option A" }]} defaultValue="a">
      <ComboboxTrigger className="w-[220px]" disabled>
        Option A
      </ComboboxTrigger>
      <ComboboxContent className="w-[220px] p-0">
        <ComboboxInput placeholder="Disabled" disabled />
        <ComboboxItem value="a">Option A</ComboboxItem>
      </ComboboxContent>
    </Combobox>
  ),
}
