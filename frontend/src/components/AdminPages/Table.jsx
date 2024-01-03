import React, { useState } from "react";
import Pagination from "./Pagination";

const Table = ({ data }) => {
  const headers = data ? Object.keys(data[0]) : null;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 10;

  const handlePage = (num) => {
    setCurrentPage(num);
  };

  const totalPages = Math.ceil(data.length / itemsOnPage);
  return (
    <>
      <div className="p-2">
        <div className="overflow-auto rounded-lg shadow mt-3">
          <table className="w-full border">
            <thead className="bg-[#BDD5EA] border-2">
              <tr className="p-2 text-sm font-semibold tracking-wide text-left">
                {headers &&
                  headers.map((header, index) => (
                    <th className="p-2" key={index}>
                      {header}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data
                  .slice(
                    (currentPage - 1) * itemsOnPage,
                    currentPage * itemsOnPage
                  )
                  .map((row, rowIndex) => {
                    return (
                      <tr
                        key={rowIndex}
                        className="p-2 bg-gray-300 border-2 text-left"
                      >
                        {Object.values(row).map((col, colIndex) => (
                          <td key={colIndex} className="p-2 text-sm">
                            {col}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          {data && data.length === 0 && (
            <div className="w-full flex items-center justify-center">
              No Item
            </div>
          )}
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        handlePage={handlePage}
        currentPage={currentPage}
      />
    </>
  );
};

export default Table;
