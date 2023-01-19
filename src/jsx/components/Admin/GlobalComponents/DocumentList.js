import axios from "axios";
// import { format } from "date-fns";
import React, { useState, useRef, useEffect, useMemo, forwardRef } from "react";
import { Container, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  useTable,
  usePagination,
  useRowSelect,
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
} from "react-table";
import { matchSorter } from "match-sorter";
import swal from "sweetalert";
// import { Interweave, Markup } from "interweave";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}
// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  // const count = preFilteredRows.length;

  return (
    <input
      className="input-control w-100"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

const DataTable = ({ columns, data, setSelection }) => {
  const [excelBtn, setExcelBtn] = useState(false);
  const [jobTitle, setJobTitle] = useState("");

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter, filters },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!

    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        ...columns,
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              Action
              {/* <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} /> */}
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              {/* <label className="ml-3">View</label> */}
            </div>
          ),
        },
      ]);
    }
  );

  useEffect(() => {
    // Bubble up the selection to the parent component
    setSelection(selectedFlatRows.map((row) => row.original));
  }, [setSelection, selectedFlatRows]);

  useEffect(() => {
    if (filters.length > 0) {
      //This pop up the button to the column name is title
      let jobArr = filters.filter((obj) => obj.id === "title");
      if (jobArr.length > 0) {
        setExcelBtn(true);
        setJobTitle(jobArr[0].value);
        // swal(jobArr[0].value)
      } else {
        setExcelBtn(false);
        setJobTitle("");
      }
    } else {
      setExcelBtn(false);
      setJobTitle("");
    }
  }, [filters]);

  // Propt Excel download

  const getXcel = () => {
    const config = {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
        // responseType: "blob",
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/home/getexcel/${jobTitle}`,
        config
      )

      .then(function (response) {
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "candidate.xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();

        // if (response.status === 200) {
        //   const file = new Blob([response.data], { type: "application/pdf" });
        //   //Build a URL from the file
        //   const fileURL = URL.createObjectURL(file);
        //   //Open the URL on new Window
        //   const pdfWindow = window.open();
        //   pdfWindow.location.href = fileURL;

        //   // console.log(response.data);
        //   // window.open(response.data, '_blank', 'fullscreen=yes');
        //   // FileDownload(response.data, 'current_cv.pdf');
        // }
        // if(response.status === 404){
        //   alert(response.data.message);
        // }
      })
      .catch((err) => {
        // console.log({ err: err });
        swal("Oops!", err.data.message, "error");
      });
  };

  // Render the UI for your table
  const xcelBtn =
    excelBtn === true ? (
      <button className="btn btn-success " onClick={getXcel}>
        Get Excel
      </button>
    ) : (
      <button className="btn btn-success d-none">Get Excel</button>
    );

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        <div className="col-md-6 text-right">{xcelBtn}</div>
      </div>
      <div className="table-responsive">
        <table
          {...getTableProps()}
          id="example"
          className="display w-100 dataTable table table-responsive"
          role="grid"
          aria-describedby="example_info"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}

        <div className="d-flex justify-content-between">
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
            {""}
          </span>
          <span className="table-index">
            Go to page :{" "}
            <input
              type="number"
              className="ml-2"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
            />
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="table-index"
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <div className="filter-pagination  mt-3">
            <button
              className=" previous-button"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>

            <button
              className="previous-button"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </button>
            <button
              className="next-button"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
            <button
              className=" next-button"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
      {/* {JSON.stringify(filters, null, 2)} */}
    </>
  );
};

function DocumentList(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userDetails")).idToken
      }`,
    },
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/documents/employeedocuments`,
        config
      )
      .then((result) => {
        console.log(result.data);
        setData(result.data.documentList);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Document",
        accessor: "documentCode",
      },
      {
        Header: "Name",
        accessor: "documentName",
      },
      {
        Header: "Date",
        accessor: "dateTimeRead",
      },
      {
        Header: "Read",
        accessor: "read",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
  
      //   {
      //     Header: "Creation Date",
      //     accessor: "creationDate",
      //     Cell: ({ value }) => {
      //       return format(new Date(value), "MM/dd/yyyy");
      //     },
      //   },

    ],
    []
  );
  const [selection, setSelection] = useState([]);
  // const selectionCallback = React.useCallback((ids) => setSelection(ids), [
  //     setSelection,
  //   ]);
  if (selection.length === 1) {
    console.log(selection[0].documentCode);
    if (selection[0].documentCode !== undefined) {
      props.history.push("/document-display", [{ datum: selection }]);
    }
  }

  if (loading) {
    return (
      <>
        <Container>
          <div className="headerDiv"></div>
          {/* List */}
          <Row className="jobRow">
            <div id="preloader-home">
              <div className="sk-three-bounce"
              style={{ backgroundColor: "#f9f9f9" }}>
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <>
      <DataTable columns={columns} data={data} setSelection={setSelection} />
    </>
  );
}
export default withRouter(DocumentList);
