// third-party

import Icon from "../components/icons/user";
import { FormattedMessage } from "react-intl";

// type
import { NavItemType } from "../types";

// Mapeamento de ícones
const icons = {
  IconUser: (props: any) => <Icon name="user" {...props} />, // Mapeia o ícone com base no nome
  IconCompany: (props: any) => <Icon name="company" {...props} />,
  IconBoat: (props: any) => <Icon name="boat" {...props} />,
};

// const icons = {
//   IconUser: UserIcon,
// };

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const CustomerManagement: NavItemType = {
  id: "customer-management",
  title: <FormattedMessage id="customer-management" />,
  icon: icons.IconUser,
  type: "group",
  children: [
    {
      id: "company",
      title: <FormattedMessage id="company" />,
      type: "item",
      icon: icons.IconCompany,
      url: "/management",
    },
    {
      id: "vessel",
      title: <FormattedMessage id="vessel" />,
      type: "item",
      icon: icons.IconBoat,
      url: "/management/vessel",
    },
    {
      id: "user-company",
      title: <FormattedMessage id="user-company" />,
      type: "item",
      icon: icons.IconUser,
      url: "/management/user-company",
    },
  ],
};

export default CustomerManagement;
