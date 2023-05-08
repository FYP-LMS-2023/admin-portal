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
import Switch from "@mui/material/Switch";
import { blockUser } from "../api/apis";

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
    id: "fullName",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "ERP",
    numeric: true,
    disablePadding: false,
    label: "ERP",
  },
  {
    id: "userType",
    numeric: true,
    disablePadding: false,
    label: "User Type",
  },
  {
    id: "deleteFlag",
    numeric: true,
    disablePadding: false,
    label: "Block Status",
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

export default function UsersTable({ blockStatus, setBlockStatus }) {
  // const [order, setOrder] = React.useState("asc");
  // const [orderBy, setOrderBy] = React.useState("calories");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  //eslint-disable-next-line
  const [state, setState] = React.useState({});
  //eslint-disable-next-line
  const [rows, setRows] = React.useState(
    JSON.parse(sessionStorage.getItem("Users"))
  );

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
      checked={props.row.deleteFlag}
      onChange={() => {
        handleBlock(props.row);
        props.row.deleteFlag = !props.row.deleteFlag;
        setState({});
      }}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#ff0000",
          opacity: 0.7,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const handleBlock = async (row) => {
    const response = await blockUser(row._id, !row.deleteFlag);

    if (response.status === 200) {
      //   sessionStorage.removeItem("Users");
      for (var i = 0; i < blockStatus.length; i++) {
        if (blockStatus[i].ERP === row.ERP) {
        }
      }
      //   window.location.reload();
      setState({});
    }
  };

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
                  <StyledTableRow key={row.ERP}>
                    <StyledTableCell component="th" scope="row">
                      {row.fullName}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">{row.ERP}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.userType}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {<IOSSwitch row={row} />}
                    </StyledTableCell>
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
