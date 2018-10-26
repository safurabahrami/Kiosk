import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { getBasketItems, getBasketSubTotalPrice, getTotalDiscount } from '../redux/selectors';

const RenderPriceRow = ({ title, value, noBorder }) => (
  <TableRow>
    <TableCell style={noBorder ? { borderBottom: '0px' } : {}}>{title}</TableCell>
    <TableCell style={noBorder ? { borderBottom: '0px' } : {}} numeric>{value}</TableCell>
  </TableRow>
);

RenderPriceRow.defaultProps = {
  noBorder: false,
};
RenderPriceRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  noBorder: PropTypes.bool.isRequired,
};

const styles = theme => ({
  root: {
    alignSelf: 'center',
    padding: theme.spacing.unit * 2,
    flex: '0 0 auto',
    height: '120px',
  },
});

const PriceBox = ({ classes, subTotalPrice, totalDiscount }) => {
  const total = subTotalPrice.add(totalDiscount);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          <RenderPriceRow title="Subtotal" value={subTotalPrice.toString()} noBorder={true} />
          <RenderPriceRow title="Discount" value={totalDiscount.toString()} />
        </TableBody>
      </Table>
      <Table className={classes.table}>
        <TableBody>
          <RenderPriceRow title="Total" value={total.toString()} />
        </TableBody>
      </Table>
    </Paper>
  );
};

PriceBox.propTypes = {
  basketItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
  subTotalPrice: PropTypes.object.isRequired,
  totalDiscount: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  basketItems: getBasketItems(state),
  subTotalPrice: getBasketSubTotalPrice(state),
  totalDiscount: getTotalDiscount(state),
});
export default connect(mapStateToProps)(withStyles(styles)(PriceBox));
