import { BreadcrumbComponent } from "@/components/breadcrumb";
import { Card } from "@/components/ui/card";
import RoleProtected from "@/components/RoleProtected";
import { AddZones } from "./AddZones";
import { ZonesTable } from "./ZonesTable";

export default async function Page() {

  return (<RoleProtected roles={["Supervisor"]}>
    <BreadcrumbComponent items={["Land Settings", "Zones"]} />
    <div className='flex justify-end'>
      <AddZones />

    </div>
    <Card className="rounded-lg border-none mt-6 py-0 gap-0 h-full">
      <ZonesTable />
    </Card>
  </RoleProtected>)
}
