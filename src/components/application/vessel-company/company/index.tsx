"use client";

import MainCard from "@/components/ui-components/cards/MainCard";
import CompanyList from "./components/company_list";
import Pagination1 from "@/components/ui-components/pagination/pagination-1";
import MenuCompany from "../../../ui-components/menus/menu-list-component";

const listMenu = [
  {
    id: 1,
    label: "add_new_company",
    href: "/management/new/company",
  },
  {
    id: 2,
    label: "add_new_user_company",
    href: "/management/new/user",
  },
  {
    id: 3,
    label: "add_new_vessel",
    href: "/management/new/vessel",
  },
];

const Company = () => {
  return (
    <MainCard title={<MenuCompany listMenu={listMenu} />}>
      <CompanyList />
      <Pagination1 />
    </MainCard>
  );
};

export default Company;
