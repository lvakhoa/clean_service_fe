import { verifySession } from "@/helpers/verifySession";
import { UserType } from "@/types/enum";

export default async function Layout({
  customer,
  helper,
}: {
  customer: React.ReactNode;
  helper: React.ReactNode;
}) {
  const role = await verifySession();
  return <>{role.role == UserType.Customer ? customer : helper}</>;
}
