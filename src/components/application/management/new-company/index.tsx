"use client";

import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import MenuListComIcon from "@/components/ui-components/menus/menu-list-com-icon";
import NewCompanyLicense from "../license";
import PaymentMethod from "../payment-method.tsx";
import Company from "../company";
import VesselComponent from "../vessel";
import UserAdminNewCompany from "../user-admin";

export default function NewCompany() {
  // Lista de menus
  const listMenu = [
    {
      id: 1,
      label: "License",
      icon: <DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
      content: <NewCompanyLicense />, // Conteúdo exibido quando "License" for selecionado
    },
    {
      id: 2,
      label: "Payment Method",
      icon: <DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
      content: <PaymentMethod />, // Conteúdo exibido quando "Company" for selecionado
    },
    {
      id: 3,
      label: "Company",
      icon: <DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
      content: <Company />, // Conteúdo exibido quando "Company" for selecionado
    },
    {
      id: 4,
      label: "Vessel",
      icon: <DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
      content: <VesselComponent />, // Conteúdo exibido quando "Vessel" for selecionado
    },
    {
      id: 5,
      label: "User",
      icon: <DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
      content: <UserAdminNewCompany />, // Conteúdo exibido quando "User" for selecionado
    },
  ];
  return (
    <>
      <MenuListComIcon listMenu={listMenu} />
    </>
  );
}
