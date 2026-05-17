"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/FormField"
import {
  loginSchema,
  type LoginFormData,
} from "@/modules/auth/schemas/auth.schema"

const EASE_EXPO = [0.22, 1, 0.36, 1] as const

const INPUT_CLASS =
  "border-border bg-muted text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary/70 focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(data: LoginFormData) {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      if (result.code === "SERVER_ERROR") {
        toast.error("Service unavailable. Please try again later.")
      } else {
        toast.error("Wrong email or password. Please try again.")
      }
      return
    }

    toast.success("Welcome back!")
    // TODO: redirect to /dashboard
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_EXPO }}
      className="space-y-10"
    >
      {/* Header */}
      <div className="space-y-3">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE_EXPO }}
          className="text-foreground"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
            fontWeight: 300,
            lineHeight: 1.1,
          }}
        >
          Welcome back.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: EASE_EXPO }}
          className="text-sm text-muted-foreground"
        >
          Enter your credentials to continue
        </motion.p>
      </div>

      {/* Form */}
      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.24, ease: EASE_EXPO }}
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
                className={INPUT_CLASS}
              />
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.32, ease: EASE_EXPO }}
        >
          <FormField
            name="password"
            control={control}
            label="Password"
            required
            render={({ field }) => (
              <div className="relative">
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`${INPUT_CLASS} pr-10`}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
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
        </motion.div>
      </form>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.4, ease: EASE_EXPO }}
        className="space-y-4"
      >
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            form="login-form"
            size="lg"
            className="group w-full gap-2 transition-shadow hover:shadow-glow"
            loading={isSubmitting}
          >
            Sign in
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </motion.div>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
            onClick={() => reset()}
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </motion.div>
  )
}
