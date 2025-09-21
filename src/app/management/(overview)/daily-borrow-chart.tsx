export default function DailyBorrowChart({reportDto}:{reportDto?:ReportSummaryDto}) {
  const dailyCount = reportDto?.borrowedBookTrendList ?? []


  const topLabel = 50
  const yAxisLabels = [60,50,40,30,20,10]
  const chartHeight = 350;

  if (!dailyCount || dailyCount.length === 0) {
    return <p className="mt-4 text-gray-400">暂无数据</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">
        7日借阅
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 grid grid-cols-8 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {/* y-axis */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {dailyCount.map((item) => (
            <div key={item.date} className="flex flex-col items-center gap-2">
              {/* bars */}
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * (item.count || 0)}px`,
                }}
              ></div>
              {/* x-axis */}
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {item.count || 0}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
