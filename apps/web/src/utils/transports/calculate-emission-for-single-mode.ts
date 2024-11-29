
interface TransportModeReal {
    mode: string;
    co2Emissions: number;
    trips: number;
  }
export function calculateEmissionsForSingleMode(
    data: TransportModeReal,
    passengersPerTripData: { [key: string]: number }
  ): number {
    if (data.trips <= 0 || passengersPerTripData[data.mode] <= 0) {
      return 0;
    }
    const totalPassengers = data.trips * passengersPerTripData[data.mode];
    const emissionsInKg = data.co2Emissions * 1000;
    return totalPassengers > 0 ? Math.max(emissionsInKg / totalPassengers, 0) : 0;
  }
  