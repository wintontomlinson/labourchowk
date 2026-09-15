export function AdminTable({
  columns,
  children,
}: {
  columns: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="-mx-4 overflow-x-auto sm:mx-0 sm:rounded-card sm:border sm:border-ink/[0.07] sm:bg-white sm:shadow-card">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-ink/[0.08] bg-ivory-50 text-left text-xs uppercase tracking-wide text-ink-500">
            {columns.map((c, i) => (
              <th
                key={c}
                className={`whitespace-nowrap px-4 py-3 font-semibold ${i === columns.length - 1 ? "text-right" : ""}`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
