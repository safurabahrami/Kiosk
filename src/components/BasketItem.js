import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { getBasketItemByProductId, getProductById, getProductInventoryByProductId } from '../redux/selectors';
import * as Actions from '../redux/actionCreators/Actions';
import { validateAdd, validateRemove } from './BasketControlHelper';
import { view_width } from '../style/style';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 60,
  },
  productTitle: {
    width: '40%',
    textAlign: 'left',
  },
  button: {
    margin: theme.spacing.unit,
    width: view_width(3),
    height: view_width(3),
  },
});


class BasketItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      helperText: '',
    };
  }

    handleChange = (value) => {
      this.setState({
        quantity: value,
      });
    };

    onClickAddToBasket = (basketItem, productId, quantity) => {
      const { updateBasket } = this.props;
      updateBasket(basketItem, productId, quantity);
    }

    onClickRemoveFromBasket= (basketItem, productId, quantity) => {
      const { updateBasket } = this.props;
      updateBasket(basketItem, productId, quantity, 'DECR');
    };

    calcRemainNumberInventory = (inventoryQuantity, basketItem) => {
      if (basketItem && inventoryQuantity) {
        return Number.parseInt(inventoryQuantity, 10) - Number.parseInt(basketItem.quantity, 10);
      }
      return inventoryQuantity || 0;
    }

    render() {
      const { productId, classes, basketItem, inventoryQuantity, product } = this.props;
      const { quantity, helperText } = this.state;
      const remainedNumberInventory = this.calcRemainNumberInventory(inventoryQuantity, basketItem);
      return (
        <div className={classes.root} key={productId}>

          <Typography variant="subtitle1" className={classes.productTitle}>
            {product.name}(s)
          </Typography>

          <Button
                    aria-label="Add"
                    variant="fab"
                    className={classes.button}
                    color="secondary"
                    disabled={!validateRemove(quantity, basketItem)}
                    onClick={() => this.onClickRemoveFromBasket(basketItem, productId, quantity)}
                >
            <RemoveIcon />
          </Button>
          <TextField
                    id="with-adornment"
                    placeholder="quantity"
                    className={classNames(classes.margin, classes.textField, { inputType: classes.inputStyle })}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">#</InputAdornment>,
                      className: classes.textFieldFormLabel,
                    }}
                    type="number"
                    value={quantity}
                    helperText={helperText}
                    onChange={(event) => {
                      if (event.target.value >= 0 && (event.target.value <= remainedNumberInventory
                            || (basketItem && event.target.value <= basketItem.quantity))
                      ) {
                        this.setState({ helperText: '' });
                        return this.handleChange(event.target.value);
                      }
                      this.setState({ helperText: `only ${remainedNumberInventory} items left` });
                      const maxItem = Math.max(basketItem.quantity, remainedNumberInventory);
                      return this.handleChange(maxItem);
                    }}
                />
          <Button
                    color="primary"
                    aria-label="Add"
                    variant="fab"
                    className={classes.button}
                    disabled={!validateAdd(quantity, basketItem, inventoryQuantity)}
                    onClick={() => this.onClickAddToBasket(basketItem, productId, quantity)}
                >
            <AddIcon />
          </Button>

        </div>
      );
    }
}

BasketItem.propTypes = {
  basketItem: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inventoryQuantity: PropTypes.number.isRequired,
  updateBasket: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  basketItem: getBasketItemByProductId(state, props.productId),
  product: getProductById(state, props.productId),
  inventoryQuantity: getProductInventoryByProductId(state, props.productId),
});
const mapDispatchToProps = dispatch => ({
  updateBasket: (basketItem, productId, quantity, decr) => dispatch(Actions.updateBasket(basketItem, productId, quantity, decr)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BasketItem));
