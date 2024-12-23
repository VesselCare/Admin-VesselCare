"use client";

import React, { useEffect, useState } from "react";

// third-party
import { IntlProvider, MessageFormatElement } from "react-intl";

// project import
import useConfig from "@/hooks/useConfig";

// types
import { I18n } from "@/types/config";

// load locales files
const loadLocaleData = (i18n: I18n): Promise<Record<string, string>> => {
  switch (i18n) {
    case "es":
      return import("../../../utils/locales/es.json").then(
        (module) => module.default
      );
    case "pt":
      return import("../../../utils/locales/pt.json").then(
        (module) => module.default
      );
    default:
      return import("../../../utils/locales/en.json").then(
        (module) => module.default
      );
  }
};

// ==============================|| LOCALIZATION ||============================== //
interface LocalsProps {
  children: React.ReactNode;
}

const Locales = ({ children }: LocalsProps) => {
  const { i18n } = useConfig();
  const [messages, setMessages] = useState<
    Record<string, string> | Record<string, MessageFormatElement[]> | undefined
  >();

  useEffect(() => {
    loadLocaleData(i18n).then(
      (d: Record<string, string> | Record<string, MessageFormatElement[]>) => {
        setMessages(d);
      }
    );
  }, [i18n]);

  return (
    <>
      {messages && (
        <IntlProvider locale={i18n} defaultLocale="en" messages={messages}>
          {children}
        </IntlProvider>
      )}
    </>
  );
};

export default Locales;
