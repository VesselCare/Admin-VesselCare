// third-party
import Icon from "@/components/icons/user";
import { FormattedMessage } from "react-intl";

// type
import { NavItemType } from "@/types";

const icons = {
  IconUser: (props: any) => <Icon name="user" {...props} />,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const User: NavItemType = {
  id: "services",
  title: <FormattedMessage id="service" />,
  // caption: <FormattedMessage id="Admin" />,
  icon: icons.IconUser,
  type: "group",
  children: [
    {
      id: "user",
      title: <FormattedMessage id="user" />,
      type: "collapse",
      icon: icons.IconUser,
      children: [
        {
          id: "list-user",
          title: <FormattedMessage id="list-user" />,
          type: "item",
          url: "/admin/user",
        },
        {
          id: "new-user",
          title: <FormattedMessage id="new-user" />,
          type: "item",
          url: "/admin/new",
        },
      ],
    },
  ],
};

export default User;
