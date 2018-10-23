import { connect } from 'react-redux';
import BasketItemComponent from './BasketItemComponent';
import { getBasketItem } from '../redux/selectors';

const mapStateToProps = (state,props) => ({
    basketItem: getBasketItem(state, props.productId)
});
export default connect(mapStateToProps)(BasketItemComponent) ;