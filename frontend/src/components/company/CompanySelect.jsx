import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";

import { getCompaniesByOrganization } from "../../api/company.api";

function CompanySelect({ organizationId, value, onChange }) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["companies", organizationId],
    queryFn: () => getCompaniesByOrganization(organizationId),
    enabled: !!organizationId,
  });

  return (
    <FormControl fullWidth disabled={!organizationId}>
      <InputLabel>Select Company</InputLabel>

      <Select
        value={value}
        label="Select Company"
        onChange={(e) => onChange(e.target.value)}
      >
        {isLoading && (
          <MenuItem disabled>
            <CircularProgress size={18} sx={{ mr: 1 }} />
            Loading...
          </MenuItem>
        )}

        {!isLoading &&
          data.map((company) => (
            <MenuItem key={company._id} value={company._id}>
              {company.companyName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default CompanySelect;
