# Company Wise Medicine Form Builder & A4 Print Generator System

A professional medicine management and A4 print generation system built for pharmaceutical distribution workflows.

The system allows users to manage organizations, companies, medicine items and generate professional A4 printable medicine forms.

---

# 🚀 Features

## Organization Management

- Create organizations/distribution partners
- View all organizations
- Delete organizations


## Company Management

- Company creation under organizations
- Organization wise company filtering
- Duplicate company prevention


## Medicine Management

- Add medicines under companies
- Medicine type management

Supported Types:

- TAB
- SYP
- INJ


Features:

- Company wise medicine listing
- Organization wise medicine fetching
- Duplicate medicine prevention


## Print System

- Professional A4 preview
- Browser print support
- PDF generation support
- Automatic multi-page handling
- Two-column item layout

---

# 🏗 System Architecture

Organization

  |

  |

Company

  |

  |

Medicine Item

  |

  |

Print Generator


---

# 🛠 Tech Stack


## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi Validation


## Frontend

- React.js
- Vite
- Material UI
- React Query
- Axios
- React Select


---

# 📂 Backend Structure

backend

src

├── config
├── constants
├── controllers
├── middlewares
├── models
├── routes
├── services
├── utils
└── validations



---

# 🔐 API Modules


## Organization APIs


| Method | Endpoint | Description |
|---|---|---|
| POST | /api/organizations | Create Organization |
| GET | /api/organizations | Get Organizations |
| DELETE | /api/organizations/:id | Delete Organization |


---

## Company APIs


| Method | Endpoint | Description |
|---|---|---|
| POST | /api/companies | Create Company |
| GET | /api/companies | Get Companies |
| GET | /api/companies/organization/:organizationId | Get Organization Companies |
| DELETE | /api/companies/:id | Delete Company |


---

## Medicine APIs


| Method | Endpoint | Description |
|---|---|---|
| POST | /api/items | Add Medicine |
| GET | /api/items/company/:companyId | Get Company Medicines |
| GET | /api/items/organization/:organizationId | Get Organization Medicines |
| DELETE | /api/items/:id | Delete Medicine |


---

# 📊 Database Relationship

Organization Collection

{
_id,
organizationName
}

Company Collection

{
_id,
organizationId,
companyName
}

Medicine Item Collection

{
_id,
companyId,
itemName,
type
}


---

# 🧪 Testing

API testing completed using:

- Postman


Tested:

✅ Create Organization

✅ Duplicate Organization Prevention

✅ Create Company

✅ Organization Wise Company Fetch

✅ Add Medicine

✅ Duplicate Medicine Prevention

✅ Company Wise Medicine Fetch

✅ Organization Wise Medicine Fetch

✅ Delete Operations


---

# 📌 Development Progress


## Backend

- [x] Project Setup
- [x] Database Configuration
- [x] Error Handling
- [x] Organization Module
- [x] Company Module
- [x] Medicine Module
- [x] API Testing


## Frontend

- [ ] React Setup
- [ ] Dashboard UI
- [ ] Medicine Management UI
- [ ] A4 Preview
- [ ] Print Engine


---

# Git Commit History

Current milestone:

feat: complete backend master data modules


---

# Future Improvements

- Authentication & Authorization
- Role Based Access Control
- Print Template Builder
- Import medicines from Excel
- Reports Dashboard
- Print History
- Multi Tenant SaaS Support


