import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import PreviewIcon from "@mui/icons-material/Preview";

import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import OrganizationSelect from "../organizations/OrganizationSelect";
import CompanySelect from "../company/CompanySelect";

import { createItem } from "../../api/item.api";

const MEDICINE_TYPES = [
  "TAB",
  "CAP",
  "SYP",
  "INJ",
  "SACHET",
  "CREAM",
  "GEL",
  "SOAP",
  "OINT",
  "SPRAY",
  "LOTION",
  "DROP",
];

function MedicineForm({
  organizationId,
  companyId,
  setOrganizationId,
  setCompanyId,
}) {
  const navigate = useNavigate();

  const [type, setType] = useState("TAB");
  const [itemName, setItemName] = useState("");

  const mutation = useMutation({
    mutationFn: createItem,

    onSuccess: () => {
      toast.success("Medicine added successfully");

      setItemName("");
      setType("TAB");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Unable to add medicine");
    },
  });

  const handleSubmit = () => {
    if (!organizationId) {
      return toast.error("Please select an organization.");
    }

    if (!companyId) {
      return toast.error("Please select a company.");
    }

    if (!itemName.trim()) {
      return toast.error("Medicine name is required.");
    }

    mutation.mutate({
      companyId,
      itemName,
      type,
    });
  };

  return (
    <Stack spacing={3}>
      {/* Organization */}

      <Box>
        <Typography mb={1} fontWeight={600}>
          Organization
        </Typography>

        <Stack direction="row" spacing={2}>
          <Box flex={1}>
            <OrganizationSelect
              value={organizationId}
              onChange={(value) => {
                setOrganizationId(value);
                setCompanyId("");
              }}
            />
          </Box>

          <Button variant="contained" startIcon={<AddIcon />}>
            Add
          </Button>
        </Stack>
      </Box>

      {/* Company */}

      <Box>
        <Typography mb={1} fontWeight={600}>
          Company
        </Typography>

        <Stack direction="row" spacing={2}>
          <Box flex={1}>
            <CompanySelect
              organizationId={organizationId}
              value={companyId}
              onChange={setCompanyId}
            />
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            disabled={!organizationId}
          >
            Add
          </Button>
        </Stack>
      </Box>

      {/* Medicine Type */}

      <FormControl fullWidth>
        <InputLabel>Medicine Type</InputLabel>

        <Select
          value={type}
          label="Medicine Type"
          onChange={(e) => setType(e.target.value)}
        >
          {MEDICINE_TYPES.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Medicine Name */}

      <TextField
        fullWidth
        label="Medicine Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      {/* Buttons */}

      <Stack spacing={2}>
        <Button
          size="large"
          variant="contained"
          onClick={handleSubmit}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Add Medicine"}
        </Button>

        <Button
          size="large"
          variant="outlined"
          startIcon={<PreviewIcon />}
          disabled={!organizationId}
          onClick={() => navigate(`/print/${organizationId}`)}
        >
          Preview Medicine Form
        </Button>
      </Stack>
    </Stack>
  );
}

export default MedicineForm;
