import { Card } from "@/components/ui/card";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { RankTable } from "./RankTable";
import { AddRank } from "./AddRank";
import RoleProtected from "@/components/RoleProtected";

export default async function Page() {
  return (<RoleProtected roles={[]}>
    <BreadcrumbComponent items={["Ranks"]} />
    <div className='flex justify-end'>
      <AddRank />
    </div>
    <Card className="rounded-lg border-none mt-6 py-0 gap-0">
      <RankTable />
    </Card>
  </RoleProtected>)
}
