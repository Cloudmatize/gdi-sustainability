export function formatCO2Emission(value?: number): string | undefined {
  if (!value) return;
  if (value >= 1_000_000_000) {
    return Math.floor(value / 1_000_000_000) + "bi";
  } else if (value >= 1_000_000) {
    return Math.floor(value / 1_000_000) + "mi";
  } else if (value >= 1_000) {
    return Math.floor(value / 1_000) + "mil";
  } else {
    return Math.floor(value).toString();
  }
}
