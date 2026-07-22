"use client"
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DashGraph } from '@/lib/types';
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { getDashGraphRequest } from "@/services/fetchdata";


// #endregion
const StackedBarChart = () => {
  const [statsData, setStatsData] = useState<DashGraph[]>([])
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchLgas = async () => {
      const data = await getDashGraphRequest(axiosPrivate);
      setStatsData(data)
    }
    fetchLgas();
  }, [axiosPrivate])

  return (
    <BarChart
      style={{ width: '100%', maxHeight: '50vh', aspectRatio: 1.618 }}
      responsive
      data={statsData}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3 4 5" />
      <XAxis dataKey="date" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="collected" stackId="a" fill="#006045" background />
      <Bar dataKey="not_collected" stackId="a" fill="#009966" background />
      {/* <RechartsDevtools /> */}
    </BarChart>
  );
};

export default StackedBarChart;