import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default function CardWrapper({reportDto}:{reportDto?:ReportSummaryDto}) {
  return (
    <>
      <Card title="订阅图书" value={reportDto?.bookSubscriptionCount ?? 0} type="collected"/>
      <Card title="待还图书" value={reportDto?.borrowedBookCount ?? 0} type="pending"/>
      <Card title="图书总数" value={reportDto?.totalBookCount ?? 0} type="invoices"/>
      <Card title="7日活跃用户" value={reportDto?.activeUserCount ?? 0} type="customers"/>
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className=" truncate rounded-xl bg-white px-4 py-8 text-center text-2xl"
      >
        {value}
      </p>
    </div>
  );
}
