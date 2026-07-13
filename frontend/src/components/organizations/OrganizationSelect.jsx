import { useState } from "react";

import Select from "react-select";

import { Button, Stack } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useQuery } from "@tanstack/react-query";

import { getOrganizations } from "../../api/organization.api";

import PageLoader from "../common/PageLoader";

import AddOrganizationModal from "./AddOrganizationModal";

function OrganizationSelect({
  value,

  onChange,
}) {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["organizations"],

    queryFn: getOrganizations,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  const options = data.map((org) => ({
    value: org._id,

    label: org.organizationName,
  }));

  return (
    <>
      <Stack direction="row" spacing={2} mb={2}>
        <div style={{ flex: 1 }}>
          <Select
            options={options}
            value={options.find((item) => item.value === value)}
            onChange={(selected) => {
              onChange(selected.value);
            }}
            placeholder="Select Organization"
          />
        </div>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
      </Stack>

      <AddOrganizationModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default OrganizationSelect;
