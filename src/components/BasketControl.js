import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import InventoryItemComponent from './InventoryItemComponent';
import { getSortedScannedProductIds } from '../redux/selectors';

const styles = theme => ({
    root: {
      width: '70%',
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      alignSelf: 'center',
      padding: theme.spacing.unit * 2
    }
  });

class BasketControl extends React.Component {
    render() {
        const { scannedProductIds, classes } = this.props;
        return(
            <Paper className={classes.root}>
                { scannedProductIds.map(productId => <InventoryItemComponent key={productId} productId={productId} />)}
            </Paper>
        );
    }
}

BasketControl.propTypes = {
    scannedProductIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
}

const mapStateToProps = (state) => ({
    scannedProductIds: getSortedScannedProductIds(state)
});

export default connect(mapStateToProps)(withStyles(styles)(BasketControl));
