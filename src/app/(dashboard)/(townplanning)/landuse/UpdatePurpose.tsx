'use client'
import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

import { useForm, SubmitHandler } from "react-hook-form";
import { APIS } from '@/lib/config';
import axios from 'axios';
import { toast } from 'sonner';
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/store/dashboard-store";
import { Input } from '@/components/ui/input';
// import { useDialogStore } from "@/store/dialog-store";
import { Spinner } from "@/components/ui/spinner";
import { FormSelect } from "@/components/react-select";
import { getPurposesRequest, getLandusesRequest } from "@/services/fetchdata";
import { Dispatch, SetStateAction } from "react";
import { PurposeType, LanduseType } from '@/lib/types';

type SelectData = {
  value: string;
  label: string;

}

interface NewUserFormInput {
  purpose_name: string;
  lease_years: string;
  landuse: SelectData;
}

export function UpdatePurpose({ open, setOpen, selected }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, selected: PurposeType }) {
  const { setPurposes } = useDashboardStore((s) => s);
  // const [rankData, setRankData] = useState<Department | null>(null)
  const [landuses, setLanduses] = useState<LanduseType[]>([])

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchDepartment = async () => {
      const landuse = await getLandusesRequest(axiosPrivate);
      setLanduses(landuse);
    };

    fetchDepartment();
  }, [axiosPrivate, setLanduses]);

  const departmentList = (landuses || []).map((item: { id: string, landuse_name: string }) => ({
    value: item.id,
    label: item.landuse_name,
  }))


  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset
  } = useForm<NewUserFormInput>({
    defaultValues: {
      landuse: { value: "", label: "" }
    }
  });
  //  const controller =  new AbortController();


  useEffect(() => {
    if (selected) {
      const departmentType = departmentList.find(item => item.value === selected.landuse_id)
      reset({
        landuse: departmentType,
        purpose_name: selected.purpose_name,
        lease_years: selected.lease_years.toString()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, reset])


  const onSubmit: SubmitHandler<NewUserFormInput> = async (data) => {
    const { updatePurpose: { path } } = APIS
    const newData = {
      ...data,
      id: selected.id,
      landuse_id: data.landuse.value
    }
    try {
      const response = await axiosPrivate.put(
        path, newData
      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
      const users = await getPurposesRequest(axiosPrivate);
      reset()
      setPurposes(users);
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
            <DialogTitle >Update Purpose</DialogTitle>
          </DialogHeader>
          <div className="mb-3 w-full">
            <div className="relative">
              <FormSelect
                name="landuse"
                control={control}
                label="Land Use"
                placeholder="Select Land Use"
                options={departmentList}
                rules={{ required: true }}
              />
              {errors.landuse && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Select a Department</em>
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


