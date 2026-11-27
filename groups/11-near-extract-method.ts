export function report(rows: Row[]) {
  return new CsvReport(rows).text();
}
