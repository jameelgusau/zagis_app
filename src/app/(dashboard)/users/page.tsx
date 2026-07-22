import { Card } from "@/components/ui/card";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { AddUser } from "./AddUser";
import { UserTable } from "./UserTable";
import RoleProtected from "@/components/RoleProtected";

export default async function Page() {
  return (<RoleProtected roles={[]}>
    <BreadcrumbComponent  items={["Users"]} />
    <div className='flex justify-end'>
      <AddUser />
    </div>
    <Card className="rounded-lg border-none mt-6 py-0 gap-0">
      <UserTable />
    </Card>
  </RoleProtected>)
}
