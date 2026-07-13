import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import toast from "react-hot-toast";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getItemsByCompany, deleteItem } from "../../api/item.api";

function MedicineTable({ companyId }) {
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({
    queryKey: ["items", companyId],
    queryFn: () => getItemsByCompany(companyId),
    enabled: !!companyId,
  });

  const mutation = useMutation({
    mutationFn: deleteItem,

    onSuccess: () => {
      toast.success("Deleted");

      queryClient.invalidateQueries({
        queryKey: ["items", companyId],
      });
    },
  });

  return (
    <Paper sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell width={80}>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.itemName}</TableCell>

              <TableCell>{item.type}</TableCell>

              <TableCell>
                <IconButton
                  color="error"
                  onClick={() => mutation.mutate(item._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {!data.length && (
            <TableRow>
              <TableCell align="center" colSpan={3}>
                No medicines found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default MedicineTable;
