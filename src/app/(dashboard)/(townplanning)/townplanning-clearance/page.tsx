import { BreadcrumbComponent } from "@/components/breadcrumb";
// import { AddRecord } from "./AddRecord";
import { Card } from "@/components/ui/card";
// import { RecordTable } from "./RecordTable";
import RoleProtected from "@/components/RoleProtected";


export default async function Page() {

  return (<RoleProtected roles={[]}>
    <BreadcrumbComponent items={["Town Planning", "Clearance"]} />
    <div className='flex justify-end'>
      {/* <AddRecord /> */}
   
    </div>
    <Card className="rounded-lg border-none mt-6 py-0 gap-0 h-full">
      {/* <RecordTable /> */}
         <h1>Town Planning Clearance</h1>
    </Card>
  </RoleProtected>)
}
