'use client'
import {
    useEffect,
    useState
} from "react";
import { MapPinHouse, Users2, School, UsersIcon } from "lucide-react";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { Badge } from "@/components/ui/badge";
import { DashStats } from '@/lib/types';
import { getDashStatsRequest } from "@/services/fetchdata";


export function DashCards() {
    const [statsData, setStatsData] = useState<DashStats | null>(null)
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        const fetchLgas = async () => {
            const data = await getDashStatsRequest(axiosPrivate);
            setStatsData(data)
        }
        fetchLgas();
    }, [axiosPrivate])

    return (
        <div className="grid  mt-5 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <Users2 className="text-gray-800 size-6 dark:text-white/90" />
                </div>

                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Total Staffs
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {statsData?.accounts}
                        </h4>
                    </div>
                    {/* <Badge color="success">
              <ArrowUpIcon />
              11.01%
            </Badge> */}
                </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <School className="text-gray-800 size-6 dark:text-white/90" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Total Files
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {statsData?.files}
                        </h4>
                    </div>

                    {/* <Badge color="error">
              <ArrowDownIcon />
              9.05%
            </Badge> */}
                </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <UsersIcon className="text-gray-800 size-6 dark:text-white/90" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Collected
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            <Badge color="primary">
                                {statsData?.collected}
                            </Badge>
                        </h4>
                    </div>
                    {/* 
                    <Badge color="error">
              <ArrowDownIcon />
              9.05%
            </Badge> */}
                </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <MapPinHouse className="text-gray-800 size-6 dark:text-white/90" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Not Collected
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            <Badge variant="default">
                                {statsData?.not_collected}
                            </Badge>
                        </h4>
                    </div>
                    {/* 
            <Badge color="error">
              <ArrowDownIcon />
              9.05%
            </Badge> */}
                </div>
            </div>
        </div>
    )
}

