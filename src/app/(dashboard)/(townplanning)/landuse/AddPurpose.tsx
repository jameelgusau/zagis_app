'use client'
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'sonner';
import { Button } from "@/components/ui/button"
import { PictureInPicture2Icon } from "lucide-react"
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useDashboardStore } from "@/store/dashboard-store";
import { Spinner } from "@/components/ui/spinner";
import { APIS } from '@/lib/config';
import { getPurposesRequest, getLandusesRequest } from "@/services/fetchdata";
import { handleApiError } from "@/services/apiHandler";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/react-select";
import { LanduseType } from "@/lib/types";

type SelectData = {
  value: string;
  label: string;

}

interface NewUserFormInput {
  purpose_name: string;
  lease_years: string;
  landuse: SelectData;
}

export function AddPurpose() {
  const [open, setOpen] = useState<boolean>(false)
  const [landuses, setLanduses] = useState<LanduseType[]>([])
  const { setPurposes } = useDashboardStore((s) => s);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchLgas = async () => {
      const data = await getLandusesRequest(axiosPrivate);
      setLanduses(data);

    };
    fetchLgas();
  }, [axiosPrivate, setLanduses]);

  const departments = (landuses || []).map((item: LanduseType) => ({
    value: item.id,
    label: item.landuse_name,
  }))

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset
  } = useForm<NewUserFormInput>();

  const onSubmit: SubmitHandler<NewUserFormInput> = async (data) => {
    const { addPurpose: { path } } = APIS
    const newData = {
      ...data,
      landuse_id: data.landuse.value
    }
    try {
      const response = await axiosPrivate.post(
        path,
        newData,

      );
      if (response.data.meta.status !== 200) throw ("Failed to fetch!");
      const { message } = response.data.meta;
      const purposes = await getPurposesRequest(axiosPrivate);
      reset()
      setPurposes(purposes);
      toast.success(message, { position: "top-right" })
      setOpen(false)
    } catch (err) {
      handleApiError(err);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button> <PictureInPicture2Icon />Add Purpose</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader>
            <DialogTitle >New Land Use Purpose Form</DialogTitle>
            <DialogDescription >
              Add New Land Use Purpose.
            </DialogDescription>
          </DialogHeader>
          <div className="mb-3 w-full">
            <div className="relative">
              <FormSelect
                name="landuse"
                control={control}
                label="Land Use"
                placeholder="Select Land Use"
                options={departments}
                rules={{ required: true }}
              />
              {errors.landuse && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Select a Landuse</em>
              )}
            </div>
          </div>
          <div className="mt-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold " >Land Use Purpose*</label>
              <Input
                className="form-input"
                placeholder="Enter Land Use Purpose Name"
                {...register("purpose_name", { required: true })}
                aria-invalid={errors.purpose_name ? "true" : "false"}
              />
              {errors.purpose_name && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Landuse purpose is required</em>
              )}
            </div>
          </div>
          <div className="my-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold">Lease Years</label>
              <Input type="number"
                placeholder="Enter Serial Number"
                {...register("lease_years", { required: true })}
                aria-invalid={errors.lease_years ? "true" : "false"}
              />
              {errors.lease_years && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Lease years is required</em>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => reset()}>Cancel</Button>
            </DialogClose>
            <Button disabled={isSubmitting}>{isSubmitting ? (
              <div className="flex items-center gap-2">
                <Spinner className="h-4 w-4 animate-spin" />
                Processing
              </div>
            ) : (
              "Save"
            )}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}


