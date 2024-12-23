import type { Metadata } from "next";
import ProviderWrapper from "../store/providerWrapper";
import './globals.css';


export const metadata: Metadata = {
  title: "Admin VesselCare",
  description: "Admin VesselCare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
