import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import * as Actions from '../redux/actionCreators/Actions'
import { getProducts, getBasketItems } from '../redux/selectors';

import InventoryComponent from './InventoryComponent';
import BasketComponent from './BasketComponent';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }
});

class SelfCheckoutComponent extends React.Component {
    async componentDidMount() {
        await this.props.actions.getProducts();
    }
    render() {
        const { products, basketItems, classes } = this.props;
        return(
            <Paper className={classes.root}>
                {/*
                    render the inventory component
                */}
                <InventoryComponent products={products} basketItems={basketItems}/>
                {/*
                    render the Basket component
                */}
                <BasketComponent basketItems={basketItems} />
                {/*
                    render the price
                */}
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    products: getProducts(state),
    basketItems: getBasketItems(state)
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles) (SelfCheckoutComponent));