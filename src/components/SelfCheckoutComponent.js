import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actionCreators/Actions'
import { getProducts } from '../redux/selectors';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

class SelfCheckoutComponent extends React.Component {
    async componentDidMount() {
        await this.props.actions.getProducts();
    }
    render() {
        return(
            <Paper>
                <Typography>
                    Cart Will be rendered soon!
                </Typography>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    products: getProducts(state)
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps) (SelfCheckoutComponent);