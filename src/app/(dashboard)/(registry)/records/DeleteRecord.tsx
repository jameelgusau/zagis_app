'use client'
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

import { useForm } from "react-hook-form";
import { APIS } from '@/lib/config';
import axios from 'axios';
import { toast } from 'sonner';
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/store/dashboard-store";

import { Spinner } from "@/components/ui/spinner";
import { getFilesRequest } from "@/services/fetchdata";
import { CircleX } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FileRecord } from "@/lib/types";

export function DeleteLga({ open, setOpen, selected }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, selected:FileRecord }) {

  const { setRecords } = useDashboardStore((s) => s);
  const { deleteFile: { path } } = APIS
  const axiosPrivate = useAxiosPrivate();
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = useForm();
  //  const controller =  new AbortController();
  const onSubmit = async () => {

    try {

      const response = await axiosPrivate.delete(
        path({ id: selected.file_id })
      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
      const users = await getFilesRequest(axiosPrivate);
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
            <DialogTitle>Delete File</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col justify-center m-3 items-center">
            <CircleX className="text-destructive" size="60px" />
            <h3 className="font-bold text-3xl">Are you sure?</h3>
            <p className="text-slate-500">Do you really want to remove <span className="font-bold">{selected.cofo_number}</span>?</p>
            <p className="text-slate-500">This process cannot be undone.</p>
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
              "Remove"
            )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


