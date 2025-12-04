import { useState } from "react";

export function useToast() {
    const [toasts, setToasts] = useState([]);

    function addToast(toast) {
        setToasts((prev) => [...prev, toast]);
    }

    function removeToast(id) {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }

    return { toasts, addToast, removeToast };
}
