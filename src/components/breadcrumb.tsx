import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbComponentProps {
  items: string[];
}

export const BreadcrumbComponent = ({ items }: BreadcrumbComponentProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home (also not clickable now) */}
        <BreadcrumbItem>
          <div className="flex items-center gap-1">
            <Home size={18} />
          </div>
        </BreadcrumbItem>

        {items.map((item) => (
          <div key={item} className="flex items-center">
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>{item}</BreadcrumbPage>
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};