"use client";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Chip,
  Menu,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { HeadCell } from "../tables/tbl-enhanced/types";
import { FormattedMessage } from "react-intl";

export interface FilterItem {
  field: string;
  value: string;
  operator: string;
}

interface FiltroComponentProps {
  columns: HeadCell[];
  onFilterChange: (filters: FilterItem[]) => void;
}

const FiltroComponent: React.FC<FiltroComponentProps> = ({
  columns,
  onFilterChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<HeadCell | null>(null);
  const [filterValue, setFilterValue] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<FilterItem[]>([]);
  const [modalAnchorPosition, setModalAnchorPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // Aplicar filtros quando o estado aplicado mudar
  useEffect(() => {
    onFilterChange(appliedFilters);
  }, [appliedFilters]);

  // Função para abrir o menu
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Função para fechar o menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Função para selecionar o filtro e abrir o Popover
  const handleSelectFilter = (
    column: HeadCell,
    event: React.MouseEvent<HTMLElement>
  ) => {
    setSelectedFilter(column);
    const rect = event.currentTarget.getBoundingClientRect();
    setModalAnchorPosition({
      top: rect.bottom - 40,
      left: rect.left,
    });
    setOpenModal(true);
    handleCloseMenu();
  };

  // Função para fechar o Popover
  const handleCloseModal = () => {
    setOpenModal(false);
    setFilterValue("");
  };

  // Função para aplicar o filtro
  const handleApplyFilter = () => {
    if (filterValue.trim() !== "" && selectedFilter) {
      setAppliedFilters([
        ...appliedFilters,
        {
          field: selectedFilter?.field,
          value: filterValue,
          operator: selectedFilter.type === "select" ? "equals" : "startsWith",
        },
      ]);
      handleCloseModal();
    }
  };

  // Função para remover um filtro aplicado
  const handleDeleteFilter = (index: number) => {
    const newFilters = [...appliedFilters];
    newFilters.splice(index, 1);
    setAppliedFilters(newFilters);
  };

  return (
    <Box>
      {/* Área do dropzone */}
      <Box
        onClick={handleOpenMenu}
        sx={{
          cursor: "pointer",
          display: "flex",
          flexWrap: "wrap",
          width: "100%", // Set a fixed width
          padding: "20px",
        }}
      >
        {/* Exibição dos filtros aplicados */}
        {appliedFilters.length > 0 ? (
          appliedFilters.map((filter, index) => (
            <Chip
              key={index}
              label={`${filter.field}: ${filter.value}`}
              onDelete={(e) => {
                e.stopPropagation(); // Impede que o clique no delete abra o menu
                handleDeleteFilter(index);
              }}
              sx={{ marginRight: "8px", marginBottom: "8px" }}
            />
          ))
        ) : (
          <Typography
            sx={{
              border: "1px dashed #ccc",
              textAlign: "center",
              color: "#aaa",
              borderRadius: "18px",
              padding: "5px 10px 5px 10px",
              display: "flex", // Adiciona flexbox
              alignItems: "center", // Centraliza verticalmente
              justifyContent: "center", // Centraliza horizontalmente
              fontSize: "12px",
            }}
          >
            <AddIcon fontSize="small" />
            <FormattedMessage id="add_filter" />
          </Typography>
        )}
      </Box>

      {/* Menu de seleção de filtros */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            minWidth: "200px", // Ajuste a largura conforme necessário
          },
        }}
      >
        {columns.map((column) => (
          <MenuItem
            key={column.field}
            onClick={(event) => handleSelectFilter(column, event)}
          >
            {column.headerName}
          </MenuItem>
        ))}
      </Menu>

      {/* Popover para inserir o valor do filtro */}
      <Popover
        open={openModal}
        anchorReference="anchorPosition"
        anchorPosition={
          modalAnchorPosition !== null
            ? { top: modalAnchorPosition.top, left: modalAnchorPosition.left }
            : undefined
        }
        onClose={handleCloseModal}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography variant="h6" component="h2">
            {selectedFilter?.headerName}
          </Typography>
          {selectedFilter?.type === "select" && selectedFilter.options ? (
            <TextField
              select
              fullWidth
              label={
                selectedFilter?.type === "select" ? (
                  <FormattedMessage id="equals" />
                ) : (
                  <FormattedMessage id="starts_with" />
                )
              }
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              sx={{ marginTop: "16px" }}
            >
              {selectedFilter.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              fullWidth
              label={
                selectedFilter?.type === "select" ? (
                  <FormattedMessage id="equals" />
                ) : (
                  <FormattedMessage id="starts_with" />
                )
              }
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              sx={{ marginTop: "16px" }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyFilter}
            sx={{ marginTop: "24px" }}
            fullWidth
          >
            <FormattedMessage id="apply_filter" />
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default FiltroComponent;
