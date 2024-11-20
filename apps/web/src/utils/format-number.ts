export function formatNumber(
  value?: number,
  type: "withSuffix" | "withDots" = "withDots"
): string | undefined {
  if (!value) return;

  if (type === "withSuffix") return convertNumberWithSuffix(value);
  if (type === "withDots") return convertNumberWithDots(value);
}

export function convertNumberWithSuffix(value?: number): string | undefined {
  if (!value) return;
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(2) + "bi";
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2) + "mi";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(0) + "k";
  } else {
    return value.toFixed(0);
  }
}

export function convertNumberWithDots(value?: number): string | undefined {
  if (!value) return;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
