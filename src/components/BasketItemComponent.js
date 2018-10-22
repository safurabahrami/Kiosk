import React, { Fragment } from 'react';
import { TableCell, TableRow} from '@material-ui/core';

const renderBasketRow = (name, price, total, isPromo) => {
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

const BasketItemComponent = ({basketItem}) => {
    return(
        <Fragment>
            { renderBasketRow(basketItem.product, basketItem.price, basketItem.total) }
            { basketItem.promos.length > 0 &&
                basketItem.promos.map((promo,i) => renderBasketRow(promo.promoType, promo.promoPrice, promo.promoTotal,i+1))
            }
        </Fragment>

);
}

export default BasketItemComponent ;





