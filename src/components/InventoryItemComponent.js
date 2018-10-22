import React from 'react';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getItemBasketByProduct, getProductInventory } from '../redux/selectors';
import * as Actions from '../redux/actionCreators/Actions'

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

const generateKey = index => (`key${index}`);

class InventoryItemComponent extends React.Component {
    state = {
        quantity: 1
    }
    validateAdd = (quantity, basketItem, productInventory) => {
        if (!quantity || Number.parseInt(quantity) === 0
            || (basketItem &&  Number.parseInt(quantity) +  Number.parseInt(basketItem.quantity) > productInventory)
            || (quantity > productInventory)){
            return true;
        }
        return false;
    };
    validateItemInBasket = (quantity, basketItemQuantity) => {
        const enoughItemInBasket = quantity > 0 && basketItemQuantity >= quantity;
        return enoughItemInBasket;
    };
    validateRemove = (quantity, basketItem) => {
        if (!quantity || !basketItem || !this.validateItemInBasket(quantity,basketItem.quantity)){
            return true;
        }
        return false;
    };
    handleChange = event => {
        this.setState({
            quantity: event.target.value,
            helperText: ""
        });
    };
    onClickAddToBasket = (product, quantity, basketItem) => {
        const { updateBasket, addToBasket } = this.props;
        if (basketItem) {
            // update the basketItem by new quantity
            updateBasket(basketItem, quantity)
        } else {
            // Add new basketItem
            addToBasket(product, quantity)
        }
        
    }
    onClickRemoveFromBasket= (basketItem, quantity) => {
        const { updateBasket, removeFromBasket } = this.props;

        if (basketItem.quantity == quantity){
            removeFromBasket(basketItem)
        }
        updateBasket(basketItem, quantity, "DECR")
    };
    calcRemainNumberInventory = (productInventory, basketItem) => {
        if (basketItem && productInventory){
            return  Number.parseInt(productInventory) -  Number.parseInt(basketItem.quantity)
        }
        return productInventory || 0;
    }
    render(){
        const { product, classes, basketItem, productInventory } = this.props;
        const { quantity, helperText } = this.state;
        const remainedNumberInventory = this.calcRemainNumberInventory(productInventory, basketItem);
        return(
            <div className={classes.root} key={generateKey(product.id)}>
                
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
                        if (event.target.value >= 0 && event.target.value <= remainedNumberInventory){
                            this.setState({helperText: ""})
                            return this.handleChange(event)
                        }
                        return this.setState({helperText: `Only ${remainedNumberInventory} items are remained`})
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ minWidth: '180px' }}
                    disabled={this.validateAdd(quantity, basketItem, productInventory)}
                    onClick={() => this.onClickAddToBasket(product, quantity, basketItem)}
                >Add
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ minWidth: '180px' }}
                    disabled={this.validateRemove(quantity, basketItem)}
                    onClick={() => this.onClickRemoveFromBasket(basketItem, quantity)}
                >Remove
                </Button>  
            </div>
        );
      }    
}

const mapStateToProps = (state,props) => ({
    basketItem: getItemBasketByProduct(state,props.product),
    productInventory: getProductInventory(state, props.product)
});
const mapDispatchToProps = dispatch => ({
    addToBasket: (product, quantity) => dispatch(Actions.addToBasket(product, quantity)),
    updateBasket: (basketItem, quantity, decr) => dispatch(Actions.updateBasket(basketItem, quantity, decr)),
    removeFromBasket: (basketItem) => dispatch(Actions.removeFromBasket(basketItem)),
});
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(InventoryItemComponent));