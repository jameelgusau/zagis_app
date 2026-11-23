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
import { FlagTriangleRight } from "lucide-react"
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useDashboardStore } from "@/store/dashboard-store";
import { Spinner } from "@/components/ui/spinner";
import { APIS } from '@/lib/config';
import { getLgasRequest, getZonesRequest } from "@/services/fetchdata";
import { handleApiError } from "@/services/apiHandler";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/react-select";


type SelectData = {
  value: string;
  label: string;

}

interface NewUserFormInput {
  name: string;
  zone: SelectData;
}

export function AddLgas() {
  const [open, setOpen] = useState<boolean>(false)
  const { setLgas, zones, setZones } = useDashboardStore((s) => s);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchZone = async () => {
      const zone = await getZonesRequest(axiosPrivate);
      setZones(zone);
    };

    fetchZone();
  }, [axiosPrivate, setZones]);


  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm<NewUserFormInput>();

  const zoneList = (zones || []).map((item: { id: string, name: string }) => ({
    value: item.id,
    label: item.name,
  }))

  const onSubmit: SubmitHandler<NewUserFormInput> = async (data) => {
    const { addLga: { path } } = APIS
    const newData = {
      ...data,
      zone_id: data.zone.value
    }
    try {
      const response = await axiosPrivate.post(
        path,
        newData,

      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
      const users = await getLgasRequest(axiosPrivate);
      reset()
      setLgas(users);
      toast.success(message, { position: "top-right" })
      setOpen(false)
    } catch (err) {
      handleApiError(err);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button> <FlagTriangleRight />Add Lga</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader>
            <DialogTitle >New Local Government Area Form</DialogTitle>
            <DialogDescription >
              Add New Local Government Area.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold " >Local Government Area Name*</label>
              <Input
                className="form-input"
                placeholder="Enter Local Government Area Name"
                {...register("name", { required: true })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Local Government Area name is required</em>
              )}
            </div>
          </div>
          <div className="mb-3 w-full">
            <div className="relative">
              <FormSelect
                name="zone"
                control={control}
                label="Zone"
                placeholder="Select Zone"
                options={zoneList}
                rules={{ required: true }}
              />
              {errors.zone && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Select a Zone</em>
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
    </Dialog>
  )
}


