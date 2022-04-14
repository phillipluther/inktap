export default function updateHistory(history: string[] | Date[]): Date[] {
  const newHistory = JSON.parse(JSON.stringify(history)).map((date: string) => new Date(date));
  newHistory.push(new Date());
  return newHistory;
}
