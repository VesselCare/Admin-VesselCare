"use client";

import MainCard from "@/components/ui-components/cards/MainCard";
import Pagination1 from "@/components/ui-components/pagination/pagination-1";
import MenuCompany from "../../../ui-components/menus/menu-list-component";
import VesselList from "./components/vesselList";

const listMenu = [
  {
    id: 1,
    label: "add_new_company",
    href: "/company/new/company",
  },
  {
    id: 2,
    label: "add_new_user_company",
    href: "/company/new/user",
  },
  {
    id: 3,
    label: "add_new_vessel",
    href: "/company/new/vessel",
  },
];

const Vessel = () => {
  return (
    <MainCard title={<MenuCompany listMenu={listMenu} />}>
      <VesselList />
      <Pagination1 />
    </MainCard>
  );
};

export default Vessel;
