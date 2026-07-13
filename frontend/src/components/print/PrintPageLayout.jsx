import PrintHeader from "./PrintHeader";
import PrintTable from "./PrintTable";

function PrintPageLayout({ companyName, pageItems, pageNumber, totalPages }) {
  const left = pageItems.slice(0, 40);
  const right = pageItems.slice(40, 80);

  return (
    <div className="page">
      <PrintHeader
        companyName={companyName}
        pageNumber={pageNumber}
        totalPages={totalPages}
      />

      <div className="tables">
        <PrintTable items={left} />

        <PrintTable items={right} />
      </div>
    </div>
  );
}

export default PrintPageLayout;
