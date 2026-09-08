export function StatusPill({ status }: { status: "Issued" | "Received" }) {
  const styles = status === "Issued" ? "bg-emerald-500" : "bg-indigo-500";

  return (
    <span
      className={`inline-block rounded-md px-3.5 py-1.5 text-xs font-semibold text-white ${styles}`}
    >
      {status}
    </span>
  );
}

export function LabelCheck({ color }: { color: "green" | "purple" }) {
  const styles =
    color === "green" ? "bg-emerald-100 text-emerald-600" : "bg-indigo-500 text-white";

  return (
    <span
      className={`flex h-5.5 w-5.5 items-center justify-center rounded-full text-xs ${styles}`}
    >
      ✓
    </span>
  );
}
