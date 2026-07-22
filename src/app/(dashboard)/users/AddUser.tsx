'use client'
import { useEffect } from 'react';
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

import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { APIS } from '@/lib/config';
import axios from 'axios';
import { toast } from 'sonner';
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { UserRoundPlus } from "lucide-react"
import { FormSelect } from "@/components/react-select";
import { roles } from "@/lib/data";
import { PhoneField } from "@/components/PhoneInput";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
// import { getUsersRequest, getDepartmentsAndRanksRequest } ;
import { getDepartmentsAndRanksRequest, getUsersRequest } from '@/services/fetchdata';
import { useDashboardStore } from "@/store/dashboard-store";
import { DandR } from '@/lib/types';

type SelectData = {
  value: string;
  label: string;
}


interface NewUserFormInput {
  full_name: string;
  phone: string;
  email: string;
  department: SelectData;
  rank: SelectData;
  role: SelectData;
}

export function AddUser() {
  const { createUser: { path } } = APIS
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState<boolean>(false)
  const { setUsers, dandrs, setDandRs } = useDashboardStore((s) => s);

  useEffect(() => {
    const fetchLgas = async () => {
      const data = await getDepartmentsAndRanksRequest(axiosPrivate);
      setDandRs(data);

    };
    fetchLgas();
  }, [axiosPrivate, setDandRs]);



  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm<NewUserFormInput>();
  //  const controller =  new AbortController();

  const selectedLga = useWatch({
    control,
    name: "department",
  });

  const departments = (dandrs || []).map((item: DandR) => ({
    value: item.id,
    label: item.department_name,
  }))

const ranks = (dandrs || [])
  .flatMap((item) =>
    item.ranks
      .filter(
        (rank) => rank.department_id === selectedLga?.value
      )
      .map((rank) => ({
        value: rank.id,
        label: rank.rank_name,
      }))
  );


  const onSubmit: SubmitHandler<NewUserFormInput> = async (data) => {
    const newData = {
      ...data,
      role: data.role.value,
      rank_id: data.rank.value

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
      const users = await getUsersRequest(axiosPrivate);
      setUsers(users);
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
        <Button><UserRoundPlus />Add New User</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader>
            <DialogTitle >New User Form</DialogTitle>
            <DialogDescription >
              Add new user.
            </DialogDescription>
          </DialogHeader>
          <div className="my-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold">Full Name</label>
              <Input type="text"
                // name='email' 
                placeholder="Enter Full Name"
                {...register("full_name", { required: true })}
                aria-invalid={errors.full_name ? "true" : "false"}
              />
              {errors.full_name && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Full name is required</em>
              )}
            </div>
          </div>
          <div className="mb-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold">Email</label>
              <Input type="email"
                // name='email' 
                placeholder="Your Email..."
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Email is required</em>
              )}
            </div>
          </div>
          <div className="mb-3 w-full">
            <PhoneField
              name="phone"
              control={control}
              label="Phone Number"
              rules={{ required: true }}

            />

            {errors.phone && (
              <em className="inline-block absolute ml-2.5 text-destructive italic text-[0.7em]">Phone Number is required</em>
            )}
          </div>
          <div className="mb-3 w-full">
            <div className="relative">
              <FormSelect
                name="department"
                control={control}
                label="Department"
                placeholder="Select Department"
                options={departments}
                rules={{ required: true }}
              />
              {errors.role && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Select a Department</em>
              )}
            </div>
          </div>
          <div className="mb-3 w-full">
            <div className="relative">
              <FormSelect
                name="rank"
                control={control}
                label="Rank"
                placeholder="Select Rank"
                options={ranks}
                rules={{ required: true }}
              />
              {errors.role && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Select a rank</em>
              )}
            </div>
          </div>
          <div className="mb-3 w-full">
            <div className="relative">
              <FormSelect
                name="role"
                control={control}
                label="Role"
                placeholder="Select Role"
                options={roles}
                rules={{ required: true }}
              />
              {errors.role && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Select a role</em>
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


