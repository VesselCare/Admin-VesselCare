"use client";
import React from "react";
import MainCard from "@/components/ui-components/cards/MainCard";
import PermissionsTable from "./components/PermissionsTable";

const PermissionsPage: React.FC = () => {
  return (
    <MainCard>
      <PermissionsTable />
    </MainCard>
  );
};

export default PermissionsPage;
