import customerAction from "@/apis/customer.action"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useScheduler = (page?: number, limit?: number) => {
    const queryClient = useQueryClient()

    const getCurrentCustomerBooking = useQuery({
        queryKey: ["currentBooking"],
        queryFn: () => {
            return customerAction.getCurrentCustomerBooking(page, limit)
        }
    })

    return {
        getCurrentCustomerBooking,
        queryClient
    }
}