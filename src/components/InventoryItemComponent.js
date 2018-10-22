import React from 'react';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getItemBasketByProductId, getProductById, getProductInventoryByProductId } from '../redux/selectors';
import * as Actions from '../redux/actionCreators/Actions'
import { validateAdd, validateRemove} from './InventoryComponentItemHelper'

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
                        if (event.target.value >= 0 && (event.target.value <= remainedNumberInventory || event.target.value <= basketItem.quantity)){
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
                    onClick={() => this.onClickAddToBasket(product, quantity, basketItem)}
                >Add
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ minWidth: '180px' }}
                    disabled={validateRemove(quantity, basketItem)}
                    onClick={() => this.onClickRemoveFromBasket(basketItem, quantity)}
                >Remove
                </Button>  
            </div>
        );
      }    
}

const mapStateToProps = (state,props) => ({
    basketItem: getItemBasketByProductId(state,props.productId),
    product: getProductById(state, props.productId),
    inventoryQuantity: getProductInventoryByProductId(state, props.productId)
});
const mapDispatchToProps = dispatch => ({
    addToBasket: (product, quantity) => dispatch(Actions.addToBasket(product, quantity)),
    updateBasket: (basketItem, quantity, decr) => dispatch(Actions.updateBasket(basketItem, quantity, decr)),
    removeFromBasket: (basketItem) => dispatch(Actions.removeFromBasket(basketItem)),
});
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(InventoryItemComponent));