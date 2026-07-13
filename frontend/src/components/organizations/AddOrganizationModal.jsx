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

import { createOrganization } from "../../api/organization.api";

function AddOrganizationModal({ open, onClose }) {
  const [organizationName, setOrganizationName] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createOrganization,

    onSuccess: () => {
      toast.success("Organization Added");

      queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });

      setOrganizationName("");

      onClose();
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = () => {
    if (!organizationName.trim()) {
      return toast.error("Organization name is required");
    }

    mutation.mutate({
      organizationName,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Organization</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Organization Name"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={mutation.isPending}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddOrganizationModal;
