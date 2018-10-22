import React from 'react';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getItemBasketByProduct } from '../redux/selectors';

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
        quantity: 0
    }
    validateItemInBasket = (quantity, basketItemQuantity) => {
        return quantity > 0 && basketItemQuantity >= quantity
    }
    validateRemove = (quantity, basketItem) => {
        if (!quantity || !basketItem || !this.validateItemInBasket(quantity,basketItem.quantity)){
            return true;
        }
        return false;
    }
    handleChange = event => {
        this.setState({
            quantity: event.target.value,
        });
    };
    render(){
        const { product, classes, basketItem } = this.props;
        const { quantity } = this.state;
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
                    onChange={event => { if (event.target.value >= 0 ) return this.handleChange(event)}}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ minWidth: '180px' }}
                >Add
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ minWidth: '180px' }}
                    disabled={this.validateRemove(quantity, basketItem)}
                >Remove
                </Button>  
            </div>
        );
      }    
}

const mapStateToProps = (state,props) => ({
    basketItem: getItemBasketByProduct(state,props.product)
});

export default connect(mapStateToProps)(withStyles(styles)(InventoryItemComponent));