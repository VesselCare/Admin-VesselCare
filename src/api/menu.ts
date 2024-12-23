import useSWR, { mutate } from "swr";
import { useMemo } from "react";

// Project-imports
//import { fetcher } from 'utils/axios';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// types
import { MenuProps } from "@/types/menu";
import { NavItemType } from "@/types";

const initialState: MenuProps = {
  openedItem: "dashboard",
  isDashboardDrawerOpened: false,
};

export const endpoints = {
  key: "api/menu",
  master: "master",
  widget: "/widget", // server URL
};

export function useGetMenu() {
  const { data, isLoading, error, isValidating } = useSWR(
    endpoints.key + endpoints.widget,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      menu: data?.widget as NavItemType,
      menuLoading: isLoading,
      menuError: error,
      menuValidating: isValidating,
      menuEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// to get local state based on key
export function useGetMenuMaster() {
  const { data, isLoading } = useSWR(
    endpoints.key + endpoints.master,
    () => initialState,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data as MenuProps,
      menuMasterLoading: isLoading,
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

// to update local state based on key
export function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: any) => {
      return { ...currentMenuMaster, isDashboardDrawerOpened };
    },
    false
  );
}

// to update local state based on key
export function handlerActiveItem(openedItem: string) {
  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: any) => {
      return { ...currentMenuMaster, openedItem };
    },
    false
  );
}
