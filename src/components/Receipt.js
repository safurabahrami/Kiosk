import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableRow} from '@material-ui/core';

import { getSortedBasketProductIds } from '../redux/selectors';
import ReceiptItem from './ReceiptItem';

const styles = theme => ({
    root: {
        marginBottom: theme.spacing.unit * 2,
        alignSelf: 'center',
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 170px)',
        overflow: 'hidden',

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
    },
    headerTable: {
        background:'white'
    },
    headerCell: {
        fontWeight: 'bold'
    },
    scrollBody: {
        flex: '1 1 auto',
        position: 'relative', /* need this to position inner content */
        overflowY: 'auto',
    }
  });

const Receipt = ({basketItemsId, classes}) => {

    return(
        <div className={classes.root}>
            <div className={classes.headerTable}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.headerCell} style={{width:'55%'}}>Product</TableCell>
                            <TableCell className={classes.headerCell} numeric>Price</TableCell>
                            <TableCell className={classes.headerCell} numeric>Total</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className={classes.scrollBody}>
                <Table className={classes.table} style={{marginTop: '5px'}}>
                    <TableBody>
                    {basketItemsId.map(itemId => {
                        return (
                            <ReceiptItem key={itemId} productId={itemId} />
                        );
                    })}
                    </TableBody>
                </Table> 
            </div>
        </div>
    );
}

Receipt.propTypes = {
    basketItemsId: PropTypes.arrayOf(PropTypes.number).isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    basketItemsId: getSortedBasketProductIds(state)
});
export default connect(mapStateToProps)(withStyles(styles)(Receipt));