import UserAdminCompany from "./user_admin";

export default function UserAdminNewCompany({
  onFormChange,
}: {
  onFormChange: (dirty: boolean) => void;
}) {
  return <UserAdminCompany onFormChange={onFormChange} />;
}
