'use client'
import { useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { FormSelect } from "@/components/react-select";
import { useForm, SubmitHandler } from "react-hook-form";
import { APIS } from '@/lib/config';
import axios from 'axios';
import { toast } from 'sonner';
import { Textarea } from "@/components/ui/textarea";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/store/dashboard-store";
import { Input } from '@/components/ui/input';
import { Spinner } from "@/components/ui/spinner";
import { getLgasRequest, getZonesRequest } from "@/services/fetchdata";
import { Dispatch, SetStateAction } from "react";
import { Lgas, Lga } from '@/lib/types';

type SelectData = {
  value: string;
  label: string;

}

interface NewUserFormInput {
  id: string;
  name: string;
  zone: SelectData;
}

export function UpdateLgas({ open, setOpen, selected }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, selected: Lga }) {
  const { setZones, zones, setLgas } = useDashboardStore((s) => s);
  const { updateLga: { path } } = APIS
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchZone = async () => {
      const zone = await getZonesRequest(axiosPrivate);
      setZones(zone);
    };

    fetchZone();
  }, [axiosPrivate, setZones]);

  const zoneList = (zones || []).map((item: { id: string, name: string }) => ({
    value: item.id,
    label: item.name,
  }))

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset
  } = useForm<NewUserFormInput>({
    defaultValues: {
      name: "",
    }
  });
  //  const controller =  new AbortController();

  useEffect(() => {
    if (selected) {
      const zoneType = zoneList.find(item => item.value === selected.zone_id)
      reset({
        name: selected.name,
        zone: zoneType
      })
    }
  }, [selected, reset])

  const onSubmit: SubmitHandler<NewUserFormInput> = async (data) => {
    const newData = {
      ...data,
      zone_id: data.zone.value,
      lga_id: selected.id,
    }

    try {

      const response = await axiosPrivate.put(
        path, newData
      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
      const users = await getLgasRequest(axiosPrivate);
      reset()
      setLgas(users);
      setOpen(false)
      toast.success(message, { position: "top-right" })
    } catch (err) {
      let message = "Something went wrong";

      if (axios.isAxiosError(err)) {
        message =
          err.response?.data?.meta?.message ||
          err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      toast.error(message, { position: "top-right" })
    }
  }
  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader>
            <DialogTitle >Update Local Government Area</DialogTitle>
          </DialogHeader>
          <div className="my-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold ">Local Government Name</label>
              <Input type="text"
                // name='email' 
                placeholder="Enter Local Government Area"
                {...register("name", { required: true })}
                aria-invalid={errors.zone ? "true" : "false"}
              />
              {errors.zone && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Local Government Area is required</em>
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
              <Button variant="outline" >Cancel</Button>
            </DialogClose>
            <Button disabled={isSubmitting}>{isSubmitting ? (
              <div className="flex items-center gap-2">
                <Spinner className="h-4 w-4 animate-spin" />
                Processing
              </div>
            ) : (
              "Update"
            )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


