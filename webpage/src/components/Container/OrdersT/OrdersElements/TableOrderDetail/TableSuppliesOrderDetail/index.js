import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
}));

export default function TableSuppliesOrderDetail({orderRecipe}) {
    const classes = useStyles();

    if(orderRecipe.idRecipe) return(
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                            <TableCell>Insumo</TableCell>
                            <TableCell align="right">Cantidad</TableCell>
                            </TableRow>
                        </TableHead>
                    <TableBody>
                        {orderRecipe.supplies.map(supply => (
                            <TableRow key={supply.idSupply}>
                                <TableCell component="th" scope="row">
                                    {supply.nameSupply}
                                </TableCell>
                                <TableCell align="right">
                                    {supply.quantitySupply}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    else
        return(
            <div>
                asd
            </div>
        );
    
}