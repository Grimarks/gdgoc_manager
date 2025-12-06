import React, { forwardRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/utils.js";

const Progress = forwardRef(({ value = 0, className, ...props }, ref) => {
    return (
        <ProgressPrimitive.Root
            ref={ref}
            className={cn(
                "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
                "transition-all duration-200",
                className
            )}
            {...props}
        >
            <ProgressPrimitive.Indicator
                className="h-full bg-primary transition-all duration-300"
                style={{ transform: `translateX(-${100 - value}%)` }}
            />
        </ProgressPrimitive.Root>
    );
});

Progress.displayName = "Progress";
export { Progress };
