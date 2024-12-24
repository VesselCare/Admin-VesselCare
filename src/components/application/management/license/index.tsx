import MainCard from "@/components/ui-components/cards/MainCard";
import LicenseDataBasic from "./license";

export default function NewCompanyLicense({
  onFormChange,
}: {
  onFormChange: (dirty: boolean) => void;
}) {
  return (
    <MainCard content={false}>
      <MainCard title="License Data">
        <LicenseDataBasic onFormChange={onFormChange} />
      </MainCard>
    </MainCard>
  );
}
