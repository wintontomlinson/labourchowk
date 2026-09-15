export function AdminTable({
  columns,
  children,
}: {
  columns: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-card border border-ink/[0.07] bg-white shadow-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink/[0.08] bg-ivory-50 text-left text-xs uppercase tracking-wide text-ink-500">
            {columns.map((c, i) => (
              <th
                key={c}
                className={`px-4 py-3 font-semibold ${i === columns.length - 1 ? "text-right" : ""}`}
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
