import ShowEventModalButton from "@/components/button/ShowEventModalButton";
import SmallCalendar from "./SmallCalendar";

const Sidebar = () => {
  return (
    <aside className="border-r-2 border-calendar-main-theme h-full p-5 w-64">
      <div className="flex justify-center w-full">
        <ShowEventModalButton />
      </div>
      <SmallCalendar />
    </aside>
  );
}

export default  Sidebar