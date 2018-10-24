import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import * as Actions from '../redux/actionCreators/Actions'
import BasketControl from './BasketControl';
import Receipt from './Receipt';
import PriceBox from './PriceBox';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }
});

class SelfCheckout extends React.Component {
    async componentDidMount() {
        const { getProducts, getScannedItems, getPromotions } = this.props;
        await getProducts();
        await getPromotions();
        await getScannedItems();
    }
    render() {
        const { classes } = this.props;
        return(
            <Paper className={classes.root}>
                {/*
                    render the inventory component
                */}
                <BasketControl />
                {/*
                    render the Basket component
                */}
                <Receipt />
                {/*
                    render the price
                */}
                <PriceBox/>
            </Paper>
        );
    }
}

SelfCheckout.propTypes = {
    getScannedItems: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    getProducts: () => dispatch(Actions.getProducts()),
    getScannedItems: () => dispatch(Actions.getScannedItems()),
    getPromotions: () => dispatch(Actions.getPromotions())
});
export default connect(null,mapDispatchToProps) (withStyles(styles) (SelfCheckout));