"use client";

import FiltroComponent, { FilterItem } from "@/components/ui-components/filter";
import { TableEnhancedCreateDataType } from "@/components/ui-components/tables/tbl-enhanced";
import { HeadCell } from "@/components/ui-components/tables/tbl-enhanced/types";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import MainCard2 from "@/components/ui-components/cards/MainCard2";
import NewProfileVesselcare from "../new-profile";
import SlidingPanel from "@/components/ui-components/modal/SlidingPainel";
import TableUsers from "./components/tableUsers";
// table header
const columns: HeadCell[] = [
  {
    field: "name",
    headerName: <FormattedMessage id="name" />,
    type: "string",
  },
  {
    field: "email",
    headerName: <FormattedMessage id="email" />,
    type: "string",
  },
  {
    field: "role",
    headerName: <FormattedMessage id="role" />,
    type: "string",
  },
  {
    field: "status",
    headerName: <FormattedMessage id="status" />,
    type: "select",
    options: ["Active", "Inactive"],
  },
];

const rows: TableEnhancedCreateDataType[] = [
  {
    id: 1,
    avatar: "https://avatars.githubusercontent.com/u/10314000?v=4",
    name: "Wellington Rodrigues Ferreira",
    email: "vesselcare@vesselcare.app",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    avatar: "",
    name: "Daniel Ferreira",
    email: "daniel@vesselcare.app",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    avatar: "",
    name: "Wilson Ferreira",
    email: "wilson@vesselcare.app",
    role: "Admin",
    status: "Active",
  },
];

// Dentro do seu componente
// const options = [
//   {label: 'Opção 1',onClick: () => { //console.log('Opção 1'); },},
//   {label: 'Opção 2',onClick: () => { //console.log('Opção 2'); },},
//   {label: 'Opção 3',onClick: () => { //console.log('Opção 3'); },},
// ];

const UserAdmin = () => {
  const [filteredData, setFilteredData] =
    useState<TableEnhancedCreateDataType[]>(rows);
  const [openModal, setOpenModal] = useState(false);

  //console.log(pathname);

  // handle show all users
  const handleShowAllUsers = () => {
    setOpenModal(true);
  };

  // handle close modal
  const handleClose = () => {
    setOpenModal(false);
  };

  // apply filters in table
  const applyFilters = (filters: FilterItem[]) => {
    let filtered = rows;

    filters.forEach((filter) => {
      filtered = filtered.filter((item) => {
        const itemValue =
          item[filter.field as keyof TableEnhancedCreateDataType];
        const filterValue = filter.value;

        if (itemValue === undefined) return false;

        switch (filter.operator) {
          case "startsWith":
            return itemValue
              .toString()
              .toLowerCase()
              .startsWith(filterValue.toLowerCase());
          case "equals":
            return (
              itemValue.toString().toLowerCase() === filterValue.toLowerCase()
            );
          default:
            return true;
        }
      });
    });
    setFilteredData(filtered);
  };

  return (
    <>
      <MainCard2
        content={false}
        title={
          <Stack direction="row" spacing={3}>
            <Button
              variant="text"
              color="secondary"
              onClick={handleShowAllUsers}
            >
              <FormattedMessage id="add_new_user" />
            </Button>
          </Stack>
        }
      >
        <FiltroComponent columns={columns} onFilterChange={applyFilters} />
        <TableUsers
          headCells={columns}
          title="User Admin"
          rows={filteredData}
        />
      </MainCard2>

      {/* modal */}
      <SlidingPanel
        open={openModal}
        onClose={handleClose}
        title={<FormattedMessage id="add_new_user" />}
      >
        <NewProfileVesselcare />
      </SlidingPanel>
    </>
  );
};

export default UserAdmin;
