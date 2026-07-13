function PrintTable({ items = [] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Bx Qty</th>
          <th>Ls Qty</th>
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: 40 }).map((_, index) => {
          const item = items[index];

          return (
            <tr key={index}>
              <td>{item?.itemName || ""}</td>
              <td></td>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default PrintTable;
