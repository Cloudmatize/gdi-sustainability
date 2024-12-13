import { ReportSimulationHistory } from "@/store/targets";
import axios from "axios";

const MOCKED_DATA: ReportSimulationHistory[] = [
  {
    reportName: "teste",
    generatedDate: "2024-12-13T18:40:15.825Z",
    data: {
      lastYearCo2Emission: 77955.7567,
      targetCo2EmissionsFinalYear: {
        year: 2030,
        co2Emission: null,
        targetCo2Emission: 52369.41216000004,
      },
      yearBaseCo2Emission: 65461.7652,
      targetsCo2EmissionByModal: [
        {
          mode: "AUTOMOBILE",
          co2Emissions: 67384.7898,
          trips: 44822422,
        },
        {
          mode: "MOTORCYCLE",
          co2Emissions: 10570.9669,
          trips: 29419608,
        },
      ],
      transportEmissionsTarget: [
        {
          year: 2019,
          co2Emission: 65461.7652,
          targetCo2Emission: 65461.7652,
        },
        {
          year: 2020,
          co2Emission: 43110.1334,
          targetCo2Emission: 64147.20096189108,
        },
        {
          year: 2021,
          co2Emission: 57403.008,
          targetCo2Emission: 62859.03502102996,
        },
        {
          year: 2022,
          co2Emission: 71126.5741,
          targetCo2Emission: 61596.73726251058,
        },
        {
          year: 2023,
          co2Emission: 77955.7567,
          targetCo2Emission: 60359.78821687917,
        },
        {
          year: 2024,
          co2Emission: null,
          targetCo2Emission: 59147.6788463586,
        },
        {
          year: 2025,
          co2Emission: null,
          targetCo2Emission: 57959.91033536565,
        },
        {
          year: 2026,
          co2Emission: null,
          targetCo2Emission: 56795.99388523498,
        },
        {
          year: 2027,
          co2Emission: null,
          targetCo2Emission: 55655.45051306538,
        },
        {
          year: 2028,
          co2Emission: null,
          targetCo2Emission: 54537.810854605385,
        },
        {
          year: 2029,
          co2Emission: null,
          targetCo2Emission: 53442.614971097304,
        },
        {
          year: 2030,
          co2Emission: null,
          targetCo2Emission: 52369.41216000004,
        },
      ],
      transfers: [
        {
          id: "7469",
          fromMode: "MOTORCYCLE",
          distributions: [
            {
              id: "8108",
              toMode: "AUTOMOBILE",
              percentage: 26,
            },
          ],
        },
      ],
      totalCo2Emission: {
        original: 77954,
        simulated: 82873,
        percentage: -6.310131616081279,
      },
    },
  },
  {
    reportName: "testetetet",
    generatedDate: "2024-12-13T18:42:01.510Z",
    data: {
      lastYearCo2Emission: 77955.7567,
      targetCo2EmissionsFinalYear: {
        year: 2030,
        co2Emission: null,
        targetCo2Emission: 52369.41216000004,
      },
      yearBaseCo2Emission: 65461.7652,
      targetsCo2EmissionByModal: [
        {
          mode: "AUTOMOBILE",
          co2Emissions: 67384.7898,
          trips: 44822422,
        },
        {
          mode: "MOTORCYCLE",
          co2Emissions: 10570.9669,
          trips: 29419608,
        },
      ],
      transportEmissionsTarget: [
        {
          year: 2019,
          co2Emission: 65461.7652,
          targetCo2Emission: 65461.7652,
        },
        {
          year: 2020,
          co2Emission: 43110.1334,
          targetCo2Emission: 64147.20096189108,
        },
        {
          year: 2021,
          co2Emission: 57403.008,
          targetCo2Emission: 62859.03502102996,
        },
        {
          year: 2022,
          co2Emission: 71126.5741,
          targetCo2Emission: 61596.73726251058,
        },
        {
          year: 2023,
          co2Emission: 77955.7567,
          targetCo2Emission: 60359.78821687917,
        },
        {
          year: 2024,
          co2Emission: null,
          targetCo2Emission: 59147.6788463586,
        },
        {
          year: 2025,
          co2Emission: null,
          targetCo2Emission: 57959.91033536565,
        },
        {
          year: 2026,
          co2Emission: null,
          targetCo2Emission: 56795.99388523498,
        },
        {
          year: 2027,
          co2Emission: null,
          targetCo2Emission: 55655.45051306538,
        },
        {
          year: 2028,
          co2Emission: null,
          targetCo2Emission: 54537.810854605385,
        },
        {
          year: 2029,
          co2Emission: null,
          targetCo2Emission: 53442.614971097304,
        },
        {
          year: 2030,
          co2Emission: null,
          targetCo2Emission: 52369.41216000004,
        },
      ],
      transfers: [
        {
          id: "7469",
          fromMode: "AUTOMOBILE",
          distributions: [
            {
              id: "6946",
              toMode: "MOTORCYCLE",
              percentage: 42,
            },
          ],
        },
      ],
      totalCo2Emission: {
        original: 77954,
        simulated: 59800,
        percentage: 23.28809297791005,
      },
    },
  },
];

export const getTargetReportsHistory = async ({}) => {
  try {
    // const response = await axios.get(
    //   "https://api.example.com/targets/reports-history"
    // );
    // if (response.data) {
    //   return response.data;
    // }

    return MOCKED_DATA;
  } catch (error) {
    console.error("getTargetReportsHistory", error);
  }
};
