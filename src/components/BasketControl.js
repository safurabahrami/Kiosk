import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import BasketItem from './BasketItem';
import { getSortedScannedProductIds } from '../redux/selectors';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    flex: '0 0 auto',
    overflow: 'scroll',
    flexGrow: 1,
  },
});

class BasketControl extends React.Component {
  render() {
    const { scannedProductIds, classes } = this.props;
    return (
      <Paper className={classes.root}>
        <div style={{ marginLeft: '69%' }}>
          <Typography variant="body1">
            Quantity
          </Typography>
        </div>
        { scannedProductIds.map(productId => <BasketItem key={productId} productId={productId} />)}
      </Paper>
    );
  }
}

BasketControl.propTypes = {
  scannedProductIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  scannedProductIds: getSortedScannedProductIds(state),
});

export default connect(mapStateToProps)(withStyles(styles)(BasketControl));
