import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableRow} from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { getBasketItems, getBasketSubTotalPrice, getTotalDiscount } from '../redux/selectors';
import { toFixedPrecision } from '../helper';

const RenderPriceRow = ({title, value, noBorder}) => {
    return (
        <TableRow>
            <TableCell style={noBorder ? { borderBottom: '0px' } : {}}>{title}</TableCell>
            <TableCell style={noBorder ? { borderBottom: '0px' } : {}} numeric>{value}</TableCell>
        </TableRow>
    )
}

RenderPriceRow.defaultProps = {
    noBorder: false
};
RenderPriceRow.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    noBorder: PropTypes.bool.isRequired
};

const styles = theme => ({
    root: {
        width: '70%',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        alignSelf: 'center',
        padding: theme.spacing.unit * 2
    },
});

const PriceBox = ({classes, subTotalPrice, totalDiscount}) => {
    const total = toFixedPrecision(Number.parseFloat(subTotalPrice) + (Number.parseFloat(totalDiscount)), 2);
    return(
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                    <RenderPriceRow title="Subtotal" value={subTotalPrice} noBorder={true} />
                    <RenderPriceRow title="Discount" value={totalDiscount} />
                </TableBody>
            </Table>
            <Table className={classes.table}>
                <TableBody>
                    <RenderPriceRow title="Total" value={total} />
                </TableBody>
            </Table>
        </Paper>
    );
};

PriceBox.propTypes = {
    basketItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.object.isRequired,
    subTotalPrice: PropTypes.string.isRequired,
    totalDiscount: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    basketItems: getBasketItems(state),
    subTotalPrice: getBasketSubTotalPrice(state),
    totalDiscount: getTotalDiscount(state)
});
export default connect(mapStateToProps)(withStyles(styles)(PriceBox));