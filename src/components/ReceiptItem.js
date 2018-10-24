import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { toFixedPrecision } from '../utilities';
import { applyPromotion } from '../promotionHelper';

const styles = theme => ({
    promoCell: {
        paddingLeft: theme.spacing.unit * 6,
        borderBottom: 0
    },
    simpleCell: {
        borderBottom: 0
    },
    noBorderRow: {
        borderBottom: theme.borderBottom
    },
    withBorderRow: {
        borderBottom: '1px solid rgba(224, 224, 224, 1)'
    }
  });

const RenderReceiptRow = ({name, price, total, isPromo, hasPromo, classes}) => {
    return (
        <TableRow className={hasPromo ? classes.noBorderRow : classes.withBorderRow} >
            <TableCell className={isPromo ? classes.promoCell : classes.simpleCell} scope="row">
                {name}
            </TableCell>
            <TableCell className={classes.simpleCell} numeric>{price}</TableCell>
            <TableCell className={classes.simpleCell} numeric>{total}</TableCell>
        </TableRow>
    )
}

RenderReceiptRow.defaultProps = {
    isPromo: false,
    hasPromo: false
};

RenderReceiptRow.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
    isPromo: PropTypes.bool.isRequired,
    hasPromo: PropTypes.bool.isRequired
};

const ReceiptItem = ({ basketItem, classes }) => {
    let afterPromotion;
    if ( basketItem.promo) {
        afterPromotion = applyPromotion(basketItem.promo, basketItem)
    }
    
    return(
        <Fragment>
            <RenderReceiptRow name={basketItem.productName} price={basketItem.price} total={basketItem.total} hasPromo={basketItem.promo ? true : false} key="regular" classes={classes}/>
            { basketItem.promo && afterPromotion.promoTotal !== `-${toFixedPrecision(0,2)}` &&
                <RenderReceiptRow name={afterPromotion.promoTitle || "Promo"} price={afterPromotion.promoPrice} total={afterPromotion.promoTotal} isPromo={true} classes={classes}/>
            }
        </Fragment>

);
};

ReceiptItem.propTypes = {
    basketItem: PropTypes.object.isRequired
}

export default withStyles(styles)(ReceiptItem);





