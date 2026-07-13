import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getItemsByCompany, deleteItem } from "../../api/item.api";

function MedicineTable({ companyId }) {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["items", companyId],
    queryFn: () => getItemsByCompany(companyId),
    enabled: !!companyId,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,

    onSuccess: () => {
      toast.success("Medicine deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["items", companyId],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete medicine.",
      );
    },
  });

  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={700}>
          Medicine List
        </Typography>

        <Button
          component={Link}
          to={`/print/${companyId}`}
          variant="contained"
          startIcon={<VisibilityIcon />}
          disabled={!companyId}
        >
          Preview
        </Button>
      </Box>

      {isLoading && (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Typography color="error" align="center">
          Failed to load medicines.
        </Typography>
      )}

      {!isLoading && !isError && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Medicine Name</TableCell>

                <TableCell width={120} sx={{ fontWeight: 700 }}>
                  Type
                </TableCell>

                <TableCell width={100} align="center" sx={{ fontWeight: 700 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.length > 0 ? (
                data.map((item) => (
                  <TableRow hover key={item._id}>
                    <TableCell>{item.itemName}</TableCell>

                    <TableCell>{item.type}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => deleteMutation.mutate(item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
                    No medicines available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default MedicineTable;
