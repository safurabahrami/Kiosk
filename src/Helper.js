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
		case PromotionTypes.GROUP_PROMOTIONAL_PRICE:
			return groupPromotion(promotion.payload, basketItem);
		case PromotionTypes.ADDITIONAL_PRODUCT_DISCOUNT:
            return additionalProductDiscount(promotion.payload, basketItem);
        default:
            return (
                {
                    promoPrice: "0",
					promoTotal: "0",
					promoTitle: "promo"
                }
            );
    }
}

const singleProductSale = (payload, basketItem) => {
	/*
		PayLoad for the SINGLE_PRODUCT_SALE promotion looks like this:
		product i with the sale price p
		{
			productId: i,
			salePrice: p
		}
	*/
	const promoTotal = toFixedPrecision(basketItem.total - (payload.salePrice * basketItem.quantity),2)
	const promoObject = {
		"promoPrice": `${payload.salePrice}`,
		"promoTotal": `-${promoTotal}`,
		"promoTitle": payload.title
	}
	return promoObject;
 
}

const groupPromotion = (payload, basketItem) => {
	/*
		PayLoad for the GROUP_PROMOTIONAL_PRICE promotion looks like this:
		buying q quantity of product i with the sale price p
		{
			"productId": i,
			"salePrice": p,
			"quantity": q
		}
	*/
	const basketQuantity = basketItem.quantity;
	let withSaleQuantity = Number.parseInt(basketQuantity / payload.quantity);
	let withOutSaleQuantity = basketQuantity % payload.quantity;
	let originPrice = basketItem.total / basketQuantity;
	let newPrice =  withSaleQuantity * payload.salePrice + originPrice * withOutSaleQuantity;
	const promoTotal = toFixedPrecision(basketItem.total - newPrice,2)
	const promoObject = {
		"promoPrice": "",
		"promoTotal": `-${promoTotal}`,
		"promoTitle": payload.title
	}
	return promoObject;
 
}

const additionalProductDiscount = (payload, basketItem) => {
	/*
		PayLoad for the ADDITIONAL_PRODUCT_DISCOUNT promotion looks like this:
		buying q quantity of product i get additional one p% discount
		{
			"productId": i,
			"quantity": q,
			"salePercentage": p
		}
	*/
	const basketQuantity = basketItem.quantity;
	let withSaleQuantity = Number.parseInt(basketQuantity / (payload.quantity + 1));
	let withoutSalePrice = basketItem.total / basketQuantity;
	let withSaleItemsPrice = withSaleQuantity * withoutSalePrice * (100 - payload.salePercentage) / 100;
	let withOutSaleQuantity = basketItem.quantity - withSaleQuantity;
	let withoutSaleItemsPrice = withoutSalePrice * withOutSaleQuantity;
	let newPrice =  withoutSaleItemsPrice + withSaleItemsPrice;
	const promoTotal = toFixedPrecision(basketItem.total - newPrice ,2)
	const promoObject = {
		"promoPrice": "",
		"promoTotal": `-${promoTotal}`,
		"promoTitle": payload.title
	}
	return promoObject;
 
}