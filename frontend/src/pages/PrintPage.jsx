import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, CircularProgress, Button, Typography } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import html2pdf from "html2pdf.js";

import { getItemsByOrganization } from "../api/item.api";

import paginateItems from "../utils/paginateItems";

import PrintPageLayout from "../components/print/PrintPageLayout";

import "../styles/print.css";

function PrintPage() {
  const { organizationId } = useParams();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["organization-items", organizationId],
    queryFn: () => getItemsByOrganization(organizationId),
    enabled: !!organizationId,
  });

  console.log(items);
  // Group medicines by company
  const groupedItems = items.reduce((acc, item) => {
    const companyName = item.companyId?.companyName || "Unknown Company";

    if (!acc[companyName]) {
      acc[companyName] = [];
    }

    acc[companyName].push(item);

    return acc;
  }, {});

  const downloadPDF = () => {
    const element = document.body;

    html2pdf()
      .set({
        margin: 5,
        filename: "Medicine-Form.pdf",
        image: {
          type: "jpeg",
          quality: 1,
        },
        html2canvas: {
          scale: 2,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(element)
      .save();
  };

  useEffect(() => {
    if (items.length) {
      const timer = setTimeout(() => {
        window.print();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [items]);

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!items.length) {
    return (
      <Box p={5} textAlign="center">
        <Typography variant="h6">No medicines found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box className="print-actions" textAlign="center" my={2}>
        <Button variant="outlined" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Box>

      {Object.entries(groupedItems).map(([companyName, medicines]) => {
        const pages = paginateItems(medicines);

        return pages.map((page, index) => (
          <PrintPageLayout
            key={`${companyName}-${index}`}
            organizationName=""
            companyName={companyName}
            pageItems={page}
            pageNumber={index + 1}
            totalPages={pages.length}
          />
        ));
      })}
    </>
  );
}

export default PrintPage;
