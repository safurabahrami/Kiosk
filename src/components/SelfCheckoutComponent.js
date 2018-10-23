import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import * as Actions from '../redux/actionCreators/Actions'
import BasketControl from './BasketControl';
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
        const { getProducts, getScannedItems } = this.props;
        await getProducts();
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
                <BasketComponent />
                {/*
                    render the price
                */}
                <PriceBoxComponent/>
            </Paper>
        );
    }
}

SelfCheckoutComponent.propTypes = {
    getScannedItems: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    getProducts: () => dispatch(Actions.getProducts()),
    getScannedItems: () => dispatch(Actions.getScannedItems())

});
export default connect(null,mapDispatchToProps) (withStyles(styles) (SelfCheckoutComponent));