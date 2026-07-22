import { BreadcrumbComponent } from "@/components/breadcrumb";
import { TabsDemo } from "./tabs";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (<>
    <BreadcrumbComponent items={["Settings", "Account"]} />
    <Card className="rounded-lg border-none mt-6 p-5 gap-0">
      <TabsDemo />
    </Card>

  </>)
}
