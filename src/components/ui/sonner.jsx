import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

const Toaster = ({ ...props }) => {
    const { theme = "light" } = useTheme();

    return (
        <Sonner
            theme={theme}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast bg-white text-gray-800 border border-gray-200 shadow-lg rounded-xl",
                    description: "text-gray-500",
                    actionButton:
                        "px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition",
                    cancelButton:
                        "px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition",
                },
            }}
            {...props}
        />
    );
};

export { Toaster, toast };
