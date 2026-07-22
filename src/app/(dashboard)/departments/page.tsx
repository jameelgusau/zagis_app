import { Card } from "@/components/ui/card";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { AddDepartment } from "./AddDepartment";
import { DepartmentTable } from "./DepartmentTable";
import RoleProtected from "@/components/RoleProtected";

export default async function Page() {
  return (<RoleProtected roles={[]}>
    <BreadcrumbComponent items={["Departments"]} />
    <div className='flex justify-end'>
      <AddDepartment />
    </div>
    <Card className="rounded-lg border-none mt-6 py-0 gap-0">
      <DepartmentTable />
    </Card>
  </RoleProtected>)
}
