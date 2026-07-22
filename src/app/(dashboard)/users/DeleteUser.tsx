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

import { useForm, SubmitHandler } from "react-hook-form";
import { APIS } from '@/lib/config';
import axios from 'axios';
import { toast } from 'sonner';
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/store/dashboard-store";
// import { useDialogStore } from "@/store/dialog-store";
import { Spinner } from "@/components/ui/spinner";
import { getUsersRequest } from "@/services/fetchdata";
import { CircleX } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { User } from "@/lib/types";


interface NewUserFormInput {

  phone: string;
  email: string;

}

export function DeleteUser({ open, setOpen, selected }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, selected: User }) {
  // const { toggleIsDeleteUserOpen, isDeleteUserOpen } = useDialogStore((s) => s)
  const { setUsers } = useDashboardStore((s) => s);
  const { deleteUser: { path } } = APIS
  const axiosPrivate = useAxiosPrivate();
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<NewUserFormInput>();
  //  const controller =  new AbortController();
  const onSubmit: SubmitHandler<NewUserFormInput> = async () => {

    try {

      const response = await axiosPrivate.delete(
        path({ id: selected.id })
      );
      if (response.data.meta.status !== 200) throw new Error("Login failed");
      const { message } = response.data.meta;
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
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogHeader>
            <DialogTitle className="text-secondary">Delete User</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col justify-center m-3 items-center">
            <CircleX className="text-destructive" size="60px" />
            <h3 className="font-bold text-3xl">Are you sure?</h3>
            <p className="text-slate-500">Do you really want to remove <span className="font-bold">{selected.full_name}</span> ?</p>
            <p className="text-slate-500">This process cannot be undone.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" >Cancel</Button>
            </DialogClose>
            <Button variant="destructive" disabled={isSubmitting}>{isSubmitting ? (
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


