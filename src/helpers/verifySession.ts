import authAction from "@/apis/auth.action";
import { PUBLIC_ENDPOINTS } from "@/configs/endpoints";
import { Role } from "@/configs/enum";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function verifySession(): Promise<{
  isAuth: boolean;
  role?: RoleType;
}> {
  const token = cookies().get(".AspNetCore.Cookies")?.value;

  if (!token) {
    return { isAuth: false };
  }

  const claims = await authAction.decodeCookie({
    headers: {
      Cookie: cookies().toString(),
    },
  });

  const role = claims.data?.claims.find(
    (claim) => claim.type === "Role"
  )?.value;
  if (!role) {
    return { isAuth: false };
  }
  if (Role[role as keyof typeof Role] === undefined) {
    return { isAuth: false };
  }

  return { isAuth: true, role: role as RoleType };
}
