import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getCompanyById } from "../api/company.api";

import { getItemsByCompany } from "../api/item.api";

import "../styles/print.css";

function PrintPage() {
  const { companyId } = useParams();

  const { data: company } = useQuery({
    queryKey: ["company", companyId],

    queryFn: () => getCompanyById(companyId),
  });

  const { data: items = [] } = useQuery({
    queryKey: ["print", companyId],

    queryFn: () => getItemsByCompany(companyId),
  });

  const pages = [];

  for (let i = 0; i < items.length; i += 80) {
    pages.push(items.slice(i, i + 80));
  }

  useEffect(() => {
    if (company) {
      setTimeout(() => {
        window.print();
      }, 400);
    }
  }, [company]);

  return (
    <>
      <button className="print-btn" onClick={() => window.print()}>
        Print
      </button>

      {pages.map((page, index) => {
        const left = page.slice(0, 40);

        const right = page.slice(40, 80);

        return (
          <div key={index} className="page">
            <h2>{company?.companyName}</h2>

            <h3>Medicine Form</h3>

            <div className="tables">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>

                    <th>Bx</th>

                    <th>Ls</th>
                  </tr>
                </thead>

                <tbody>
                  {left.map((item) => (
                    <tr key={item._id}>
                      <td>{item.itemName}</td>

                      <td></td>

                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table>
                <thead>
                  <tr>
                    <th>Item</th>

                    <th>Bx</th>

                    <th>Ls</th>
                  </tr>
                </thead>

                <tbody>
                  {right.map((item) => (
                    <tr key={item._id}>
                      <td>{item.itemName}</td>

                      <td></td>

                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PrintPage;
