'use client'

import CardWrapper from '@/app/management/(overview)/cards';
import DailyBorrowChart from "@/app/management/(overview)/daily-borrow-chart";
import HotDescriptions from "@/app/management/(overview)/hot-descriptions";
import {useEffect, useState} from "react";

import * as service from "@/app/lib/service/management"

export default function Page() {
  const [reportDto, setReportDto] = useState<ReportSummaryDto>()

  useEffect(() => {
    service.getReport()
      .then(res => setReportDto(res))
      .catch(error => console.info(error.response?.data?.failedReason))
  }, [])

  return (
    <main className="w-[1200px]">
      <h1 className='mb-4 text-xl md:text-2xl'>
        报表
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper reportDto={reportDto}/>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <DailyBorrowChart reportDto={reportDto}/>
        <HotDescriptions reportDto={reportDto}/>
      </div>
    </main>
  );
}
