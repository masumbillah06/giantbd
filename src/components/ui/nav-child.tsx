import { Download, Printer, RotateCcw, Plus } from "lucide-react";
import { ActionButton } from "./buttons/action-button";
import SearchDropdown from "./searchbar-drop/SearchDropdown";
import Dropdown from "./buttons/drop-down";

export default function NavCh() {
  return (
    <div className="min-h-20 w-full flex justify-center items-center px-5 gap-x-3">
      <div className="h-8 w-65">
        <SearchDropdown />
      </div>
      <div>
        <ActionButton
          label="Download/Export"
          icon={Download}
        />
      </div>
      <div>
        <ActionButton
          label="Reload Data"
          icon={RotateCcw}
        />
      </div>
      <div>
        <ActionButton
          label="Print List"
          icon={Printer}
        />
      </div>
      <div>
        <Dropdown />
      </div>
      <div>
        <button className="flex items-center gap-1.5 rounded-md bg-[#476ab8] px-3 py-2 text-sm font-medium text-white">
          <Plus className="h-4 w-4" />
          New
        </button>
      </div>
    </div>
  )
}
