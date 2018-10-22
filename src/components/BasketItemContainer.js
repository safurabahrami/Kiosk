import { connect } from 'react-redux';
import BasketItemComponent from './BasketItemComponent';
import { getBasketItem } from '../redux/selectors';

// Calculate the price for each item in basket
// fetch the promos and calculate that

const mapStateToProps = (state,props) => ({
    basketItem: getBasketItem(state,props)
});
export default connect(mapStateToProps)(BasketItemComponent) ;