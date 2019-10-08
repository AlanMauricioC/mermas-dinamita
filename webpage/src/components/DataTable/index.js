import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

//Columnas para el datatable
const headCells = [
    //El primero debería llamarse first pero si encuentras una forma mejor, adelante, carrasco o:
    { id: 'first', numeric: false,  paddingLeft:"5px", label: 'Insumo' },
    { id: 'thing2', numeric: true, disablePadding: false, label: 'cosa2' },
    { id: 'asd', numeric: true, disablePadding: false, label: 'asd' },
    { id: 'another', numeric: true, disablePadding: false, label: 'qwe' },
    { id: 'another2', numeric: true, disablePadding: false, label: 'qwe' },
    { id: 'actions', numeric: true, disablePadding: false, label: 'Acciones' },
];
//Datos para el datatable
const rows = [
    {
        first:'Insumo 1',
        thing2:'asd1',
        asd:'qwe',
        another:'uio',
        another2:'uio',
        actions: <div><EditIcon/><DeleteIcon/></div>
    },
    {
        first:'asd 1',
        thing2:'asd2',
        asd:'qwe',
        another:'uio',
        another2:'2uio',
        actions: <div><EditIcon/><DeleteIcon/></div>
    },
];

//Método para ordenar, no preguntes
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

//Se llena el encabezado
function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
        <TableRow>
            {headCells.map(headCell => (
            <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={createSortHandler(headCell.id)}
                >
                {headCell.label}
                {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                ) : null}
                </TableSortLabel>
            </TableCell>
            ))}
        </TableRow>
        </TableHead>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

//Se llena la tabla ordenándola por Insumo, alfabéticamente
export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('first');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <div className={classes.tableWrapper}>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size='small'
            >
                <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                />
                <TableBody>
                    {stableSort(rows, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {

                            //Se hacen las columnas saltando la primera
                            const columns = headCells.slice(1).map((headCell) =>
                                <TableCell align="right">{row[headCell.id]}</TableCell>
                            );

                        return (
                            <TableRow
                            hover
                            >
                                {/*Se coloca la primer columna que va a la izquierda y luego se pone 
                                "columns" para las demás*/}
                                <TableCell component="th" scope="row" paddingLeft="5px">
                                    {row.first}
                                </TableCell>
                                {columns}
                            </TableRow>
                        );
                        })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[10, 15, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        </div>
    );
}