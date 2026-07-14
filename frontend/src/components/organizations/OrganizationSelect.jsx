import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";

import { getOrganizations } from "../../api/organization.api";

function OrganizationSelect({ value, onChange }) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });

  return (
    <FormControl fullWidth size="medium">
      <InputLabel>Select Organization</InputLabel>

      <Select
        value={value}
        label="Select Organization"
        onChange={(e) => onChange(e.target.value)}
      >
        {isLoading && (
          <MenuItem disabled>
            <CircularProgress size={18} sx={{ mr: 1 }} />
            Loading...
          </MenuItem>
        )}

        {!isLoading &&
          data.map((organization) => (
            <MenuItem key={organization._id} value={organization._id}>
              {organization.organizationName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default OrganizationSelect;
