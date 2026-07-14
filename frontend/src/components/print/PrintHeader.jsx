function PrintHeader({
  organizationName,
  companyName,
  pageNumber,
  totalPages,
}) {
  return (
    <div className="print-header">
      <h2>{organizationName}</h2>

      {/* <h3>{companyName}</h3> */}

      <p>
        Page {pageNumber} / {totalPages}
      </p>
    </div>
  );
}

export default PrintHeader;
