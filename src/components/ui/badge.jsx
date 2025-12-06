import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-smooth",
    {
        variants: {
            variant: {
                blue: "bg-[hsl(var(--gdg-blue)/0.12)] text-[hsl(var(--gdg-blue))] border-transparent",
                red: "bg-[hsl(var(--gdg-red)/0.12)] text-[hsl(var(--gdg-red))] border-transparent",
                yellow: "bg-[hsl(var(--gdg-yellow)/0.20)] text-[hsl(var(--gdg-yellow))] border-transparent",
                green: "bg-[hsl(var(--gdg-green)/0.12)] text-[hsl(var(--gdg-green))] border-transparent",

                outline: "border-[hsl(var(--border))] text-foreground bg-white",
            },
        },
        defaultVariants: {
            variant: "outline",
        },
    }
);

export function Badge({ className, variant, ...props }) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
