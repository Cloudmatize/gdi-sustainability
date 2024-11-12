export function convertTons(tons: number, targetUnit: "kg" | "g" | "mg"): number {
  switch (targetUnit) {
    case "kg":
      return tons * 1000;
    case "g":
      return tons * 1_000_000;
    case "mg":
      return tons * 1_000_000_000;
    default:
      throw new Error("Invalid target unit. Please use 'kg', 'g', or 'mg'.");
  }
}
