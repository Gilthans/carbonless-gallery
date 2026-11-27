export function report(rows: Row[]) {
  const out = new CsvWriter(rows.length);
  for (const r of rows) out.add(r);
  return out.text();
}
