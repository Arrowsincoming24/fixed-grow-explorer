import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "gradient-primary text-white shadow-button hover:shadow-hero hover:scale-[1.05] active:scale-[0.98] hover:-translate-y-1",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft hover:shadow-lg",
        outline:
          "border-2 border-border bg-card text-card-foreground hover:bg-card-secondary hover:border-primary/40 shadow-soft hover:shadow-card",
        secondary:
          "gradient-secondary text-white shadow-button hover:shadow-hero hover:scale-[1.05] active:scale-[0.98] hover:-translate-y-1",
        ghost: "hover:bg-card-secondary hover:text-card-foreground rounded-lg",
        link: "text-primary underline-offset-4 hover:underline font-medium",
        premium: "gradient-hero text-white shadow-hero hover:shadow-button hover:scale-[1.08] active:scale-[0.95] hover:-translate-y-2 animate-glow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
