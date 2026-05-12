"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { motion } from "motion/react"

import { Input } from "@/components/ui/input"
import { FormField } from "@/components/FormField"
import {
  clientRegisterSchema,
  type ClientRegisterFormData,
} from "@/modules/auth/schemas/auth.schema"
import { useRegister } from "@/api/auth/hooks"
import type { AuthErrorCode } from "@/api/auth/types"
import { TagInput } from "../TagInput"
import { REGISTER_ERROR_MESSAGES } from "../../constants"

const EASE_EXPO = [0.22, 1, 0.36, 1] as const

const INPUT_CLASS =
  "border-border bg-muted text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary/70 focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors"

type Props = {
  onSuccess: (email: string, password: string) => void
}

export function ClientForm({ onSuccess }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [interests, setInterests] = useState<string[]>([])

  const { mutate: register } = useRegister({
    options: {
      onSuccess: (_, variables) => {
        onSuccess(variables.email, variables.password)
      },
      onError: (error) => {
        const code = (error as { errorCode?: AuthErrorCode }).errorCode
        toast.error(
          code
            ? (REGISTER_ERROR_MESSAGES[code] ?? error.message)
            : error.message,
        )
      },
    },
  })

  const { control, handleSubmit, setValue } = useForm<ClientRegisterFormData>({
    resolver: zodResolver(clientRegisterSchema),
    defaultValues: {
      role: "CLIENT",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      interests: [],
    },
  })

  function addInterest(tag: string) {
    const updated = [...interests, tag]
    setInterests(updated)
    setValue("interests", updated, { shouldValidate: true })
  }

  function removeInterest(tag: string) {
    const updated = interests.filter((i) => i !== tag)
    setInterests(updated)
    setValue("interests", updated, { shouldValidate: true })
  }

  function onSubmit(data: ClientRegisterFormData) {
    register(data)
  }

  return (
    <motion.form
      id="register-form"
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: EASE_EXPO }}
      className="flex flex-col gap-4 px-1"
      noValidate
    >
      {[
        { name: "name" as const, label: "Full name", delay: 0.04 },
        { name: "email" as const, label: "Email", delay: 0.08 },
      ].map(({ name, label, delay }) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay, ease: EASE_EXPO }}
        >
          <FormField
            name={name}
            control={control}
            label={label}
            required
            render={({ field }) => (
              <Input
                {...field}
                id={name}
                type={name === "email" ? "email" : "text"}
                placeholder={name === "email" ? "you@example.com" : "John Doe"}
                autoComplete={name === "email" ? "email" : "name"}
                className={INPUT_CLASS}
              />
            )}
          />
        </motion.div>
      ))}

      {(
        [
          {
            name: "password" as const,
            label: "Password",
            show: showPassword,
            setShow: setShowPassword,
            delay: 0.12,
          },
          {
            name: "confirmPassword" as const,
            label: "Confirm password",
            show: showConfirmPassword,
            setShow: setShowConfirmPassword,
            delay: 0.16,
          },
        ] as const
      ).map(({ name, label, show, setShow, delay }) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay, ease: EASE_EXPO }}
        >
          <FormField
            name={name}
            control={control}
            label={label}
            required
            render={({ field }) => (
              <div className="relative">
                <Input
                  {...field}
                  id={name}
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`${INPUT_CLASS} pr-10`}
                />
                <button
                  type="button"
                  aria-label={show ? "Hide password" : "Show password"}
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {show ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            )}
          />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: EASE_EXPO }}
      >
        <FormField
          name="interests"
          control={control}
          label="Interests"
          required
          description="Press Enter to add each interest"
          render={() => (
            <TagInput
              tags={interests}
              placeholder="e.g. Product Design, AI…"
              onAdd={addInterest}
              onRemove={removeInterest}
            />
          )}
        />
      </motion.div>
    </motion.form>
  )
}
