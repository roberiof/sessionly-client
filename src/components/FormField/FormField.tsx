"use client"

import type { ReactNode } from "react"
import {
  Controller,
  type Control,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

type FormFieldRenderContext<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>
  fieldState: ControllerFieldState
}

type FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName
  control: Control<TFieldValues>
  id?: string
  label?: ReactNode
  required?: boolean
  description?:
    | ReactNode
    | ((context: FormFieldRenderContext<TFieldValues, TName>) => ReactNode)
  render: (context: FormFieldRenderContext<TFieldValues, TName>) => ReactNode
}

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  id,
  label,
  required,
  description,
  render,
}: FormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const resolvedDescription =
          typeof description === "function"
            ? description({ field, fieldState })
            : description

        return (
          <Field data-invalid={fieldState.invalid || undefined}>
            {label ? (
              <FieldLabel htmlFor={id} required={required}>
                {label}
              </FieldLabel>
            ) : null}
            {render({ field, fieldState })}
            {resolvedDescription ? (
              <FieldDescription>{resolvedDescription}</FieldDescription>
            ) : null}
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </Field>
        )
      }}
    />
  )
}
