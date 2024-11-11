export function formatCO2Emission(value?: number): string | undefined {
  if (!value) return 
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(2) + "bi"; 
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2) + "mi"; 
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(0) + "k";
  } else {
    return value.toFixed(0) ;
  }
}
