import { useState } from "react";

import Select from "react-select";

import { Button, Stack } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useQuery } from "@tanstack/react-query";

import { getCompaniesByOrganization } from "../../api/company.api";

import AddCompanyModal from "./AddCompanyModal";

function CompanySelect({ organizationId, value, onChange }) {
  const [open, setOpen] = useState(false);

  const { data = [] } = useQuery({
    queryKey: ["companies", organizationId],

    queryFn: () => getCompaniesByOrganization(organizationId),

    enabled: !!organizationId,
  });

  const options = data.map((company) => ({
    value: company._id,
    label: company.companyName,
  }));

  return (
    <>
      <Stack direction="row" spacing={2}>
        <div style={{ flex: 1 }}>
          <Select
            placeholder="Select Company"
            options={options}
            value={options.find((item) => item.value === value)}
            onChange={(selected) => onChange(selected.value)}
            isDisabled={!organizationId}
          />
        </div>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!organizationId}
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
      </Stack>

      <AddCompanyModal
        open={open}
        onClose={() => setOpen(false)}
        organizationId={organizationId}
      />
    </>
  );
}

export default CompanySelect;
