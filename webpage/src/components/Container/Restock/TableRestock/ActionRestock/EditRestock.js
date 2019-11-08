import React, {Component} from 'react';
import { getSupplies } from "./../../../../../services/supplies";
import { createRestock, getRestockRecomendation } from "./../../../../../services/restock";
import { Grid, Typography, TextField, MenuItem, Paper, Select, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import alertifyjs from "alertifyjs";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

class EditRestock extends Component{
    constructor(props){
        super(props);

        const idRestock=props.restockData.idRestock;
        const statusRestock=props.restockData.statusRestock;
        const registrationDate=props.restockData.registrationDate;

        this.state={
            supplies: [],
            suppliesRestock: [],
            restock: {idRestock, statusRestock, registrationDate},
            providers: [
                {id: 1, name: "Proveedor 1"},
            ]
        }
        console.log(props.restockData)
    }

    componentDidMount(){
        this.getSupplies();
    }

    showCurrentSupplies=()=>{
        const currentSupplies=this.props.restockData.supplies;
        const suppliesRestock=this.state.suppliesRestock;
        for(let i=0;i<currentSupplies.length;i++){
            const idSupply=currentSupplies[i].idSupply;
            const nameSupply=this.getSupplyByID("name", currentSupplies[i].idSupply);
            const costRestockSupply=currentSupplies[i].costRestockSupply;
            const idProvider=currentSupplies[i].idProvider;
            const quantityRestockSupply=currentSupplies[i].quantityRestockSupply;
            const commentaryRestockSupply=currentSupplies[i].commentaryRestockSupply;
            const arrivalDateRestockSupply=currentSupplies[i].arrivalDateRestockSupply;
            const sellByDateRestockSupply=currentSupplies[i].sellByDateRestockSupply;
            const statusRestockSupply=currentSupplies[i].statusRestockSupply;
            suppliesRestock.push({idSupply, nameSupply, quantityRestockSupply, costRestockSupply, idProvider, commentaryRestockSupply, arrivalDateRestockSupply, sellByDateRestockSupply, statusRestockSupply});
        }
        this.setState({suppliesRestock});
        /*
        */
    }

    async getSupplies() {
        getSupplies().then(({ supplies }) => {
            this.setState({ supplies })
            this.showCurrentSupplies();
            console.log('Insumos: \n',supplies);
        })
    }

    async insertRestock(data){
        createRestock(data).then(()=>{
            alertifyjs.success('Pedido creado correctamente');
            this.props.changeEditState();
        }, (e) => console.error(e))
    }

    getSupplyByID(action, idSupply){
        const supplies=this.state.supplies;
        switch (action) {
            case "name":
                for(let i=0;i<supplies.length;i++) if(supplies[i].id===idSupply) return supplies[i].name;
                break;
            case "index":
                for(let i=0;i<supplies.length;i++) if(supplies[i].id===idSupply) return supplies[i].name;
                break;
        }
    }

    getSupplyRestockByID(action, idSupply){
        const supplies=this.state.suppliesRestock;
        switch (action) {
            case "name":
                for(let i=0;i<supplies.length;i++) if(supplies[i].id===idSupply) return supplies[i].name;
                break;
            case "index":
                for(let i=0;i<supplies.length;i++) if(supplies[i].idSupply===idSupply) return i;
                break;
        }
    }

    handleSubmit=(action)=>{
        switch (action) {
            case "cancel":
                this.props.changeEditState();
                break;
            case "save":
                const data={idUser: 1, idSupplies: this.state.suppliesRestock}
                console.log(this.state.suppliesRestock);
                this.insertRestock(data)
                break;
        }
    }

    handleEditSupplyDate=(nameField, value, idSupply)=>{
        alert(nameField+value+idSupply)
    }

    handleEditSupply = event => {
        const idSupply=parseInt(event.target.id, 10);
        const nameField=event.target.name;
        const suppliesRestock=this.state.suppliesRestock;
        const index=this.getSupplyRestockByID("index", idSupply);
        suppliesRestock[index][nameField]=event.target.value;
        this.setState({suppliesRestock});
    }

    handleDeleteSupply=(idSupply)=>{
        const suppliesRestock=this.state.suppliesRestock;
        const index=this.getSupplyRestockByID("index", idSupply);
        if (index > -1) {
            suppliesRestock.splice(index, 1);
        }
        this.setState({suppliesRestock});
    }

    handleSelectSupply = event => {
        const suppliesRestock=this.state.suppliesRestock;
        const nameSupply=this.getSupplyByID("name", event.target.value);
        const idSupply=event.target.value;
        const index=this.getSupplyRestockByID("index", idSupply);
        if(index == undefined){
            const costRestockSupply=0
            const idProvider=1;
            const quantityRestockSupply=0;
            const commentaryRestockSupply="";
            const arrivalDateRestockSupply="NAWS";
            const sellByDateRestockSupply="NAWS";
            const statusRestockSupply=1;
            suppliesRestock.push({idSupply, nameSupply, quantityRestockSupply, costRestockSupply, idProvider, commentaryRestockSupply, arrivalDateRestockSupply, sellByDateRestockSupply, statusRestockSupply});
            this.setState({suppliesRestock});
        }else alertifyjs.warning('Ya se ha registrado el insumo "'+nameSupply+'" en el pedido');
        
    };

    tableHeaders=<Grid container justify="flex-start">
                    <Grid item xs={2}>
                        Insumo
                    </Grid>
                    <Grid item xs={1}>
                        Cantidad
                    </Grid>
                    <Grid item xs={1}>
                        Costo
                    </Grid>
                    <Grid item xs={1}>
                        Proveedor
                    </Grid>
                    <Grid item xs={1}>
                        Fecha de llegada
                    </Grid>
                    <Grid item xs={1}>
                        Fecha de caducidad
                    </Grid>
                    <Grid item xs={3}>
                        Comentarios
                    </Grid>
                    <Grid item xs={1}>
                        Status
                    </Grid>
                </Grid>;

    tableEmpty=<h3>No se ha seleccionado ningún insumo</h3>

    render(){
        const {classes}=this.props;
        return(
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <h2>Insumos : Modificación</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="supplies"
                            select
                            label="Seleccione un insumo para añadirlo al pedido"
                            fullWidth
                            value={-1}
                            onChange={this.handleSelectSupply}
                            margin="normal"
                        >
                            {this.state.supplies.map(supply => (
                                <MenuItem key={supply.id} value={supply.id}>
                                    {supply.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Pedido</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>

                            {this.state.suppliesRestock.length > 0 ? this.tableHeaders : this.tableEmpty}
                            {this.state.suppliesRestock.map(supply => (
                                <Grid container>
                                    <Grid item xs={1}>
                                        <TextField
                                            id={supply.idSupply}
                                            margin="normal"
                                            fullWidth
                                            InputProps={{
                                            readOnly: true,
                                            }}
                                            value={supply.nameSupply}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <TextField
                                            id={supply.idSupply}
                                            name={"quantityRestockSupply"}
                                            margin="normal"
                                            placeholder="Cantidad"
                                            onChange={this.handleEditSupply}
                                            fullWidth
                                            value={supply.quantityRestockSupply}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <TextField
                                            id={supply.idSupply}
                                            name={"costRestockSupply"}
                                            margin="normal"
                                            placeholder="Costo"
                                            onChange={this.handleEditSupply}
                                            fullWidth
                                            value={supply.costRestockSupply}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <TextField
                                            id={supply.idSupply}
                                            name={"idProvider"}
                                            select
                                            fullWidth
                                            value={supply.idProvider}
                                            //onChange={this.handleEditSupply}
                                            margin="normal"
                                        >
                                            {this.state.providers.map(provider => (
                                                <MenuItem key={provider.id} value={provider.id}>
                                                    {provider.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id={supply.idSupply}
                                                name={"arrivalDateRestockSupply"}
                                                format="dd/MM/yyyy"
                                                value={supply.arrivalDateRestockSupply}
                                                onChange={()=>this.handleEditSupplyDate("arrivalDateRestockSupply", supply.arrivalDateRestockSupply, supply.idSupply)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={2}>
                                        Fecha
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            id={supply.idSupply}
                                            name={"commentaryRestockSupply"}
                                            margin="normal"
                                            placeholder="Comentarios"
                                            onChange={this.handleEditSupply}
                                            fullWidth
                                            value={supply.commentaryRestockSupply}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        Status
                                    </Grid>
                                    <Grid item xs={1}>
                                        <br/>
                                        <Button onClick={()=>this.handleDeleteSupply(supply.idSupply)}>
                                            <DeleteIcon/>
                                        </Button>
                                        
                                    </Grid>
                                </Grid>
                            ))}
                        </Paper>
                        <br/>
                    </Grid>
                    
                    <Grid item xs={8}/>
                    <Grid item xs={2}>
                        <Link to={"/pedidos"}>
                            <Button onClick={()=>alert("holi")} color="secondary" variant="contained">Cancelar</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link to={"/pedidos"}>
                            <Button onClick={()=>alert("holi")} color="primary" variant="contained">Finalizar modificación</Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default EditRestock;