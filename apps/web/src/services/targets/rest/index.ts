import { ReportSimulationHistory } from "@/store/targets";
import axios from "axios";

const MOCKED_DATA: ReportSimulationHistory[] = [
  {
    
    reportName: "Report 1",
    generatedDate: "2021-09-01",
    data: {
      transfers: [
        {
          fromMode: "CAR",
          id: "1",
          distributions: [
            {
              id: "1",
              toMode: "BUS",
              percentage: 50,
            },
          ],
        },
      ],
      lastYearCo2Emission: 100,
      targetCo2EmissionsFinalYear: {
        targetCo2Emission: 50,
        year: 2022,
        co2Emission: 100,
      },
      transfpormEmissionsTarget: [
        {
          year: 2022,
          co2Emission: 100,
          targetCo2Emission: 50,
        },
      ],
      yearBaseCo2Emission: 100,
    },
  },
  {
    reportName: "Report 2",
    generatedDate: "2021-09-02",
    data: {
      transfers: [
        {
          fromMode: "BUS",
          id: "2",
          distributions: [
            {
              id: "2",
              toMode: "CAR",
              percentage: 50,
            },
          ],
        },
      ],
      lastYearCo2Emission: 200,
      targetCo2EmissionsFinalYear: {
        targetCo2Emission: 150,
        year: 2022,
        co2Emission: 200,
      },
      transfpormEmissionsTarget: [
        {
          year: 2022,
          co2Emission: 200,
          targetCo2Emission: 150,
        },
      ],
      yearBaseCo2Emission: 200,
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
