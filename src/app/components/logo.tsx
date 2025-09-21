import {AcademicCapIcon} from '@heroicons/react/24/outline';

export default function Logo() {
  return (
    <div
      className="flex flex-row items-center leading-none text-white"
    >
      <AcademicCapIcon className="h-12 w-12 rotate-[15deg]"/>
      <p className="text-[1.5rem] font-semibold">掌上借书</p>
    </div>
  );
}
