import authAction from "@/apis/auth.action";
import { PUBLIC_ENDPOINTS } from "@/configs/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
    const queryClient = useQueryClient();

    const useGetProfile = () => {
        return useQuery({
            queryKey: ["profile"],
            queryFn: () => {
                return authAction.getProfile();
            },
        });
    }

    
    // const useLogout = useMutation({
    //     mutationFn: () => authAction.logOut(),
    // });

    const useLogout = useMutation({
    mutationFn: () => authAction.logOut(),
    onSuccess: () => {
      // Xóa cache của profile sau khi logout
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.clear(); // Xóa toàn bộ cache nếu cần
      window.location.href = PUBLIC_ENDPOINTS.landing;
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
  
    return {
        queryClient,
        useGetProfile,
        useLogout
    }
}