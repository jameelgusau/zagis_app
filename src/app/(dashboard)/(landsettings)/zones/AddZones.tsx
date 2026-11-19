'use client'
import { useState } from "react";
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
import { getZonesRequest } from "@/services/fetchdata";
import { handleApiError } from "@/services/apiHandler";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";



interface NewUserFormInput {
  name: string;
  description?: string;
}

export function AddZones() {
  const [open, setOpen] = useState<boolean>(false)
  const { setZones } = useDashboardStore((s) => s);
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm<NewUserFormInput>();

  const onSubmit: SubmitHandler<NewUserFormInput> = async (data) => {
    const { addZone: { path } } = APIS
    try {
      const response = await axiosPrivate.post(
        path,
        data,

      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
      const users = await getZonesRequest(axiosPrivate);
      reset()
      setZones(users);
      toast.success(message, { position: "top-right" })
      setOpen(false)
    } catch (err) {
      handleApiError(err);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button> <FlagTriangleRight />Add Zone</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader>
            <DialogTitle >New Zone Form</DialogTitle>
            <DialogDescription >
              Add New Zone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold " >Zone Name*</label>
              <Input
                className="form-input"
                placeholder="Enter Zone Name"
                {...register("name", { required: true })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Zone name is required</em>
              )}
            </div>
          </div>
          <div className="my-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold ">Zone Description</label>
              <Textarea
                placeholder="Enter Zone Description"
                {...register("description", { required: false })}
                aria-invalid={errors.description ? "true" : "false"}
              />
              {errors.description && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Zone description is required</em>
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


