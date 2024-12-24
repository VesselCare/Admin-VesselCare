import CompanyType from "./company-type";

export default function Company() {
  return <CompanyType />;
}

/*
type CreateClientLegalDto struct {
	LegalBusinessName   string     `json:"legal_business_name"`   // Nome da empresa
	DoingBusinessAs     string     `json:"doing_business_as"`     // Razão Social
	EIN                 string     `json:"ein"`                   // CNPJ
	BusinessEntityType  string     `json:"business_entity_type"`  // Tipo de empresa
	DateOfIncorporation *time.Time `json:"date_of_incorporation"` // Data de incorporação
	BusinessPhone       string     `json:"business_phone"`        // Telefone da empresa
	BusinessEmail       string     `json:"business_email"`        // Email da empresa
	WebsiteURL          string     `json:"website_url"`           // URL do site da empresa
	RegisteredAgentName string     `json:"registered_agent_name"` // Nome do agente registrado
	Industry            string     `json:"industry"`              // Indústria
	DUNSNumber          string     `json:"duns_number"`           // DUNS Number
}

type CreateClientPhysicalDto struct {
	License_id   uuid.UUID `json:"license_id"`
	Address_id   uuid.UUID `json:"address_id"`
	Name         string    `json:"name"`
	Document     string    `json:"document"`
	DocumentType string    `json:"document_type"`
	Phone        string    `json:"phone"`
	Email        string    `json:"email"`
	Status_enum  string    `json:"status_enum"`
}

type CreateAddressDto struct {
	Tenant_id    uuid.UUID `json:"tenant_id"`
	License_id   uuid.UUID `json:"license_id"`
	Street       string    `json:"street"`
	Number       string    `json:"number"`
	Complement   string    `json:"complement"`
	Neighborhood string    `json:"neighborhood"`
	City         string    `json:"city"`
	State        string    `json:"state"`
	ZipCode      string    `json:"zip_code"`
}

*/
