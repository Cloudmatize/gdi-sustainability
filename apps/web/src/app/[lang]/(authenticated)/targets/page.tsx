"use client";
import Unauthorized from "@/components/auth/unauthorized";
import TargetsPage from "@/components/targets/page";
import { FLIPT_TARGETS_FLAG, IS_FLIPT_ACTIVE } from "@/constants/flipt";
import { FeatureFlagsContext } from "@/providers/authenticated/feature-flags";
import { useContext } from "react";

export default function Page() {
  // const { getCurrentFlag } = useContext(FeatureFlagsContext);
  // const flag = getCurrentFlag(FLIPT_TARGETS_FLAG);

  // if (IS_FLIPT_ACTIVE && !flag?.enabled) {
  //   return <Unauthorized />;
  // }
  return <TargetsPage />;
}
