import React, { PureComponent } from 'react';
import Card from "./ProductCard";
import { Grid } from "@material-ui/core";
import {getSupplies as supplies} from "../../../../services/supplies";
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        paddingTop: 24,
        borderRadius: 3,
    },
});

class CardList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    async getSupplies(){
        //llamada a servidor
        this.setState({ data: supplies })
    }
    componentDidMount() {
        this.getSupplies()
    }

    componentDidUpdate(prevProps,prevState){
        if (this.state.data===prevState.data) {
            return null
        }
        this.getSupplies()
    }


    render() {
        const { classes } = this.props;
        return (
            <Grid container
                direction="row"
                alignItems="center"
                spacing={2}
                className={classes.root} >
                {this.state.data.map((card) => <Card key={card.id} card={card} />)}
            </Grid>
        )
        
    }
}
const connected = connect(state => state.category)(CardList)
export default withStyles(styles)(connected);