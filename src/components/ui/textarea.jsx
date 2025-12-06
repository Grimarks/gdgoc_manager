import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={cn(
                "flex min-h-[100px] w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            {...props}
        />
    );
});

Textarea.displayName = "Textarea";
export { Textarea };
