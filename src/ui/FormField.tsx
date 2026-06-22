import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/Label"

export interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helpText?: string
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helpText, className, id, ...props }, ref) => {
    const generatedId = React.useId()
    const fieldId = id ?? generatedId
    const errorId = `${fieldId}-error`
    const helpId = `${fieldId}-help`

    return (
      <div className="grid gap-1.5">
        <Label htmlFor={fieldId}>{label}</Label>
        <input
          id={fieldId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helpText ? helpId : undefined
          }
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-white/70 px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 hover:border-primary/50 focus-visible:outline-none focus-visible:border-primary/75 focus-visible:ring-4 focus-visible:ring-ring/20 focus-visible:bg-white/95 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
            className,
          )}
          {...props}
        />
        {error && (
          <span id={errorId} role="alert" className="text-sm text-destructive">
            {error}
          </span>
        )}
        {helpText && !error && (
          <span id={helpId} className="text-sm text-muted-foreground">
            {helpText}
          </span>
        )}
      </div>
    )
  },
)
FormField.displayName = "FormField"

export { FormField }
