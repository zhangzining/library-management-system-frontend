import clsx from 'clsx';
import {lusitana} from '@/app/ui/fonts';


export default function HotDescriptions({reportDto}: { reportDto?: ReportSummaryDto }) {


  const subscriptionList = reportDto?.bookSubscriptionTrendList ?? []

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        订阅热榜
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {subscriptionList.map((book, i) => {
            return (
              <div
                key={book.title}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex flex-col items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {book.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {book.category}
                    </p>
                  </div>
                </div>
                <p
                  className="truncate text-sm font-medium md:text-base">
                  {book.count || 0}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
