export function formatCO2Emission(value?: number): string | undefined {
  if (!value) return 
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(2) + "B tons"; // Billion
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2) + "M tons"; // Million
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(2) + "K tons"; // Thousand
  } else {
    return value.toFixed(2) + " tons";
  }
}
