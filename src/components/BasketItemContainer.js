import { connect } from 'react-redux';
import ReceiptItem from './ReceiptItem';
import { getBasketItem } from '../redux/selectors';

const mapStateToProps = (state,props) => ({
    basketItem: getBasketItem(state, props.productId)
});
export default connect(mapStateToProps)(ReceiptItem) ;