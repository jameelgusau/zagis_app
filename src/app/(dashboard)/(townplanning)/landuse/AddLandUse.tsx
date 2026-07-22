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
import { LandPlotIcon } from "lucide-react"
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useDashboardStore } from "@/store/dashboard-store";
import { Spinner } from "@/components/ui/spinner";
import { APIS } from '@/lib/config';
import { getFilesRequest } from "@/services/fetchdata";
import { handleApiError } from "@/services/apiHandler";
import { Input } from "@/components/ui/input";



interface NewUserFormInput {
  landuse_name: string;
}

export function AddLandUse() {
  const [open, setOpen] = useState<boolean>(false)
  const { setRecords } = useDashboardStore((s) => s);
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm<NewUserFormInput>();

  const onSubmit: SubmitHandler<NewUserFormInput> = async (data) => {
    const { addLanduse: { path } } = APIS
    try {
      const response = await axiosPrivate.post(
        path,
        data,

      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
      const users = await getFilesRequest(axiosPrivate);
      reset()
      setRecords(users);
      toast.success(message, { position: "top-right" })
      setOpen(false)
    } catch (err) {
      handleApiError(err);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button> <LandPlotIcon />Add Land Use</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader>
            <DialogTitle >New Land Use Form</DialogTitle>
            <DialogDescription >
              Add New Land Use.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold " >Land Use*</label>
              <Input
                className="form-input"
                placeholder="Enter Land Use Name"
                {...register("landuse_name", { required: true })}
                aria-invalid={errors.landuse_name ? "true" : "false"}
              />
              {errors.landuse_name && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Landuse is required</em>
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


