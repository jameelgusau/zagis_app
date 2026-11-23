import { BreadcrumbComponent } from "@/components/breadcrumb";
import { Card } from "@/components/ui/card";
import RoleProtected from "@/components/RoleProtected";
import { AddLgas } from "./AddLgas";
import { LgasTable } from "./LgasTable";

export default async function Page() {

  return (<RoleProtected roles={["Supervisor"]}>
    <BreadcrumbComponent items={["Land Settings", "Local Government Areas"]} />
    <div className='flex justify-end'>
      <AddLgas />

    </div>
    <Card className="rounded-lg border-none mt-6 py-0 gap-0 h-full">
      <LgasTable />
    </Card>
  </RoleProtected>)
}
