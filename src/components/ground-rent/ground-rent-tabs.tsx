"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RateTable } from "./rates/rate-table";

export function GroundRentTabs() {
  return (
    <Tabs defaultValue="rates" className="space-y-6">
      <TabsList>
        <TabsTrigger value="rates">
          Rates Management
        </TabsTrigger>

        <TabsTrigger value="verification">
          Annual Verification
        </TabsTrigger>

        <TabsTrigger value="history">
          Rent History
        </TabsTrigger>
      </TabsList>

      <TabsContent value="rates">
        <RateTable />
      </TabsContent>

      <TabsContent value="verification">
        <div>Annual Verification will go here.</div>
      </TabsContent>

      <TabsContent value="history">
        <div>Rent History will go here.</div>
      </TabsContent>
    </Tabs>
  );
}