// assets
import {
  IconBellRinging,
  IconBug,
  IconKey,
  IconPhoneCall,
  IconQuestionMark,
  IconReceipt2,
  IconSettings,
  IconShieldLock,
} from "@tabler/icons-react";
import { FormattedMessage } from "react-intl";
import { NavItemType } from "../types";

// constant
const icons = {
  IconKey,
  IconReceipt2,
  IconBug,
  IconBellRinging,
  IconPhoneCall,
  IconQuestionMark,
  IconShieldLock,
  IconSettings,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages: NavItemType = {
  id: "settings",
  title: <FormattedMessage id="system-settings" />,
  icon: icons.IconSettings,
  type: "group",
  // location: 'module-settings',
  // action: 'action-view',
  children: [
    {
      id: "settings",
      title: <FormattedMessage id="settings" />,
      type: "collapse",
      icon: icons.IconKey,
      children: [
        {
          id: "system-settings",
          title: <FormattedMessage id="system-settings" />,
          type: "item",
          url: "#",
          target: false,
        },
        {
          id: "system-settings-layout",
          title: <FormattedMessage id="system-settings-layout" />,
          type: "item",
          url: "#",
          target: false,
        },
        // verifica se o usuário tem permissão para acessar o menu
        {
          id: "system-settings-permissions",
          title: <FormattedMessage id="system-settings-permissions" />,
          type: "item",
          url: "/settings/permissions",
          target: false,
          // action: 'action-view', // verifica se o usuário tem permissão para acessar o submenu
          // location: 'permissions' // localização do submenu
        },
        {
          id: "system-settings-update",
          title: <FormattedMessage id="system-settings-update" />,
          type: "item",
          url: "/settings/account-settings",
          target: false,
        },
      ],
    },
  ],
};

export default pages;
