// menu import
import CustomerManagement from "./customer-management";
import dashboard from "./dashboard";
import Financial from "./financial";
import pages from "./settings_app";
import user from "./user";

// types
import { NavItemType } from "../types";

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [dashboard, user, CustomerManagement, Financial, pages],
};

export default menuItems;
