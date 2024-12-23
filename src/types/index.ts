import { ChipProps } from "@mui/material/Chip";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import React, { FunctionComponent, ReactNode } from "react";

export type GuardProps = {
  children: React.ReactElement | null;
};

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export type LinkTarget = "_blank" | "_self" | "_parent" | "_top";

export type OverrideIcon =
  | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    })
  | React.ComponentClass<any>
  | FunctionComponent<any>
  | any;

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}

export type NavItemType = {
  id?: string;
  link?: string;
  icon?: GenericCardProps["iconPrimary"];
  target?: boolean;
  external?: boolean;
  url?: string | undefined;
  type?: string;
  title?: ReactNode | string;
  color?: "primary" | "secondary" | "default" | undefined;
  caption?: ReactNode | string;
  breadcrumbs?: boolean;
  disabled?: boolean;
  chip?: ChipProps;
  children?: NavItemType[];
  elements?: NavItemType[];
  search?: string;
  location?: string | string[];
  action?: string | string[];
};

export interface TabsProps {
  children?: React.ReactElement | React.ReactNode | string;
  value: string | number;
  index: number;
}

export interface UserPermission {
  role_id: string;
  module_id: string;
  location_id: string;
  action_id: string;
  is_enabled: boolean;
}

export interface User {
  id: string;
  avatar: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  birth_date: string;
  email: string;
  phone: string;
  ssn: string;
  user_type: string;
  username: string;
  document: string;
}
