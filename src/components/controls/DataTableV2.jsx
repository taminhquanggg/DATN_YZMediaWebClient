import React, { useEffect, useState, useRef, useImperativeHandle, useMemo } from "react";

import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { useLocation } from "react-router-dom";
import { ObjectValueToKeySearch } from "../../utils/commonFunction";
import PaginationV2 from "./PaginationV2";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const DataTableV2 = React.forwardRef(
  (
    {
      SearchData,
      columns = [],
      havePaging = true,
      style = { height: "calc(100vh - 380px)", width: "100%" },
    },
    ref
  ) => {
    const gridRef = useRef();

    const location = useLocation();

    const containerStyle = useMemo(
      () => ({ width: "100%", height: "100%", position: "relative" }),
      []
    );
    const gridStyle = useMemo(() => style, []);

    // Set row data
    const columnDefs = useMemo(() => columns, [columns]);

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecord, setTotalRecord] = useState(0);
    const [recordOnPage, setRecordOnPage] = useState(10);
    var keySearch = "";

    const defaultColDef = useMemo(() => ({
      editable: false,
      sortable: true,
      filter: false,
      resizable: true,
    }));

    useImperativeHandle(ref, () => ({
      onEvent: (data) => {
        if (data.type === "REFRESH_FORM") {
          searchData(1);
        } else if (data.type === "HANDLE_SEARCH") {
          // keySearch = data.data;
          keySearch = ObjectValueToKeySearch(data?.data);
          searchData(1);
          return;
        }
      },
    }));

    useEffect(() => {
      searchData(1);
    }, [recordOnPage]);

    // get data
    const searchData = (curentPage) => {
      // Hiển thị overlay loading
      gridRef.current.api?.showLoadingOverlay();

      // refresh table
      gridRef.current.api?.setRowData([]);

      // gọi api
      let fromRecord = recordOnPage * (curentPage - 1) + 1;
      
      setCurrentPage(curentPage);

      if (SearchData != undefined) {
        SearchData(keySearch, fromRecord, recordOnPage)
          .then((data) => {
            if (data && data.jsondata) {
              const _lst = JSON.parse(data.jsondata);

              setTotalRecord(data.totalrows);
              setTotalPages(Math.ceil(data.totalrows / recordOnPage));
              // set row data
              gridRef.current.api.setRowData(_lst);

              gridRef.current.api.sizeColumnsToFit({
                defaultMinWidth: 100,
                columnLimits: [],
              });
            }
          })
          .catch(function (err) {
            console.log(err);
          })
          .finally(() => {
            // Ẩn overlay loading
            gridRef?.current?.api?.hideOverlay();
          });
      }
    };

    const onGridReady = (params) => {
      params.api.sizeColumnsToFit();
    };

    return (
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-quartz">
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            paginationPageSize={10}
            rowSelection={"single"}
            multiSortKey={"ctrl"}
            className="ag-grid-fullwidth"
            pagination={false}
            onGridReady={onGridReady}
            overlayLoadingTemplate="<span class='ag-overlay-loading-center'>Đang tải...</span>"
            overlayNoRowsTemplate="<span class='ag-overlay-loading-center'>Không có dữ liệu</span>"
          />
        </div>
        {/* Custom pagination */}
        {havePaging ? (
          <div className="ag-footer">
            <PaginationV2
              totalPages={totalPages}
              currentPage={currentPage}
              totalRecord={totalRecord}
              recordOnPage={recordOnPage}
              setRecordOnPage={setRecordOnPage}
              searchData={searchData}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
);

export default DataTableV2;
