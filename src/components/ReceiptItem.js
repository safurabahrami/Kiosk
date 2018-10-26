import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TableCell, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { getBasketItem } from '../redux/selectors';
import { applyPromotion } from '../services/promotionService';

const styles = theme => ({
  promoCell: {
    paddingLeft: theme.spacing.unit * 6,
    borderBottom: 0,
  },
  simpleCell: {
    borderBottom: 0,
  },
  noBorderRow: {
    borderBottom: theme.borderBottom,
  },
  withBorderRow: {
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  },
});

const RenderReceiptRow = ({ name, priceNQuantity, total, isPromo, hasPromo, classes }) => (
  <TableRow className={hasPromo ? classes.noBorderRow : classes.withBorderRow}>
    <TableCell style={{ width: '54%' }} className={isPromo ? classes.promoCell : classes.simpleCell}>
      {name}
    </TableCell>
    <TableCell className={classes.simpleCell} numeric>{priceNQuantity}</TableCell>
    <TableCell className={classes.simpleCell} numeric>{total}</TableCell>
  </TableRow>
);

RenderReceiptRow.defaultProps = {
  isPromo: false,
  hasPromo: false,
};

RenderReceiptRow.propTypes = {
  name: PropTypes.string.isRequired,
  priceNQuantity: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  isPromo: PropTypes.bool.isRequired,
  hasPromo: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

const ReceiptItem = ({ basketItem, classes }) => {
  let afterPromotion;
  if (basketItem.promo) {
    afterPromotion = applyPromotion(basketItem.promo, basketItem);
  }

  return (
    <Fragment>
      <RenderReceiptRow name={basketItem.productName} priceNQuantity={`${basketItem.price.toString()} x ${basketItem.quantity}`} total={basketItem.total.toString()} hasPromo={basketItem.promo && !afterPromotion.promoTotal.isZero() ? true : false} key="regular" classes={classes} />
      { basketItem.promo
          && !afterPromotion.promoTotal.isZero()
          && <RenderReceiptRow
                name={afterPromotion.promoTitle}
                priceNQuantity={afterPromotion.promoPrice ? afterPromotion.promoPrice.toString() : ''}
                total={afterPromotion.promoTotal.toString()}
                isPromo={true} classes={classes}
              />
      }
    </Fragment>

  );
};

ReceiptItem.propTypes = {
  basketItem: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state, props) => ({
  basketItem: getBasketItem(state, props.productId),
});
export default connect(mapStateToProps)(withStyles(styles)(ReceiptItem));
