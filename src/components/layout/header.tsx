import { Bell, ChevronDown, CircleUserRound, Moon, TextAlignJustify } from "lucide-react";
import SearchDropdown from "../ui/searchbar-drop/SearchDropdown";

export default function Header() {
  return (
    <header className="w-full h-16 bg-slate-300 border-b border-slate-500">
      <div className="flex items-center justify-between gap-x-2 h-full px-4">
        <div>
          <button><TextAlignJustify /></button>
        </div>
        <div className="w-3xl">
          <SearchDropdown />
        </div>
        <div>
          <button className="h-8 w-8 rounded-md bg-slate-400 flex items-center justify-center">
            <Bell />
          </button>
        </div>
        <div>
          <button className="h-8 w-8 rounded-md bg-slate-400 flex items-center justify-center">
            <Moon />
          </button>
        </div>
        <div className="h-8 w-20 rounded-md bg-slate-400 flex items-center justify-center">
          <button className="h-8 w-8 rounded-md bg-slate-400 flex items-center justify-center">
            <CircleUserRound />
          </button>
          <div>
            MB
          </div>
          <div className="mx-1">
            <button><ChevronDown height={16} width={16} /></button>
          </div>
        </div>
      </div>

    </header>
  );
}