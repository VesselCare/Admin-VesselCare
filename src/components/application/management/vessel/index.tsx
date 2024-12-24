import MainCard from "@/components/ui-components/cards/MainCard";
import VesselDataBasic from "./vessel_create";

export default function VesselComponent({
  onFormChange,
}: {
  onFormChange: (dirty: boolean) => void;
}) {
  return (
    <MainCard title="Vessel">
      <VesselDataBasic onFormChange={onFormChange} />
    </MainCard>
  );
}
