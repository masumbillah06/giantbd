import { Bell, ChevronDown, CircleUserRound, Moon, TextAlignJustify } from "lucide-react";
import SearchDropdown from "../ui/searchbar-drop/SearchDropdown";

export default function Header() {
  return (
    <header className="h-16 w-full shrink-0 bg-white shadow border-slate-500">
      <div className="flex items-center justify-between gap-x-3 h-full px-4">
        <div>
          <button><TextAlignJustify height={14} width={14} /></button>
        </div>
        <div className="flex justify-center items-center gap-x-3">
          <div className="w-92">
            <SearchDropdown  /> 
          </div>
          <div>
            <button className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
              <Bell height={14} width={14} />
            </button>
          </div>
          <div>
            <button className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
              <Moon height={14} width={14} />
            </button>
          </div>
          <div className="h-8 w-20 rounded-lg bg-slate-100 flex items-center justify-center border border-blue-700">
            <button className="h-6 w-6 rounded-lg bg-slate-100 flex items-center justify-center">
              <CircleUserRound height={18} width={18} />
            </button>
            <div className="mx-1 text-xs text-slate-900">
              MB
            </div>
            <div className="mx-1">
              <button><ChevronDown height={14} width={14} /></button>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}