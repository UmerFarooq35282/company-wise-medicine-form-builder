function PrintTable({ items = [] }) {
  return (
    <table className="print-table">
      <thead>
        <tr>
          <th style={{ width: "72%" }}>Medicine Item</th>
          <th style={{ width: "14%" }}>Bx Qty</th>
          <th style={{ width: "14%" }}>Ls Qty</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>{item.itemName}</td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PrintTable;
