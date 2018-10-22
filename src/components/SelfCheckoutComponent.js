import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import * as Actions from '../redux/actionCreators/Actions'
import { getBasketItems } from '../redux/selectors';

import InventoryComponent from './InventoryComponent';
import BasketComponent from './BasketComponent';
import PriceBoxComponent from './PriceBoxComponent';

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
        await this.props.getProducts();
    }
    render() {
        const { basketItems, classes } = this.props;
        return(
            <Paper className={classes.root}>
                {/*
                    render the inventory component
                */}
                <InventoryComponent />
                {/*
                    render the Basket component
                */}
                <BasketComponent basketItems={basketItems} />
                {/*
                    render the price
                */}
                <PriceBoxComponent basketItems={basketItems}/>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    basketItems: getBasketItems(state)
});

const mapDispatchToProps = dispatch => ({
    getProducts: () => dispatch(Actions.getProducts())
});
export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles) (SelfCheckoutComponent));