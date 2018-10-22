import React from 'react';
import { Table, TableBody, TableCell, TableRow} from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { toFixedPrecision } from '../util';

const renderPriceRow = (title,value, noBorder) => {
    return (
        <TableRow>
            <TableCell style={noBorder ? { borderBottom: '0px' } : {}}>{title}</TableCell>
            <TableCell style={noBorder ? { borderBottom: '0px' } : {}} numeric>{value}</TableCell>
        </TableRow>
    )
}
const calculateTotalPrice = (basketItems) => {
    if (basketItems && basketItems.length > 0) {
        return toFixedPrecision(basketItems.reduce((acc,item) => item.productItem.price * item.quantity  + acc,0),2);
    }
    return 0;
}
const styles = theme => ({
    root: {
        width: '70%',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        alignSelf: 'center',
        padding: theme.spacing.unit * 2
    },
})
const PriceBoxComponent = ({basketItems, inventory, classes}) => {
    const subTotal = calculateTotalPrice(basketItems);
    const discount = 0;
    const total = subTotal-discount;
    return(
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                { 
                    renderPriceRow("Subtotal", subTotal, 'noBorder') 
                }
                {
                    renderPriceRow("Discount", discount === 0 ? 0 : -discount )
                }
                </TableBody>
            </Table>
            <Table className={classes.table}>
                <TableBody>
                {
                    renderPriceRow("Total", total)
                }
                </TableBody>
            </Table>
        </Paper>

);
}

export default withStyles(styles)(PriceBoxComponent);