"use client"

import { type KeyboardEvent, useRef, useState } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"

type Props = {
  tags: string[]
  placeholder?: string
  onAdd: (tag: string) => void
  onRemove: (tag: string) => void
  className?: string
}

export function TagInput({
  tags,
  placeholder,
  onAdd,
  onRemove,
  className,
}: Props) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      const trimmed = inputValue.trim()
      if (trimmed && !tags.includes(trimmed)) {
        onAdd(trimmed)
        setInputValue("")
      }
    }
    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      onRemove(tags[tags.length - 1])
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-10 cursor-text flex-wrap items-center gap-1.5 rounded-lg border border-input bg-transparent px-3 py-2 transition-colors",
        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        "group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:ring-3 group-data-[invalid=true]/field:ring-destructive/20",
        "dark:bg-input/30 dark:group-data-[invalid=true]/field:border-destructive/50 dark:group-data-[invalid=true]/field:ring-destructive/40",
        className,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <AnimatePresence initial={false}>
        {tags.map((tag) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.14 }}
            className="flex items-center gap-1 rounded-md bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/25"
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={(e) => {
                e.stopPropagation()
                onRemove(tag)
              }}
              className="rounded-full p-px opacity-60 transition-opacity hover:opacity-100"
            >
              <X className="size-2.5" />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>

      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="min-w-20 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
      />
    </div>
  )
}
