import PrintHeader from "./PrintHeader";
import PrintTable from "./PrintTable";

function PrintPageLayout({
  organizationName,
  companyName,
  pageItems,
  pageNumber,
  totalPages,
}) {
  const leftItems = pageItems.slice(0, 40);
  const rightItems = pageItems.slice(40, 80);

  return (
    <div className="page">
      <PrintHeader
        organizationName={organizationName}
        companyName={companyName}
        pageNumber={pageNumber}
        totalPages={totalPages}
      />

      <div className="tables">
        <PrintTable items={leftItems} />
        <PrintTable items={rightItems} />
      </div>
    </div>
  );
}

export default PrintPageLayout;
