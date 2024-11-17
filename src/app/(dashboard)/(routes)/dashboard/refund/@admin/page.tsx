"use client";

import RefundTable from "@/components/refund/RefundTable";
import React from "react";

export default function RefundPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      {/* <SearchAndFilter /> */}
      <RefundTable role="Admin" />
    </div>
  );
}
