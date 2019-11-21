import React, { PureComponent } from 'react';
import Card from "./ProductCard";
import { Grid, Fab } from "@material-ui/core";
import { getSupplies as supplies } from "../../../../services/supplies";
import { withStyles } from "@material-ui/core/styles";
import DialogUpdateSupply from './DialogUpdateSupply'
import AddIcon from '@material-ui/icons/Add';
import DialogDeleteSupply from './DialogDeleteSupply';
import { connect } from "react-redux";
import { setSupplies } from "../../../../actions";

const styles = theme => ({
    root: {
        paddingTop: 24,
        borderRadius: 3,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(1),
        right: theme.spacing(1),
    },
});

class CardList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            openUpdateDialog: false,
            openDeleteDialog: false,
            supplyToUpdate: {
                name: '',
                min: 0,
                max: 0,
                quantity: 0,
                idUnit: -1,
                id: null
            }
        }
    }

    async getSupplies() {
        //llamada a servidor
        const suppliesData=await supplies('',null)
        this.props.setSupplies(suppliesData.supplies)
    }
    componentDidMount() {
        this.getSupplies()
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.supplies === prevProps.supplies) {
    //         return null
    //     }
    //     this.getSupplies()
    // }


    render() {
        const { classes } = this.props;
        //esta funcion se pasa como parametro al card, para que cuando se de click defina el insumo
        const handleOpenDialog = (supply) => this.setState({ openUpdateDialog: true, supplyToUpdate: supply })
        const handleOpenDialogDelete = (supply) => {
            
            this.setState({ openDeleteDialog: true, supplyToUpdate: supply })
        }
        //funcion que se pasa como parametro al dialog para que se cierre a si mismo
        const handleCloseDialog = e => this.setState({ openUpdateDialog: false })
        const handleCloseDialogDelete = e => this.setState({ openDeleteDialog: false })

        const handleOpenDialogInsert = e => {
            this.setState({
                openUpdateDialog: true, supplyToUpdate: {
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
                {this.props.supplies.map((card) => <Card key={card.id} supply={card} handleOpenDialog={handleOpenDialog} handleDelete={handleOpenDialogDelete} />)}
                <DialogUpdateSupply open={this.state.openUpdateDialog} handleClose={handleCloseDialog} supply={this.state.supplyToUpdate} />
                <DialogDeleteSupply open={this.state.openDeleteDialog} handleClose={handleCloseDialogDelete} supply={this.state.supplyToUpdate} />
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpenDialogInsert} >
                    <AddIcon />
                </Fab>
            </Grid>
        )

    }
}

function mapStateToProps(state) {
    return {supplies:state.supplies.supplies.filter(supply=>supply.name.includes(state.supplies.qry))}
}

export default connect(mapStateToProps, { setSupplies})(withStyles(styles)(CardList));