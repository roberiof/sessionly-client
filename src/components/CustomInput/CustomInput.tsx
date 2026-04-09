import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const renderIcon = (icon: {
  content: React.ReactNode
  onClick?: () => void
}) => {
  return icon.onClick ? (
    <button
      type="button"
      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
      onClick={icon.onClick}
    >
      {icon.content}
    </button>
  ) : (
    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
      {icon.content}
    </span>
  )
}

type CustomInputProps = React.ComponentProps<typeof Input> & {
  leftIcon?: { content: React.ReactNode; onClick?: () => void }
  rightIcon?: { content: React.ReactNode; onClick?: () => void }
}

function CustomInput({
  className,
  leftIcon,
  rightIcon,
  ...props
}: CustomInputProps) {
  return (
    <div className="relative">
      {leftIcon && renderIcon(leftIcon)}
      <Input
        className={cn(leftIcon && "pl-8", rightIcon && "pr-8", className)}
        {...props}
      />
      {rightIcon && renderIcon(rightIcon)}
    </div>
  )
}

export { CustomInput }
