import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { Box, CircularProgress, Button, Typography } from "@mui/material";

import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { getCompanyById } from "../api/company.api";

import { getItemsByCompany } from "../api/item.api";

import paginateItems from "../utils/paginateItems";

import PrintPageLayout from "../components/print/PrintPageLayout";

import "../styles/print.css";

function PrintPage() {
  const { companyId } = useParams();

  const { data: company, isLoading: companyLoading } = useQuery({
    queryKey: ["company", companyId],

    queryFn: () => getCompanyById(companyId),

    enabled: !!companyId,
  });

  const { data: items = [], isLoading: itemLoading } = useQuery({
    queryKey: ["print-items", companyId],

    queryFn: () => getItemsByCompany(companyId),

    enabled: !!companyId,
  });

  const pages = paginateItems(items);

  useEffect(() => {
    if (company && items.length) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [company, items]);

  if (companyLoading || itemLoading) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!company) {
    toast.error("Company not found");

    return null;
  }

  if (!items.length) {
    return (
      <Box p={5} textAlign="center">
        <Typography variant="h6">No medicines found for printing.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box className="print-actions" textAlign="center" my={2}>
        <Button variant="contained" onClick={() => window.print()}>
          Print / Save PDF
        </Button>
      </Box>

      {pages.map((page, index) => (
        <PrintPageLayout
          key={index}
          companyName={company.companyName}
          pageItems={page}
          pageNumber={index + 1}
          totalPages={pages.length}
        />
      ))}
    </>
  );
}

export default PrintPage;
