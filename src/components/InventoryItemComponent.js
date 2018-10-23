import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getItemBasketByProductId, getProductById, getProductInventoryByProductId } from '../redux/selectors';
import * as Actions from '../redux/actionCreators/Actions'
import { validateAdd, validateRemove} from './BasketControlHelper'

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    margin: {
      margin: theme.spacing.unit,
    },
    withoutLabel: {
      marginTop: theme.spacing.unit * 3,
    },
    textField: {
      flexBasis: 110,
    },
    productTitle: {
        width: '25%',
        textAlign: 'left'
    }
  });


class InventoryItemComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: 1,
            helperText: ""
        }
    }

    handleChange = event => {
        this.setState({
            quantity: event.target.value,
            helperText: ""
        });
    };
    onClickAddToBasket = (basketItem, productId, quantity) => {
        const { updateBasket } = this.props;
        updateBasket(basketItem, productId, quantity);

    }
    onClickRemoveFromBasket= (basketItem, productId, quantity) => {
        const { updateBasket } = this.props;
        updateBasket(basketItem, productId, quantity, "DECR")
    };
    calcRemainNumberInventory = (inventoryQuantity, basketItem) => {
        if (basketItem && inventoryQuantity){
            return  Number.parseInt(inventoryQuantity) -  Number.parseInt(basketItem.quantity)
        }
        return inventoryQuantity || 0;
    }
    render(){
        const { productId, classes, basketItem, inventoryQuantity, product } = this.props;
        const { quantity, helperText } = this.state;
        const remainedNumberInventory = this.calcRemainNumberInventory(inventoryQuantity, basketItem);
        return(
            <div className={classes.root} key={productId}>
                
                <Typography variant="subtitle1" className={classes.productTitle}>
                    {product.name}(s)
                </Typography>
                <TextField
                    id="with-adornment"
                    placeholder="QUANTITY"
                    className={classNames(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">#</InputAdornment>,
                    }}
                    type="number"
                    value={quantity}
                    helperText={helperText}
                    onChange={event => { 
                        if (event.target.value >= 0 && (event.target.value <= remainedNumberInventory
                            || (basketItem && event.target.value <= basketItem.quantity))
                        ){
                            this.setState({helperText: ""})
                            return this.handleChange(event)
                        }
                        return this.setState({helperText: `Only ${remainedNumberInventory} items can be added`})
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ minWidth: '180px' }}
                    disabled={validateAdd(quantity, basketItem, inventoryQuantity)}
                    onClick={() => this.onClickAddToBasket(basketItem, productId, quantity)}
                >Add
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ minWidth: '180px' }}
                    disabled={validateRemove(quantity, basketItem)}
                    onClick={() => this.onClickRemoveFromBasket(basketItem, productId, quantity)}
                >Remove
                </Button>  
            </div>
        );
      }    
}

InventoryItemComponent.propTypes = {
    basketItem: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    inventoryQuantity: PropTypes.number.isRequired,
    updateBasket: PropTypes.func.isRequired
};

const mapStateToProps = (state,props) => ({
    basketItem: getItemBasketByProductId(state, props.productId),
    product: getProductById(state, props.productId),
    inventoryQuantity: getProductInventoryByProductId(state, props.productId)
});
const mapDispatchToProps = dispatch => ({
    updateBasket: (basketItem, productId, quantity, decr) => dispatch(Actions.updateBasket(basketItem, productId, quantity, decr)),
});
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(InventoryItemComponent));