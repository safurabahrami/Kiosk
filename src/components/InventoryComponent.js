import React from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import InventoryItemComponent from './InventoryItemComponent';
import { getProductIds } from '../redux/selectors';

const styles = theme => ({
    root: {
      width: '70%',
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      alignSelf: 'center',
      padding: theme.spacing.unit * 2
    }
  });
class InventoryComponent extends React.Component {
    render() {
        const { productIds, classes } = this.props;
        return(
            <Paper className={classes.root}>
                { productIds.map(productId => <InventoryItemComponent key={productId} productId={productId} />)}
            </Paper>
        );
    }
}
const mapStateToProps = (state) => ({
    productIds: getProductIds(state)
});

export default connect(mapStateToProps)(withStyles(styles) (InventoryComponent));
