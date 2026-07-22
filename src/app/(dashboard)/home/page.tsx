import { BreadcrumbComponent } from "@/components/breadcrumb";
// import { AddRecord } from "./AddRecord";
import { Card } from "@/components/ui/card";
import StackedBarChart from "@/components/chart";
// import { RecordTable } from "./RecordTable";
import RoleProtected from "@/components/RoleProtected";
import { DashCards } from "./Cards";

export default async function Page() {

    return (<RoleProtected roles={[]}>
        <BreadcrumbComponent items={["Dashboard"]} />
        <div className='flex justify-end'>
            {/* <AddRecord /> */}

        </div>
        <DashCards />
        <Card className="rounded-lg border-none mt-6 py-0 gap-0 h-full">
            {/* <RecordTable /> */}
            <StackedBarChart />
        </Card>
    </RoleProtected>)
}
