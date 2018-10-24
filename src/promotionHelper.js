import PromotionTypes from './types/PromotionTypes';
import { toFixedPrecision } from "./utilities";

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
					promoTitle: "Promo"
                }
            );
    }
}

const singleProductSale = (payload, basketItem) => {
	/*
		Product i with the sale price p
		PayLoad for the SINGLE_PRODUCT_SALE promotion looks like this:
		{
			productId: i,
			salePrice: p
		}
	*/
	const promoTotal = toFixedPrecision(basketItem.total - (payload.salePrice * basketItem.quantity),2)
	return {
		"promoPrice": `${payload.salePrice}`,
		"promoTotal": `-${promoTotal}`,
		"promoTitle": payload.title
	};
}

const groupPromotion = (payload, basketItem) => {
	/*
		Buying q quantity of product i with the sale price p
		PayLoad for the GROUP_PROMOTIONAL_PRICE promotion looks like this:
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
	return {
		"promoPrice": "",
		"promoTotal": `-${promoTotal}`,
		"promoTitle": payload.title
	};
}

const additionalProductDiscount = (payload, basketItem) => {
	/*
		Buying q quantity of product i get additional one p% discount
		PayLoad for the ADDITIONAL_PRODUCT_DISCOUNT promotion looks like this:
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
	return {
		"promoPrice": "",
		"promoTotal": `-${promoTotal}`,
		"promoTitle": payload.title
	}; 
}