function PrintHeader({ companyName, pageNumber, totalPages }) {
  return (
    <div className="print-header">
      <h2>{companyName}</h2>

      <h3>Medicine Form</h3>

      <p>
        Page {pageNumber} of {totalPages}
      </p>
    </div>
  );
}

export default PrintHeader;
