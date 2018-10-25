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

export const singleProductSale = (payload, basketItem) => {
	/*
		Promotion with title t is for product i with the sale price of p 
		PayLoad for the SINGLE_PRODUCT_SALE promotion looks like this:
		{
			productId: i,
			salePrice: p,
			title: t
		}
	*/
	const promoTotal = toFixedPrecision(basketItem.total - (payload.salePrice * basketItem.quantity),2)
	return {
		"promoPrice": `${payload.salePrice}`,
		"promoTotal": `-${promoTotal}`,
		"promoTitle": payload.title
	};
}

export const groupPromotion = (payload, basketItem) => {
	/*
		Promotion with title t is for buying q quantity of product i with the sale price p
		PayLoad for the GROUP_PROMOTIONAL_PRICE promotion looks like this:
		{
			productId: i,
			salePrice: p,
			quantity: q,
			title: t
		}
	*/
	const basketQuantity = basketItem.quantity;
	const withSaleQuantity = Number.parseInt(basketQuantity / payload.quantity);
	const withOutSaleQuantity = basketQuantity % payload.quantity;
	const originPrice = basketItem.total / basketQuantity;
	const newPrice =  withSaleQuantity * payload.salePrice + originPrice * withOutSaleQuantity;
	const promoTotal = basketItem.total === newPrice ?
			toFixedPrecision(basketItem.total - newPrice,2):
			`-${toFixedPrecision(basketItem.total - newPrice,2)}`;
	return {
		"promoPrice": "",
		"promoTotal": promoTotal,
		"promoTitle": payload.title
	};
}

export const additionalProductDiscount = (payload, basketItem) => {
	/*
		Promotion with title t is for buying q quantity of product i get additional one p% discount
		PayLoad for the ADDITIONAL_PRODUCT_DISCOUNT promotion looks like this:
		{
			productId: i,
			quantity: q,
			salePercentage: p,
			title: t
		}
	*/
	const basketQuantity = basketItem.quantity;
	const withSaleQuantity = Number.parseInt(basketQuantity / (payload.quantity + 1));
	const withoutSalePrice = basketItem.total / basketQuantity;
	const withSaleItemsPrice = withSaleQuantity * withoutSalePrice * (100 - payload.salePercentage) / 100;
	const withOutSaleQuantity = basketItem.quantity - withSaleQuantity;
	const withoutSaleItemsPrice = withoutSalePrice * withOutSaleQuantity;
	const newPrice =  withoutSaleItemsPrice + withSaleItemsPrice;
	const promoTotal = basketItem.total === newPrice ?
			toFixedPrecision(basketItem.total - newPrice,2) :
			`-${toFixedPrecision(basketItem.total - newPrice,2)}`;
	return {
		"promoPrice": "",
		"promoTotal": promoTotal,
		"promoTitle": payload.title
	}; 
}