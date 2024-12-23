"use client";

import { Stack, useTheme, Typography } from "@mui/material";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

interface MenuCompanyProps {
  listMenu: {
    id: number;
    label: string;
    href: string;
  }[];
}

const MenuCompany = ({ listMenu }: MenuCompanyProps) => {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={3}>
      {listMenu.map((item) => (
        <Link href={item.href} key={item.id} style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              "&:hover": {
                color: theme.palette.secondary.main,
              },
            }}
          >
            <FormattedMessage id={item.label} />
          </Typography>
        </Link>
      ))}
    </Stack>
  );
};
export default MenuCompany;
