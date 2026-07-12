
# API Documentation

## Base URL

/api


---

# Organization Module

## Create Organization

POST
/organizations



Body:

```json
{
 "organizationName":"Muller & Phipps"
}

Get Organizations

GET
/organizations

# Company Module
## Create Company

POST
/companies

{
 "organizationId":"organization_id",
 "companyName":"Getz Pharma"
}

# Get Companies By Organization

GET
/companies/organization/:organizationId

# Medicine Module
## Create Medicine

POST
/items

Body:

{
 "companyId":"company_id",
 "itemName":"Panadol 500mg",
 "type":"TAB"
}

# Get Medicines By Organization

GET
/items/organization/:organizationId



