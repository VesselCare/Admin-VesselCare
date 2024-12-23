import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  useTheme,
  Typography,
  alpha,
} from "@mui/material";

const sx = (theme: any) => ({
  maxHeight: 500,
  overflowY: "auto" as const, // Explicitly cast to the correct type
  width: "100%",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.background.default,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
});

const DataTable = ({ columns, data, actions }: any) => {
  const theme = useTheme();
  const scrollbarStyles = sx(theme);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Tabela de Dados">
        <TableHead>
          <TableRow>
            {columns.map((column: any) => (
              <TableCell
                key={column.field}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  fontWeight: "bold",
                }}
              >
                <Typography
                  variant="subtitle1"
                  color={theme.palette.common.white}
                >
                  {column.headerName}
                </Typography>
              </TableCell>
            ))}
            {actions && actions.length > 0 && (
              <TableCell
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  fontWeight: "bold",
                }}
              >
                <Typography
                  variant="subtitle1"
                  color={theme.palette.common.white}
                >
                  Ações
                </Typography>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
      </Table>
      <div style={scrollbarStyles}>
        <Table size="small">
          <TableBody>
            {data &&
              data.map((row: any, rowIndex: any) => (
                <TableRow
                  key={row.id || rowIndex}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.light, 0.1),
                    },
                    height: 60,
                  }}
                >
                  {columns.map((column: any) => (
                    <TableCell key={column.field}>
                      {row[column.field]}
                    </TableCell>
                  ))}
                  {actions && actions.length > 0 && (
                    <TableCell>
                      {actions.map((action: any, actionIndex: any) => (
                        <IconButton
                          key={actionIndex}
                          aria-label={action.label}
                          onClick={() => action.onClick(row)}
                          color={action.color || "default"}
                        >
                          {action.icon}
                        </IconButton>
                      ))}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};

export default DataTable;
