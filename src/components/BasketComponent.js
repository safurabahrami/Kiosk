import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import BasketItemContainer from './BasketItemContainer';
import { getBasketItems } from '../redux/selectors';

const styles = theme => ({
    root: {
        width: '70%',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        alignSelf: 'center',
        padding: theme.spacing.unit * 2
    },
    margin: {
      margin: theme.spacing.unit,
    },
    withoutLabel: {
      marginTop: theme.spacing.unit * 3,
    },
    textField: {
      flexBasis: 100,
    },
    productTitle: {
        width: '25%',
        textAlign: 'left'
    }
  });
  
const BasketComponent = ({basketItems, classes}) => {
    
    return(
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell numeric>Price</TableCell>
                        <TableCell numeric>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {basketItems.map(row => {
                    return (
                        <BasketItemContainer key={row.productId} basketItem={row} />
                    );
                })}
                </TableBody>
            </Table>
        </Paper>
    );
}

const mapStateToProps = (state) => ({
    basketItems: getBasketItems(state)
});
export default connect(mapStateToProps)(withStyles(styles)(BasketComponent));