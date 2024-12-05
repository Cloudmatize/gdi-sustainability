"use client";
import Unauthorized from "@/components/auth/unauthorized";
import TransportsPage from "@/components/transports/page";
import { FLIPT_TRANSPORTS_FLAG, IS_FLIPT_ACTIVE } from "@/constants/flipt";
import { FeatureFlagsContext } from "@/providers/authenticated/feature-flags";
import { useContext } from "react";

export default function Page() {
  const { getCurrentFlag } = useContext(FeatureFlagsContext);
  const flag = getCurrentFlag(FLIPT_TRANSPORTS_FLAG);

  if (IS_FLIPT_ACTIVE && !flag?.enabled) {
    return <Unauthorized />;
  }
  return <TransportsPage />;
}
