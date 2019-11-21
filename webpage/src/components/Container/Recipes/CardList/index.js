import { Fab, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { setRecipes } from "../../../../actions";
import { getRecipes as recipes } from "../../../../services/recipes";
import DialogDelete from './DialogDelete';
import DialogUpdate from './DialogUpdate';
import Card from "./ProductCard";
const styles = theme => ({
    root: {
        paddingTop: 24,
        borderRadius: 3,
    },
    fab: {
        position: 'fixed',
        bottom: 10,
        right: 10,
    },
});

class CardList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            openUpdateDialog: false,
            openDeleteDialog: false,
            recipeToUpdate: {
                name: '',
                min: 0,
                max: 0,
                quantity: 0,
                idUnit: -1,
                id: null
            }
        }
    }

    async getRecipes() {
        //llamada a servidor
        const recipesData=await recipes(null,null)
        this.props.setRecipes(recipesData.recipes)
    }
    componentDidMount() {
        this.getRecipes()
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.recipes === prevProps.recipes) {
    //         return null
    //     }
    //     this.getRecipes()
    // }


    render() {
        const { classes } = this.props;
        //esta funcion se pasa como parametro al card, para que cuando se de click defina el insumo
        const handleOpenDialog = (recipe) => this.setState({ openUpdateDialog: true, recipeToUpdate: recipe })
        const handleOpenDialogDelete = (recipe) => {
            
            this.setState({ openDeleteDialog: true, recipeToUpdate: recipe })
        }
        //funcion que se pasa como parametro al dialog para que se cierre a si mismo
        const handleCloseDialog = e => this.setState({ openUpdateDialog: false })
        const handleCloseDialogDelete = e => this.setState({ openDeleteDialog: false })

        const handleOpenDialogInsert = e => {
            this.setState({
                openUpdateDialog: true, recipeToUpdate: {
                    name: '',
                    min: 0,
                    max: 0,
                    quantity: 0,
                    idUnit: 0,
                    id: null
                }
            })
        }
        
        return (
            <Grid container
                direction="row"
                alignItems="center"
                spacing={2}
                className={classes.root} >
                {this.props.recipes.map((card) => <Card key={card.idRecipe} card={card} handleOpenDialog={handleOpenDialog} handleDelete={handleOpenDialogDelete} />)}
                <DialogUpdate open={this.state.openUpdateDialog} handleClose={handleCloseDialog} recipe={this.state.recipeToUpdate} />
                <DialogDelete open={this.state.openDeleteDialog} handleClose={handleCloseDialogDelete} recipe={this.state.recipeToUpdate} />
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpenDialogInsert} >
                    <AddIcon />
                </Fab>
            </Grid>
        )

    }
}

function mapStateToProps(state) {
    return {recipes:state.recipes}
}

export default connect(mapStateToProps, { setRecipes})(withStyles(styles)(CardList));