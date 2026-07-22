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

import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { APIS } from '@/lib/config';
import axios from 'axios';
import { toast } from 'sonner';
import { roles } from "@/lib/data";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/store/dashboard-store";
import { PhoneField } from "@/components/PhoneInput";
import { Input } from '@/components/ui/input';
// import { useDialogStore } from "@/store/dialog-store";
import { Spinner } from "@/components/ui/spinner";
import { FormSelect } from "@/components/react-select";
import { getUsersRequest, getDepartmentsAndRanksRequest } from "@/services/fetchdata";
import { Dispatch, SetStateAction } from "react";
import { DandR, User } from '@/lib/types';

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

export function UpdateUser({ open, setOpen, selected }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, selected: User }) {
  const { setUsers, dandrs, setDandRs } = useDashboardStore((s) => s);
  // const [rankData, setRankData] = useState<Department | null>(null)
  const { updateAccount: { path } } = APIS
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchLgas = async () => {
      const data = await getDepartmentsAndRanksRequest(axiosPrivate);
      setDandRs(data);

    };
    fetchLgas();
  }, [axiosPrivate, setDandRs]);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset
  } = useForm<NewUserFormInput>({
    defaultValues: {
      department: { value: "", label: "" }
    }
  });
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

  useEffect(() => {
    if (selected && dandrs.length > 0) {
      const departmentType = departments.find(
        item => item.value === selected.department_id
      );

      const rank = dandrs
        .flatMap(item => item.ranks)
        .find(rank => rank.id === selected.rank_id);

      const roleType = roles.find(
        item => item.value === selected.role
      );

      reset({
        department: departmentType,
        rank: rank
          ? {
            value: rank.id,
            label: rank.rank_name,
          }
          : undefined,
        role: roleType,
        full_name: selected.full_name,
        email: selected.email,
        phone: selected.phone,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, dandrs, reset]);


  const onSubmit: SubmitHandler<NewUserFormInput> = async (data) => {
    const newData = {
      ...data,
      role: data.role.value,
      rank_id: data.rank.value,
      id: selected.id
    }
    try {

      const response = await axiosPrivate.put(
        path, newData
      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
      const users = await getUsersRequest(axiosPrivate);
      reset()
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
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader>
            <DialogTitle >Update Department</DialogTitle>
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
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Select a role</em>
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


