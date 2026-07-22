'use client'
import { useState, useEffect } from "react";

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
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/store/dashboard-store";
import { Input } from '@/components/ui/input';
// import { useDialogStore } from "@/store/dialog-store";
import { getFilesRequest, getLanduseAndPurposeRequest } from "@/services/fetchdata";
import { CertTypes } from "@/lib/data";
import { Spinner } from "@/components/ui/spinner";
import { FormDatePicker } from "@/components/calender/FormDatePicker";
import RHFRadioGroup from "@/components/RadioInput";
import { FormSelect } from "@/components/react-select";
import { bool } from "@/lib/data";
import { Dispatch, SetStateAction } from "react";
import { FileRecord } from '@/lib/types';
import { LanduseAndPurpose } from "@/lib/types";

type SelectData = {
  value: string;
  label: string;
}


interface NewUserFormInput {
  id: string;
  file_id: string;
  cofo_number: string;
  title_holder_name: string;
  page_number: string;
  serial_number: string;
  volume_number: string;
  execution_date: Date | null;
  registration_date: Date | null;
  collection_date: Date | null;
  collected: string;
  type: SelectData;
  landuse: SelectData;
  purpose: SelectData;
}

export function UpdateRecord({ open, setOpen, selected }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, selected: FileRecord }) {
  const [landusesAndPurposes, setLandusesAndPurposes] = useState<LanduseAndPurpose[]>([])
  const { setRecords } = useDashboardStore((s) => s);
  const { updateFile: { path } } = APIS
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchLgas = async () => {
      const data = await getLanduseAndPurposeRequest(axiosPrivate);
      setLandusesAndPurposes(data);
    };
    fetchLgas();
  }, [axiosPrivate, setLandusesAndPurposes]);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset
  } = useForm<NewUserFormInput>({
    defaultValues: {
      cofo_number: ""
    }
  });
  //  const controller =  new AbortController();
  const selectedLga = useWatch({
    control,
    name: "landuse",
  });

  const landuses = (landusesAndPurposes || []).map((item: LanduseAndPurpose) => ({
    value: item.id,
    label: item.landuse_name,
  }))


  const purposes = (landusesAndPurposes || [])
    .flatMap((item) =>
      item.detailedLanduses
        .filter(
          (purpose) => purpose.landuse_id === selectedLga?.value
        )
        .map((purpose) => ({
          value: purpose.id,
          label: purpose.purpose_name,
        }))
    );

  useEffect(() => {
    if (selected && landusesAndPurposes.length > 0) {
      const roleType = CertTypes.find(
        item => item.value === selected.certificate_type
      );
      const landuse = landuses.find(
        item => item.value === selected.landuse_id
      );

      const purpose = landusesAndPurposes
        .flatMap(item => item.detailedLanduses)
        .find(purpose => purpose.id === selected.purpose_id);

      reset({
        landuse,
        purpose: purpose
          ? {
            value: purpose.id,
            label: purpose.purpose_name,
          }
          : undefined,
        cofo_number: selected.cofo_number,
        title_holder_name: selected.title_holder_name,
        page_number: selected.page_number?.toString(),
        volume_number: selected.volume_number?.toString(),
        serial_number: selected.serial_number?.toString(),
        registration_date: selected.registration_date,
        collection_date: selected.collection_date,
        execution_date: selected.execution_date,
        collected: selected.collected,
        type: roleType,

      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, reset, landusesAndPurposes])


  const onSubmit: SubmitHandler<NewUserFormInput> = async (data) => {
    const newData = {
      ...data,
      file_id: selected.file_id,
      certificate_type: data.type.value,
      landuse_id: data.landuse.value,
      purpose_id: data.purpose.value
    }
    try {

      const response = await axiosPrivate.put(
        path, newData
      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
      const users = await getFilesRequest(axiosPrivate);
      reset()
      setRecords(users);
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
            <DialogTitle >Update Record</DialogTitle>
          </DialogHeader>
          <div className="my-3 w-full">
            <div className="relative">
              <label className="text-[12px] font-bold ">File Number</label>
              <Input type="text"
                // name='email' 
                placeholder="Enter File Number"
                {...register("cofo_number", { required: true })}
                aria-invalid={errors.cofo_number ? "true" : "false"}
              />
              {errors.cofo_number && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">File Number is required</em>
              )}
            </div>
          </div>
          <div className="mt-3 w-full flex gap-2.5">
            <div className="relative flex-1">
              <label className="text-[12px] font-bold">Title Holder&apos;s Name*</label>
              <Input type="text"
                placeholder="Enter Title Holder's Name"
                {...register("title_holder_name", { required: true })}
                aria-invalid={errors.title_holder_name ? "true" : "false"}
              />
              {errors.title_holder_name && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Title Holder&apos;s Name is required</em>
              )}
            </div>
            <div className="relative flex-1">
              <FormSelect
                name="type"
                control={control}
                label="Certificate Type"
                placeholder="Select a Certificate Type"
                options={CertTypes}
                rules={{ required: true }}
              />
              {errors.type && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Select a Certificate Type</em>
              )}
            </div>
          </div>
          <div className="mt-3 w-full flex gap-2.5">
            <div className="relative flex-1">
              <FormSelect
                name="landuse"
                control={control}
                label="Land Use"
                placeholder="Select Land Use"
                options={landuses}
                rules={{ required: true }}
              />
              {errors.landuse && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Select a Land Use</em>
              )}
            </div>
            <div className="relative flex-1">
              <FormSelect
                name="purpose"
                control={control}
                label="Land Purpose"
                placeholder="Select Land Purpose"
                options={purposes}
                rules={{ required: true }}
              />
              {errors.purpose && (
                <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Select a Purpose</em>
              )}
            </div>
          </div>
          <div className="mt-3 w-full flex gap-2.5">
            <div className="relative">
              <label className="text-[12px] font-bold">Page Number</label>
              <Input type="number"
                placeholder="Enter Page Number"
                {...register("page_number")}
                aria-invalid={errors.page_number ? "true" : "false"}
              />
            </div>
            <div className="relative">
              <label className="text-[12px] font-bold">Serial Number</label>
              <Input type="number"
                placeholder="Enter Serial Number"
                {...register("serial_number")}
                aria-invalid={errors.serial_number ? "true" : "false"}
              />
            </div>
          </div>
          <div className="mt-3 w-full flex gap-2.5">
            <div className="relative flex-1">
              <label className="text-[12px] font-bold">Volume Number</label>
              <Input type="number"
                placeholder="Enter Volume Number"
                {...register("volume_number")}
                aria-invalid={errors.volume_number ? "true" : "false"}
              />
            </div>
            <div className="relative w-full flex-1">
              <FormDatePicker
                name="execution_date"
                control={control}
                label="Execution Date"
                fromYear={1900}
                toYear={new Date().getFullYear()}
              // rules={{ required: "Select Date of Birth" }}
              />
            </div>
          </div>
          <div className="mt-3 w-full flex gap-2.5">
            <div className="relative w-full">
              <FormDatePicker
                name="registration_date"
                control={control}
                label="Registration Date"
                fromYear={1900}
                toYear={new Date().getFullYear()}
              // rules={{ required: "Select Date of Birth" }}
              />
            </div>
            <div className="relative w-full">
              <FormDatePicker
                name="collection_date"
                control={control}
                label="Collection Date"
                fromYear={1900}
                toYear={new Date().getFullYear()}
              // rules={{ required: "Select Date of Birth" }}
              />
            </div>

          </div>
          <div className="my-3 w-full gap-2.5">
            <div className="relative flex flex-col justify-end">
              <p className="text-[12px] font-bold mt-0 sm:mt-3">Does the applicant collect the certificate?</p>
              <div className='pt-3 inline-block box-border items-end'>
                <RHFRadioGroup
                  name="collected"
                  control={control}
                  options={bool} primaryColor="#68b2a1"
                  rules={{ required: true }}
                />
                {errors.collected && (
                  <em className="inline-block absolute bottom-[-19.5px] left-2.5 text-destructive italic text-[0.7em]">Please indicate whether the Applicant collect the certificate.</em>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => reset()} >Cancel</Button>
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


