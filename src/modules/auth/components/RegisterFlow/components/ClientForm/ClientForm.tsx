"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "motion/react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/FormField"
import {
  clientRegisterSchema,
  type ClientRegisterFormData,
} from "@/modules/auth/schemas/auth.schema"
import { useCreateUser } from "@/api/user/hooks"
import type { UserErrorCode } from "@/api/user/types"
import { TagInput } from "@/components/ui/tag-input"
import { REGISTER_ERROR_MESSAGES } from "../../constants"

const EASE_EXPO = [0.22, 1, 0.36, 1] as const

type Props = {
  onSuccess: (email: string, password: string) => void
  onBack: () => void
}

export function ClientForm({ onSuccess, onBack }: Props) {
  const [subStep, setSubStep] = useState<1 | 2>(1)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [interests, setInterests] = useState<string[]>([])

  const { mutate: createUser, isPending } = useCreateUser({
    options: {
      onSuccess: (_, variables) => {
        onSuccess(variables.email, variables.password)
      },
      onError: (error) => {
        const code = (error as { errorCode?: UserErrorCode }).errorCode
        toast.error(
          code
            ? (REGISTER_ERROR_MESSAGES[code] ?? error.message)
            : error.message,
        )
      },
    },
  })

  const { control, handleSubmit, setValue, trigger } =
    useForm<ClientRegisterFormData>({
      resolver: zodResolver(clientRegisterSchema),
      defaultValues: {
        role: "CLIENT",
        name: "",
        bio: "",
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

  async function handleNext() {
    const valid = await trigger(["name", "bio", "interests"])
    if (valid) {
      setDirection(1)
      setSubStep(2)
    }
  }

  function handleSubBack() {
    setDirection(-1)
    setSubStep(1)
  }

  function onSubmit(data: ClientRegisterFormData) {
    const { interests: iv, confirmPassword: _, ...rest } = data
    createUser({ ...rest, clientProfile: { interests: iv } })
  }

  return (
    <form
      id="register-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <div className="overflow-hidden px-1">
        <AnimatePresence mode="wait" initial={false}>
          {subStep === 1 ? (
            <motion.div
              key="profile"
              initial={{ x: direction * 32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -32, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE_EXPO }}
              className="flex flex-col gap-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.04, ease: EASE_EXPO }}
              >
                <FormField
                  name="name"
                  control={control}
                  label="Full name"
                  required
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.08, ease: EASE_EXPO }}
              >
                <FormField
                  name="bio"
                  control={control}
                  label="Bio"
                  required
                  description="A short description of who you are"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="bio"
                      placeholder="e.g. Product manager passionate about building great user experiences…"
                      autoComplete="off"
                      rows={3}
                    />
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.12, ease: EASE_EXPO }}
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
            </motion.div>
          ) : (
            <motion.div
              key="credentials"
              initial={{ x: direction * 32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -32, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE_EXPO }}
              className="flex flex-col gap-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.04, ease: EASE_EXPO }}
              >
                <FormField
                  name="email"
                  control={control}
                  label="Email"
                  required
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  )}
                />
              </motion.div>

              {(
                [
                  {
                    name: "password" as const,
                    label: "Password",
                    show: showPassword,
                    setShow: setShowPassword,
                    delay: 0.08,
                  },
                  {
                    name: "confirmPassword" as const,
                    label: "Confirm password",
                    show: showConfirmPassword,
                    setShow: setShowConfirmPassword,
                    delay: 0.12,
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
                          className="pr-10"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        {subStep === 1 ? (
          <>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                size="lg"
                className="group w-full gap-2 transition-shadow hover:shadow-glow"
                onClick={handleNext}
              >
                Next
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </motion.div>

            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="w-full gap-2 text-foreground/40 hover:text-foreground/70"
              onClick={onBack}
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="group w-full gap-2 transition-shadow hover:shadow-glow"
              >
                Create account
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </motion.div>

            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="w-full gap-2 text-foreground/40 hover:text-foreground/70"
              onClick={handleSubBack}
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </>
        )}
      </div>
    </form>
  )
}
