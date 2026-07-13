import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCompany } from "../../api/company.api";

function AddCompanyModal({ open, onClose, organizationId }) {
  const [companyName, setCompanyName] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCompany,

    onSuccess: () => {
      toast.success("Company Added");

      queryClient.invalidateQueries({
        queryKey: ["companies", organizationId],
      });

      setCompanyName("");

      onClose();
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const handleSave = () => {
    if (!organizationId) return toast.error("Select Organization First");

    if (!companyName.trim()) return toast.error("Company Name Required");

    mutation.mutate({
      organizationId,
      companyName,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Company</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          disabled={mutation.isPending}
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCompanyModal;
