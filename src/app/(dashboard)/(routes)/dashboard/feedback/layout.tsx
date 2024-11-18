import { verifySession } from "@/helpers/verifySession";
import { Gender } from "@/types/enum";
import { UserType } from "@/types/enum";

export default async function Layout({
  customer,
  admin,
}: {
  admin: React.ReactNode;
  customer: React.ReactNode;
}) {
  const role = await verifySession();
  return <>{role.role?.toString() == "Admin" ? admin : customer}</>;
}
