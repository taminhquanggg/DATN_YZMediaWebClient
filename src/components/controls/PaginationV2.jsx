import React from "react";

import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PaginationV2 = ({
  totalPages,
  currentPage,
  totalRecord,
  recordOnPage,
  setRecordOnPage,
  searchData,
}) => {
  const paginationButtons = [];
  // Tạo danh sách các nút trang dựa trên số trang và trang hiện tại

  if (totalPages > 2 && currentPage > 1) {
    paginationButtons.push(
      <button key={0} onClick={() => searchData(currentPage - 1)}>
        <FontAwesomeIcon icon={faAngleLeft} color="#bfbfbf" />
      </button>
    );
  }
  for (let page = 1; page <= totalPages; page++) {
    paginationButtons.push(
      <button
        key={page}
        onClick={() => searchData(page)}
        className={currentPage === page ? "active" : ""}
      >
        {page}
      </button>
    );
  }
  if (totalPages > 2 && currentPage < totalPages) {
    paginationButtons.push(
      <button key={-1} onClick={() => searchData(currentPage + 1)}>
        <FontAwesomeIcon icon={faAngleRight} color="#bfbfbf" />
      </button>
    );
  }

  const onPageSizeChanged = (value) => {
    setRecordOnPage(value);
    searchData(1);
  };

  return (
    <div className="pagination flex flex-nowrap justify-between items-center pt-3 font-semibold">
      <div className="pagination__left">
        <div className="form-select">
          <span>Hiển thị &nbsp;</span>
          <select
            onChange={(e) => {
              onPageSizeChanged(e.target.value);
            }}
            id="page-size"
            className="form-control"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>&nbsp;{`/${totalRecord} bản ghi`}</span>
        </div>
      </div>
      <div className="pagination__right flex flex-nowrap justify-start gap-1">
        <button
          onClick={() => {
            searchData(1);
          }}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} color="#bfbfbf" />
        </button>

        {paginationButtons}
        <button
          onClick={() => {
            searchData(totalPages);
          }}
          id="btLast"
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} color="#bfbfbf" />
        </button>
      </div>
    </div>
  );
};

export default PaginationV2;
