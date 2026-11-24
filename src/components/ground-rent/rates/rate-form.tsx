
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ZoneOption {
  id: string;
  name: string;
}

export interface PurposeOption {
  id: string;
  name: string;
}

export interface GroundRentRatePayload {
  zone_id: string;
  purpose_id: string;
  rate_per_sqm: number;
  effective_from: string;
  effective_to: string | null;
}

interface RateFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  zones: ZoneOption[];
  purposes: PurposeOption[];
  onSubmit: (values: GroundRentRatePayload) => Promise<void>;
}

export function RateFormDialog({
  open,
  onOpenChange,
  zones,
  purposes,
  onSubmit,
}: RateFormDialogProps) {
  const [zoneId, setZoneId] = useState("");
  const [purposeId, setPurposeId] = useState("");
  const [rate, setRate] = useState("");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [effectiveTo, setEffectiveTo] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setZoneId("");
    setPurposeId("");
    setRate("");
    setEffectiveFrom("");
    setEffectiveTo("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!zoneId || !purposeId || !rate || !effectiveFrom) {
      return;
    }

    const rateValue = Number(rate);

    if (!Number.isFinite(rateValue) || rateValue <= 0) {
      return;
    }

    if (effectiveTo && effectiveTo < effectiveFrom) {
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        zone_id: zoneId,
        purpose_id: purposeId,
        rate_per_sqm: rateValue,
        effective_from: effectiveFrom,
        effective_to: effectiveTo || null,
      });

      resetForm();
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) {
          onOpenChange(value);
          if (!value) resetForm();
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Ground Rent Rate</DialogTitle>
          <DialogDescription>
            Configure the annual ground rent rate for a zone and property purpose.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Zone</Label>
            <Select value={zoneId} onValueChange={setZoneId}>
              <SelectTrigger>
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Purpose</Label>
            <Select value={purposeId} onValueChange={setPurposeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                {purposes.map((purpose) => (
                  <SelectItem key={purpose.id} value={purpose.id}>
                    {purpose.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Rate per square metre (₦)</Label>
            <Input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="e.g. 150.00"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Effective From</Label>
              <Input
                type="date"
                value={effectiveFrom}
                onChange={(e) => setEffectiveFrom(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Effective To (Optional)</Label>
              <Input
                type="date"
                value={effectiveTo}
                min={effectiveFrom || undefined}
                onChange={(e) => setEffectiveTo(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Rate"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
