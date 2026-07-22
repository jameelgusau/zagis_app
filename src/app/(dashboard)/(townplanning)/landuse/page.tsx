import { BreadcrumbComponent } from "@/components/breadcrumb";
// import { AddRecord } from "./AddRecord";
import { Card } from "@/components/ui/card";
import { PurposeTable } from "./PurposeTable";
import RoleProtected from "@/components/RoleProtected";
// import { AddLandUse } from "./AddLandUse";
import { AddPurpose } from "./AddPurpose";


export default async function Page() {

  return (<RoleProtected roles={[]}>
    <BreadcrumbComponent items={["Town Planning", "Land Use"]} />
    <div className='flex justify-end'>
      {/* <AddLandUse /> */}
      <AddPurpose />
   
    </div>
    <Card className="rounded-lg border-none mt-6 py-0 gap-0 h-full">
      <PurposeTable />
    </Card>
  </RoleProtected>)
}
