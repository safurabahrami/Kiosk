import PromotionTypes from '../types/PromotionTypes';
import Money from '../Money';

export const applyPromotion = (promotion, basketItem) => {
  switch (promotion.type) {
    case PromotionTypes.SINGLE_PRODUCT_SALE:
      return singleProductSale(promotion.payload, basketItem);
    case PromotionTypes.GROUP_PROMOTIONAL_PRICE:
      return groupPromotion(promotion.payload, basketItem);
    case PromotionTypes.ADDITIONAL_PRODUCT_DISCOUNT:
      return additionalProductDiscount(promotion.payload, basketItem);
    default:
      return (
        {
          promoPrice: Money.fromNumber(0.00),
          promoTotal: Money.fromNumber(0.00),
          promoTitle: 'Promo',
        }
      );
  }
};

export const singleProductSale = (payload, basketItem) => {
  /**
   * Promotion with title t is for product i with the sale price of p
   * PayLoad for the SINGLE_PRODUCT_SALE promotion looks like this:
   * {
   *   productId: i,
   *   salePrice: p,
   *   title: t
   * }
   */
  const salePrice = Money.fromNumber(payload.salePrice);
  const promoTotal = basketItem.total.subtract(salePrice.multiply(basketItem.quantity));
  return {
    promoPrice: salePrice,
    promoTotal: promoTotal.multiply(-1),
    promoTitle: payload.title,
  };
};

export const groupPromotion = (payload, basketItem) => {
  /**
   * Promotion with title t is for buying q quantity of product i with the sale price p
   * PayLoad for the GROUP_PROMOTIONAL_PRICE promotion looks like this:
   * {
   *   productId: i,
   *   salePrice: p,
   *   quantity: q,
   *   title: t
   * }
   */
  const salePrice = Money.fromNumber(payload.salePrice);
  const basketQuantity = basketItem.quantity;
  const withSaleQuantity = Number.parseInt(basketQuantity / payload.quantity, 10);
  const withOutSaleQuantity = basketQuantity % payload.quantity;
  const originPrice = basketItem.total.divide(basketQuantity);
  const newPrice = salePrice.multiply(withSaleQuantity).add(originPrice.multiply(withOutSaleQuantity));
  const promoTotal = basketItem.total.subtract(newPrice);
  return {
    promoPrice: null,
    promoTotal: promoTotal.multiply(-1),
    promoTitle: payload.title,
  };
};

export const additionalProductDiscount = (payload, basketItem) => {
  /**
   * Promotion with title t is for buying q quantity of product i get additional one p% discount
   * PayLoad for the ADDITIONAL_PRODUCT_DISCOUNT promotion looks like this:
   * {
   *   productId: i,
   *   quantity: q,
   *   salePercentage: p,
   *   title: t
   * }
   */
  const basketQuantity = basketItem.quantity;
  const withSaleQuantity = Number.parseInt(basketQuantity / (payload.quantity + 1), 10);
  const originPrice = basketItem.total.divide(basketQuantity);
  const withSaleItemsPrice = originPrice.multiply(withSaleQuantity).multiply((100 - payload.salePercentage) / 100);
  const withOutSaleQuantity = basketItem.quantity - withSaleQuantity;
  const withoutSaleItemsPrice = originPrice.multiply(withOutSaleQuantity);
  const newPrice = withoutSaleItemsPrice.add(withSaleItemsPrice);
  const promoTotal = basketItem.total.subtract(newPrice);
  return {
    promoPrice: null,
    promoTotal: promoTotal.multiply(-1),
    promoTitle: payload.title,
  };
};
