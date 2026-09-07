"use client"
import { useEffect, useState } from 'react';
import { UserCount } from '@/lib/types';
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { getDashGraphRequest, getFilesCountRequest } from "@/services/fetchdata";
import { DataTable } from "@/components/table/data-table2"
import { columns } from "@/app/(dashboard)/home/column"


// #endregion
const FileCountTable = () => {
  const [statsData, setStatsData] = useState<UserCount[]>([])
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchLgas = async () => {
      const data = await getFilesCountRequest(axiosPrivate);
      setStatsData(data)
    }
    fetchLgas();
  }, [axiosPrivate])

   const formatted = statsData.map((department, idx) => ({
        ...department,
        sn: idx + 1,
    }));

  return (
        <DataTable columns={columns} data={formatted} />
  );
};

export default FileCountTable;