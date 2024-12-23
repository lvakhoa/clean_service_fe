import { redirect } from "next/navigation";
import { verifySession } from "@/helpers/verifySession";
import ENV from "@/configs/env";

const DashboardPage = async () => {
  const session = await verifySession();

  if (session.role === "Admin") redirect("/dashboard/chart");
  else if (session.role === "Customer" || session.role === "Helper")
    redirect("/dashboard/personal");
  else redirect("/");
};

export default DashboardPage;
