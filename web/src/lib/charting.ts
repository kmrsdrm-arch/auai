import type { ChartSeriesPoint } from "./types";

export function buildLinePath(points: ChartSeriesPoint[], height: number, width: number) {
  if (points.length === 0) return "";
  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const step = width / Math.max(points.length - 1, 1);
  return points
    .map((point, index) => {
      const x = index * step;
      const normalized = (point.value - min) / range;
      const y = height - normalized * height;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}


