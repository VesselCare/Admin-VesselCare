// third-party

import Icon from "../components/icons/user";
import { FormattedMessage } from "react-intl";

// type
import { NavItemType } from "../types";

// Mapeamento de ícones
const icons = {
  IconLicense: (props: any) => <Icon name="license" {...props} />,
};

// const icons = {
//   IconUser: UserIcon,
// };

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const Financial: NavItemType = {
  id: "financial",
  title: <FormattedMessage id="financial" />,
  type: "group",
  children: [
    {
      id: "license",
      title: <FormattedMessage id="license" />,
      type: "item",
      icon: icons.IconLicense,
      url: "/financial/license",
    },
  ],
};

export default Financial;
