import { memo, useLayoutEffect, useState } from "react";

// material-ui
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// project imports
import useConfig from "@/hooks/useConfig";
import NavGroup from "./NavGroup";
import NavItem from "./NavItem";

import { useGetMenuMaster } from "@/api/menu";
import { HORIZONTAL_MAX_ITEM } from "@/config";
import menuItem from "@/menu-items";
import { useAbility } from "@/contexts/AbilityContext";

// types
import { NavItemType } from "@/types";
import { MenuOrientation } from "@/types/config";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const menuLoading = false;
  const { menuOrientation } = useConfig();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const ability = useAbility(); // Use o ability

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downMD;
  const [selectedID, setSelectedID] = useState<string | undefined>("");
  const [menuItems, setMenuItems] = useState<{ items: NavItemType[] }>({
    items: [],
  });

  // Atualiza o menuItems com os itens do menuItem
  useLayoutEffect(() => {
    if (!menuLoading) {
      // Função recursiva para filtrar itens e subitens com base nas permissões
      const filterMenuItems = (items: NavItemType[]): NavItemType[] => {
        return items
          .map((item) => {
            const moduleActions = Array.isArray((item as any).action)
              ? (item as any).action
              : [(item as any).action]; // Sempre como array
            const moduleLocation = (item as any).location; // Location no nível do módulo

            // Verificação de permissão no nível do módulo
            if (
              moduleActions &&
              moduleLocation &&
              !moduleActions.some((action: string) =>
                ability.can(action, moduleLocation)
              )
            ) {
              return null; // Se nenhum role no array tem acesso, retorna null para removê-lo
            }

            if (item.children) {
              // Chamada recursiva para filtrar subitens aninhados
              const filteredChildren = filterMenuItems(item.children);

              // Retorne o item com os filhos filtrados, ou null se não houver filhos permitidos
              return filteredChildren.length > 0
                ? { ...item, children: filteredChildren }
                : null;
            } else {
              const actions = Array.isArray((item as any).action)
                ? (item as any).action
                : [(item as any).action];
              const location = (item as any).location;

              // Verifica se `roles` e `location` estão definidos antes de usar `ability.can`
              if (actions && location) {
                return actions.some((action: string) =>
                  ability.can(action, location)
                )
                  ? item
                  : null;
              }
              // Se `role` ou `location` não estiverem definidos, permite o item
              return item;
            }
          })
          .filter((item): item is NavItemType => item !== null); // Remove itens que não têm permissão
      };

      // Aplica a função recursiva no array principal de itens do menu
      const filteredItems = filterMenuItems(menuItem.items);
      setMenuItems({ items: filteredItems });
    }
  }, [ability, menuLoading]);

  // last menu-item to show in horizontal menu bar
  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;

  let lastItemIndex = menuItems.items.length - 1;
  let remItems: NavItemType[] = [];
  let lastItemId: string;

  if (lastItem && menuItems?.items && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1]?.id!;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items
      .slice(lastItem - 1, menuItems.items.length)
      .map((item) => ({
        title: item.title,
        elements: item.children,
        icon: item.icon,
        ...(item.url && {
          url: item.url,
        }),
      }));
  }

  const navItems = menuItems.items
    .slice(0, lastItemIndex + 1)
    .map((item, index) => {
      switch (item.type) {
        case "group":
          if (item.url && item.id !== lastItemId) {
            return (
              <List key={item.id}>
                <NavItem
                  item={item}
                  level={1}
                  isParents
                  setSelectedID={() => setSelectedID("")}
                />
                {!isHorizontal && index !== 0 && <Divider sx={{ py: 0.5 }} />}
              </List>
            );
          }
          return (
            <NavGroup
              key={item.id}
              setSelectedID={setSelectedID}
              selectedID={selectedID}
              item={item}
              lastItem={lastItem!}
              remItems={remItems}
              lastItemId={lastItemId}
            />
          );
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });

  return !isHorizontal ? (
    <Box {...(drawerOpen && { sx: { mt: 1.5 } })}>{navItems}</Box>
  ) : (
    <>{navItems}</>
  );
};

export default memo(MenuList);
