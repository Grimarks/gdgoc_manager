import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--gdg-blue))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                // PURE WHITE
                default:
                    "bg-white text-foreground border border-border hover:bg-gdgred",

                // GOOGLE BLUE
                blue:
                    "bg-[hsl(var(--gdg-blue))] text-white hover:bg-[hsl(var(--gdg-blue))]/80",

                // GOOGLE RED
                destructive:
                    "bg-[hsl(var(--gdg-red))] text-white hover:bg-[hsl(var(--gdg-red))]/80",

                // Outline minimal
                outline:
                    "border border-border bg-white hover:bg-muted hover:text-foreground",

                // GOOGLE GREEN
                success:
                    "bg-[hsl(var(--gdg-green))] text-white hover:bg-[hsl(var(--gdg-green))]/80",

                // GOOGLE YELLOW
                warning:
                    "bg-[hsl(var(--gdg-yellow))] text-foreground hover:bg-[hsl(var(--gdg-yellow))]/80",

                // HUUU IM A GHOST IM transparant(lupa inggris nya)
                ghost: "hover:bg-muted hover:text-foreground",

                link: "text-[hsl(var(--gdg-blue))] underline-offset-4 hover:underline",
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
);

const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
