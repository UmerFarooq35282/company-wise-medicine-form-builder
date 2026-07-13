import { useState } from "react";
import { Grid, TextField, Button, MenuItem } from "@mui/material";

import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createItem } from "../../api/item.api";

const types = ["TAB", "SYP", "INJ"];

function MedicineForm({ companyId }) {
  const queryClient = useQueryClient();

  const [itemName, setItemName] = useState("");
  const [type, setType] = useState("TAB");

  const mutation = useMutation({
    mutationFn: createItem,

    onSuccess: () => {
      toast.success("Medicine Added");

      queryClient.invalidateQueries({
        queryKey: ["items", companyId],
      });

      setItemName("");
      setType("TAB");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed");
    },
  });

  const handleSubmit = () => {
    if (!companyId) return toast.error("Select Company");

    if (!itemName.trim()) return toast.error("Medicine Name Required");

    mutation.mutate({
      companyId,
      itemName,
      type,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Medicine Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          select
          fullWidth
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {types.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} md={3}>
        <Button
          fullWidth
          variant="contained"
          sx={{ height: "56px" }}
          onClick={handleSubmit}
          disabled={mutation.isPending}
        >
          Add Item
        </Button>
      </Grid>
    </Grid>
  );
}

export default MedicineForm;
