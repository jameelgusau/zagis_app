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
import { FormSelect } from "@/components/react-select";
import { getRanksRequest, getDepartmentsRequest } from "@/services/fetchdata";
import { Dispatch, SetStateAction } from "react";
import { Rank } from '@/lib/types';

interface FormInput {
  department: {
    label: string;
    value: string;
  };
  rank_name: string;
  id: string
}

export function UpdateRank({ open, setOpen, selected }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, selected: Rank }) {
  const { setRanks, departments, setDepartments } = useDashboardStore((s) => s);
  // const [rankData, setRankData] = useState<Department | null>(null)
  const { updateRank: { path } } = APIS
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
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset
  } = useForm<FormInput>({
    defaultValues: {
      department: { value: "", label: "" }
    }
  });
  //  const controller =  new AbortController();


  useEffect(() => {
    if (selected) {
      const departmentType = departmentList.find(item => item.value === selected.department_id)
      reset({
        department: departmentType,


      })
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, reset])


  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const newData = {
      ...data,
      id: selected.id,
      department_id: data.department.value
    }
    try {

      const response = await axiosPrivate.put(
        path, newData
      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
      const users = await getRanksRequest(axiosPrivate);
      reset()
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
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader>
            <DialogTitle >Update Department</DialogTitle>
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
              <label className="text-[12px] font-bold ">Rank Name</label>
              <Input type="text"
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


