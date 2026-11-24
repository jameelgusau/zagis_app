import { GroundRentTabs } from "@/components/ground-rent/ground-rent-tabs";

export default function GroundRentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Ground Rent Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage ground rent rates, annual verification and property rent history.
        </p>
      </div>

      <GroundRentTabs />
    </div>
  );
}