import React from 'react';
import { getAdminStats } from '@/services/medicine.service';
import AdminStatsClient from '@/components/layout/AdminStats';
//import AdminStatsClient from './AdminStatsClient'; 

export default async function AdminDashboardStatistics() {
  const statsData = await getAdminStats();

  if (!statsData) return (
    <div className="p-10 text-center animate-pulse text-[#8686AC] font-black tracking-widest text-xs">
      SYNCHRONIZING DATA...
    </div>
  );

  return <AdminStatsClient statsData={statsData} />;
}