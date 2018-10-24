import PromotionTypes from './types/PromotionTypes';

// Ref: https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
// Test in jsfiddle: http://jsfiddle.net/cCX5y/3/
export const toFixedPrecision = function(num, precision) {
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}

export const applyPromotion = (promotion, basketItem) => {
    switch(promotion.type){
        case PromotionTypes.SINGLE_PRODUCT_SALE:
            return singleProductSale(promotion.payload, basketItem);
        default:
            return (
                {
                    promoPrice: "0",
                    promoTotal: "0"
                }
            );
    }
}

const singleProductSale = (payload, basketItem) => {
	/*
		PayLoad for the SINGLE_PRODUCT_SALE promotion looks like this:
		{
			productId: #,
			salePrice: #
		}
	*/
	const promoTotal = toFixedPrecision(basketItem.total - (payload.salePrice * basketItem.quantity),2)
	const promoObject = {
		"promoPrice": `${payload.salePrice}`,
		"promoTotal": `-${promoTotal}`
	}
	return promoObject;
 
}

