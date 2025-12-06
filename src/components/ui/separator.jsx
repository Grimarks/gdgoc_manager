import React, { forwardRef } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../lib/utils.js";

const Separator = forwardRef(
    ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
        <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn(
                "shrink-0 bg-border",
                orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
                "transition-colors duration-200",
                className
            )}
            {...props}
        />
    )
);

Separator.displayName = "Separator";
export { Separator };
