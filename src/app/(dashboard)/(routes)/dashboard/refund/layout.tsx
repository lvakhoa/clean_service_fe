import { verifySession } from "@/helpers/verifySession";
import { UserType } from "@/types/enum";

export default async function Layout({
  customer,
  admin,
}: {
  admin: React.ReactNode;
  customer: React.ReactNode;
}) {
  const role = await verifySession();
  return <>{role.role == UserType.Admin ? admin : customer}</>;
}
