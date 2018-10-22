import React from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InventoryItemComponent from './InventoryItemComponent';

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
        const generateKey = index => (`key${index}`);
        const { inventory, classes, basketItems} = this.props;
        return(
            <Paper className={classes.root}>
                { inventory.map(product => <InventoryItemComponent key={generateKey(product.id)} product={product} basketItems={basketItems}/>)}
            </Paper>
        );
    }
}
export default withStyles(styles) (InventoryComponent);
