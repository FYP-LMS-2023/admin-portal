import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import PropTypes from "prop-types";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const headCells = [
  {
    id: "semesterName",
    numeric: false,
    disablePadding: false,
    label: "Semester Code",
  },
  {
    id: "semesterStartDate",
    numeric: true,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "semesterEndDate",
    numeric: true,
    disablePadding: false,
    label: "End Date",
  },
];

// var rows = JSON.parse(sessionStorage.getItem("Users"));

function EnhancedTableHead(props) {
  // const {  onRequestSort } = props;
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={
              headCell.numeric
                ? headCell.label === "Block Status"
                  ? "center"
                  : "right"
                : "left"
            }
            padding={headCell.disablePadding ? "none" : "normal"}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
            // active={orderBy === headCell.id}
            // direction={orderBy === headCell.id ? order : "asc"}
            // onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null} */}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  // onRequestSort: PropTypes.func.isRequired,
  // order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  // orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function SemesterTable({ blockStatus, setBlockStatus }) {
  // const [order, setOrder] = React.useState("asc");
  // const [orderBy, setOrderBy] = React.useState("calories");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  //eslint-disable-next-line
  const [state, setState] = React.useState({});
  //eslint-disable-next-line
  const [rows, setRows] = React.useState(
    JSON.parse(sessionStorage.getItem("Semesters"))
  );

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(() => {
    if (rows)
      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rows, rowsPerPage]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {!rows ? (
        <>
          {" "}
          <h1>Loading</h1>
        </>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ height: "100%", width: "75%", marginTop: "2%" }}
        >
          <Table sx={{ minWidth: 300 }} aria-label="customized table">
            <EnhancedTableHead
              // order={order}
              // orderBy={orderBy}
              // onRequestSort={handleRequestSort}
              rowCount={rows.length}
            ></EnhancedTableHead>
            <TableBody>
              {rows ? (
                visibleRows.map((row) => (
                  <StyledTableRow key={row.semesterName}>
                    <StyledTableCell component="th" scope="row">
                      {row.semesterName}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.semesterStartDate}</StyledTableCell>
                    <StyledTableCell align="right">{row.semesterEndDate}</StyledTableCell>
                    
                  </StyledTableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </>
  );
}
