import { BreadcrumbComponent } from "@/components/breadcrumb";
// import { AddRecord } from "./AddRecord";
import { Card } from "@/components/ui/card";
// import { RecordTable } from "./RecordTable";
import RoleProtected from "@/components/RoleProtected";
// import { AddLandUse } from "./AddLandUse";



export default async function Page() {

  return (<RoleProtected roles={["Supervisor"]}>
    <BreadcrumbComponent items={["Lands", "Land Clearance"]} />
    <div className='flex justify-end'>
      {/* <AddLandUse /> */}
   
    </div>
    <Card className="rounded-lg border-none mt-6 py-0 gap-0 h-full">
      {/* <RecordTable /> */}
         <h1>Land Clearance</h1>
    </Card>
  </RoleProtected>)
}
