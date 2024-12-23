import { TableCellProps } from "@mui/material/TableCell";

export type ArrangementOrder = "asc" | "desc" | undefined;

export type DateRange = { start: number | Date; end: number | Date };

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export type GetComparator = (
  o: ArrangementOrder,
  o1: string
) => (a: KeyedObject, b: KeyedObject) => number;

export interface HeadCell {
  field: string;
  headerName: React.ReactNode;
  type?: "string" | "number" | "date" | "select";
  options?: string[];
}

export interface EnhancedTableHeadProps extends TableCellProps {
  headCells: HeadCell[];
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  order: ArrangementOrder;
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (e: React.SyntheticEvent, p: string) => void;
}
