"use client";

import React, { useState } from "react";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import MenuListComIcon from "@/components/ui-components/menus/menu-list-com-icon";
import NewCompanyLicense from "../license";
import PaymentMethod from "../payment-method.tsx";
import VesselComponent from "../vessel";
import UserAdminNewCompany from "../user-admin";
import { useAlert } from "@/hooks/useAlert"; // Hook para gerenciar o alerta
import CompanyType from "../company/company-type";

export default function NewCompany() {
  const [currentTab, setCurrentTab] = useState(0); // Aba atual
  const [isFormDirty, setIsFormDirty] = useState(false); // Verifica alterações no formulário
  const { showAlert, Alert } = useAlert();

  // Função para mudar de aba
  const handleTabChange = (newTab: number) => {
    if (isFormDirty) {
      // Mostra o alerta
      showAlert(
        "warning",
        "Alterações não salvas",
        "Você tem alterações não salvas. Deseja continuar sem salvar?",
        "Sim",
        () => {
          setCurrentTab(newTab); // Confirma a mudança de aba
          setIsFormDirty(false); // Marca como salvo
        },
        "Não",
        () => {} // Não faz nada
      );
      return;
    }
    setCurrentTab(newTab); // Muda diretamente se não houver alterações
  };

  // Lista de menus
  const listMenu = [
    {
      id: 1,
      label: "Company",
      icon: <DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
      content: <CompanyType />, // Conteúdo exibido quando "Company" for selecionado
    },
    // {
    //   id: 2,
    //   label: "Address ",
    //   icon: <DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
    //   content: <AddressCompanyComponent />, // Conteúdo exibido quando "Company" for selecionado
    // },
    {
      id: 3,
      label: "License",
      icon: <DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
      content: (
        <NewCompanyLicense
          onFormChange={(dirty: boolean) => setIsFormDirty(dirty)}
        />
      ), // Conteúdo exibido quando "License" for selecionado
    },
    {
      id: 4,
      label: "Vessel",
      icon: <DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
      content: (
        <VesselComponent
          onFormChange={(dirty: boolean) => setIsFormDirty(dirty)}
        />
      ), // Conteúdo exibido quando "Vessel" for selecionado
    },
    {
      id: 5,
      label: "Payment Method",
      icon: <DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
      content: (
        <PaymentMethod
          onFormChange={(dirty: boolean) => setIsFormDirty(dirty)}
        />
      ), // Conteúdo exibido quando "Payment Method" for selecionado
    },
    {
      id: 6,
      label: "User",
      icon: <DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
      content: (
        <UserAdminNewCompany
          onFormChange={(dirty: boolean) => setIsFormDirty(dirty)}
        />
      ), // Conteúdo exibido quando "User" for selecionado
    },
  ];

  return (
    <>
      <MenuListComIcon
        listMenu={listMenu}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
      {Alert}
    </>
  );
}
