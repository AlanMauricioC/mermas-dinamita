import React, { PureComponent } from 'react';
import Card from "./ProductCard";
import { Grid } from "@material-ui/core";
import {getSupplies as supplies} from "../../../../services/supplies";
import { connect } from 'react-redux'

class CardList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    async getSupplies(){
        // console.log(this.props);
        
        // const {idCategory,idSubcategory} = this.props
        // data({ idCategory, idSubcategory }).then(({ products }) => {
        //     // products.map(product => product.image = `https://picsum.photos/seed/${Math.random()}/400/400`)
        //     this.setState({ data: products })
        // })
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
        return (
            <Grid container
                direction="row"
                alignItems="center"
                spacing={2}>
                {this.state.data.map((card) => <Card key={card.id} card={card} />)}
            </Grid>
        )
        
    }
}

export default connect(state => state.category)(CardList)