import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow} from '@material-ui/core';

const RenderBasketRow = ({name, price, total, isPromo}) => {
    return (
        <TableRow key={isPromo ? `${isPromo}-${name}` : name}>
            <TableCell style={{ paddingRight: isPromo ? '5px' : '0px' }} component="th" scope="row">
                {name}
            </TableCell>
            <TableCell numeric>{price}</TableCell>
            <TableCell numeric>{total}</TableCell>
        </TableRow>
    )
}

RenderBasketRow.defaultProps = {
    isPromo: false
};

RenderBasketRow.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
    isPromo: PropTypes.bool.isRequired
};

const BasketItemComponent = ({basketItem}) => {
    return(
        <Fragment>
            <RenderBasketRow name={basketItem.productName} price={basketItem.price} total={basketItem.total} key="regular" />
            { basketItem.promos.length > 0 &&
                basketItem.promos.map((promo, index) => <RenderBasketRow name={promo.promoType} price={promo.promoPrice} total={promo.promoTotal} isPromo={true} key={`promo${index}`} />)
            }
        </Fragment>

);
};

BasketItemComponent.propTypes = {
    basketItem: PropTypes.object.isRequired
}

export default BasketItemComponent ;





