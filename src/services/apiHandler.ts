import { AxiosError } from "axios";
import { toast } from "sonner";

export function handleApiError(error: unknown): void {
    if (error instanceof AxiosError) {
        if (error.response) {
            const err = error.response?.data?.meta?.message || "Server error occurred"
            toast.error(err, { position: "top-right" });
            return
        }

        if (error.request) {
            const err = "Network error. Please check your connection."
            toast.error(err, { position: "top-right" })
             return
        }
        toast.error(error.message, { position: "top-right" })
         return
    }

    if (error instanceof Error) {
        // throw new Error(error.message);
        toast.error(error.message, { position: "top-right" })
         return
    }

    // throw new Error("");
    toast.error("Unexpected error occurred", { position: "top-right" })
}