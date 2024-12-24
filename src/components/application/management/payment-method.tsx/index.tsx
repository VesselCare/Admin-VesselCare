import PaymentMethodBasic from "./payment-method";

export default function PaymentMethod({
  onFormChange,
}: {
  onFormChange: (dirty: boolean) => void;
}) {
  return <PaymentMethodBasic onFormChange={onFormChange} />;
}
