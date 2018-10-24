import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
const applyPromotion = (promotion, basketItem) => ({
    promoPrice: "0",
    promoTotal: "0"
})

const RenderBasketRow = ({name, price, total, isPromo, hasPromo, classes}) => {
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

RenderBasketRow.defaultProps = {
    isPromo: false,
    hasPromo: false
};

RenderBasketRow.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
    isPromo: PropTypes.bool.isRequired,
    hasPromo: PropTypes.bool.isRequired
};

const ReceiptItem = ({ basketItem, classes }) => {
    return(
        <Fragment>
            <RenderBasketRow name={basketItem.productName} price={basketItem.price} total={basketItem.total} hasPromo={basketItem.promos.length > 0} key="regular" classes={classes}/>
            { basketItem.promos.length > 0 &&
                basketItem.promos.map((promo, index) => {
                    const { promoPrice, promoTotal } = applyPromotion(promo, basketItem);
                    return <RenderBasketRow name="Promo" price={promoPrice} total={promoTotal} isPromo={true} key={`promo${index}`}  classes={classes}/>
                })
            }
        </Fragment>

);
};

ReceiptItem.propTypes = {
    basketItem: PropTypes.object.isRequired
}

export default withStyles(styles)(ReceiptItem);





