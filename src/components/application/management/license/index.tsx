import MainCard from "@/components/ui-components/cards/MainCard";
import LicenseDataBasic from "./license";

export default function NewCompanyLicense() {
  return (
    <MainCard content={false}>
      <MainCard title="License Data">
        <LicenseDataBasic />
      </MainCard>
    </MainCard>
  );
}
