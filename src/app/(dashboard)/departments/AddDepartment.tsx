'use client'
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
import { APIS } from '@/lib/config';
import axios from 'axios';
import { toast } from 'sonner';
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Landmark } from "lucide-react"
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { getDepartmentsRequest } from "../../../services/fetchdata";
import { useDashboardStore } from "@/store/dashboard-store";


interface NewUserFormInput {
  department_name: string;
}

export function AddDepartment() {
  const [open, setOpen] = useState<boolean>(false)
  const { setDepartments} = useDashboardStore((s) => s);
  const { addDepartment: { path } } = APIS
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm<NewUserFormInput>();
  //  const controller =  new AbortController();
  const onSubmit: SubmitHandler<NewUserFormInput> = async (data) => {

    try {
      const response = await axiosPrivate.post(
        path,
        data,
        { withCredentials: true }
      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
      reset()
      const users = await getDepartmentsRequest(axiosPrivate);
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
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button><Landmark />Add New Department</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader>
            <DialogTitle >New Department Form</DialogTitle>
            <DialogDescription >
              Add new department.
            </DialogDescription>
          </DialogHeader>
          <div className="my-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold">Department Name</label>
              <Input type="department_name"
                // name='email' 
                placeholder="Enter Department Name"
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
              <Button variant="outline" onClick={() => reset()}>Cancel</Button>
            </DialogClose>
            <Button className="text-white" disabled={isSubmitting}>{isSubmitting ? (
              <div className="flex items-center gap-2">
                <Spinner className="h-4 w-4 animate-spin" />
                Processing
              </div>
            ) : (
              "Save"
            )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


