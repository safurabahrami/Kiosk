import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableRow} from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { getBasketItems, getBasketSubTotalPrice, getTotalDiscount } from '../redux/selectors';

const renderPriceRow = (title,value, noBorder) => {
    return (
        <TableRow>
            <TableCell style={noBorder ? { borderBottom: '0px' } : {}}>{title}</TableCell>
            <TableCell style={noBorder ? { borderBottom: '0px' } : {}} numeric>{value}</TableCell>
        </TableRow>
    )
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
const PriceBoxComponent = ({basketItems, classes, subTotalPrice, totalDiscount}) => {
    const total = subTotalPrice - totalDiscount;
    return(
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                { 
                    renderPriceRow("Subtotal", subTotalPrice, 'noBorder') 
                }
                {
                    renderPriceRow("Discount", totalDiscount === 0 ? 0 : -totalDiscount )
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

const mapStateToProps = (state) => ({
    basketItems: getBasketItems(state),
    subTotalPrice: getBasketSubTotalPrice(state),
    totalDiscount: getTotalDiscount(state)
});
export default connect(mapStateToProps)(withStyles(styles)(PriceBoxComponent));