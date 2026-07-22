'use client'
import { useEffect } from "react";
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
import { ShieldHalf } from "lucide-react"
import { FormSelect } from "@/components/react-select";
// import { roles } from "@/lib/data";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { getRanksRequest, getDepartmentsRequest } from "@/services/fetchdata";
import { useDashboardStore } from "@/store/dashboard-store";

type SelectData = {
  value: string;
  label: string;
}


interface NewUserFormInput {
  rank_name: string;
  department: SelectData;
}

export function AddRank() {
  const [open, setOpen] = useState<boolean>(false)
  const { setRanks, departments, setDepartments } = useDashboardStore((s) => s);
  const { addRank: { path } } = APIS
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchDepartment = async () => {
      const department = await getDepartmentsRequest(axiosPrivate);
      setDepartments(department);
    };

    fetchDepartment();
  }, [axiosPrivate, setDepartments]);

  const departmentList = (departments || []).map((item: { id: string, department_name: string }) => ({
    value: item.id,
    label: item.department_name,
  }))

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm<NewUserFormInput>();

  const onSubmit: SubmitHandler<NewUserFormInput> = async (data) => {
    const newData = {
      ...data,
      department_id: data.department.value
    }

    try {
      const response = await axiosPrivate.post(
        path,
        newData,
        { withCredentials: true }
      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
      reset()
      const users = await getRanksRequest(axiosPrivate);
      setRanks(users);
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
        <Button><ShieldHalf />Add New Rank</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader>
            <DialogTitle >New Rank Form</DialogTitle>
            <DialogDescription >
              Add new rank.
            </DialogDescription>
          </DialogHeader>
          <div className="mb-3 w-full">
            <div className="relative">
              <FormSelect
                name="department"
                control={control}
                label="Department"
                placeholder="Select Department"
                options={departmentList}
                rules={{ required: true }}
              />
              {errors.department && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Select a Department</em>
              )}
            </div>
          </div>
          <div className="my-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold">Rank Name</label>
              <Input type="rank_name"
                // name='email' 
                placeholder="Enter Rank Name"
                {...register("rank_name", { required: true })}
                aria-invalid={errors.rank_name ? "true" : "false"}
              />
              {errors.rank_name && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Rank name is required</em>
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


