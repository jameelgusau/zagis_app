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
import { getDepartmentsRequest } from "@/services/fetchdata";
import { Dispatch, SetStateAction } from "react";
import { Department } from '@/lib/types';



export function UpdateDepartment({ open, setOpen, selected }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, selected: Department }) {
  const { setDepartments } = useDashboardStore((s) => s);
  const { updateDepartment: { path } } = APIS
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm<Department>({
    defaultValues: {
      department_name: ""
    }
  });
  //  const controller =  new AbortController();


  useEffect(() => {
    if (selected) {
      reset({
        department_name: selected.department_name,


      })
    }
  }, [selected, reset])
  const onSubmit: SubmitHandler<Department> = async (data) => {
    const newData = {
      ...data,
      id: selected.id
    }
    try {

      const response = await axiosPrivate.put(
        path, newData
      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
      const users = await getDepartmentsRequest(axiosPrivate);
      reset()
      setDepartments(users);
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
            <DialogTitle >Update Department</DialogTitle>
          </DialogHeader>
          <div className="my-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold ">Department Name</label>
              <Input type="text"
                // name='email' 
                placeholder="Enter File Number"
                {...register("department_name", { required: true })}
                aria-invalid={errors.department_name ? "true" : "false"}
              />
              {errors.department_name && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Department name is required</em>
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


