import { BreadcrumbComponent } from "@/components/breadcrumb";
import { Card } from "@/components/ui/card";
import StackedBarChart from "@/components/chart";
import RoleProtected from "@/components/RoleProtected";
import { DashCards } from "./Cards";
import FileCountTable from "@/app/(dashboard)/home/filecounttable";

export default async function Page() {

    return (<RoleProtected roles={[]}>
        <BreadcrumbComponent items={["Dashboard"]} />
        <div className='flex justify-end'>
            {/* <AddRecord /> */}

        </div>
        <DashCards />
        <Card className="rounded-lg border-none mt-6 py-0 gap-0 h-full flex flex-row">
            {/* <RecordTable /> */}
            <div className="flex-1">
                <StackedBarChart />
            </div>
            <div className="flex-1">
                <FileCountTable />
            </div>

        </Card>
    </RoleProtected>)
}
