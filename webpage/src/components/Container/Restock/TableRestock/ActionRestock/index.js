import React, {Component} from 'react';
import { getSupplies } from "./../../../../../services/supplies";
import { createRestock, getRestockRecomendation } from "./../../../../../services/restock";
import { Grid, Typography, TextField, MenuItem, Paper, Select, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import alertifyjs from "alertifyjs";

class ActionRestock extends Component{
    constructor(props){
        super(props);
        this.state={
            supplies: [],
            suppliesRestock: [],
            restock: [],
            providers: [
                {id: 1, name: "Proveedor 1"},
            ]
        }
    }

    componentDidMount(){
        this.getSupplies();
    }

    async getSupplies() {
        getSupplies().then(({ supplies }) => {
            this.setState({ supplies })
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
                alert(action)
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

    generateRecomendation=()=>{
        this.getRecomendation();
    }

    async getRecomendation(){
        getRestockRecomendation().then(({ restock }) => {
            this.setState({ restock })
            const suppliesRestock=this.state.suppliesRestock;
            for(let i=0;i<restock[0].supplies.length;i++){
                const nameSupply=this.getSupplyByID("name", restock[0].supplies[i].idSupply);
                const idSupply=restock[0].supplies[i].idSupply;
                const costRestockSupply=0
                const idProvider=1;
                const quantityRestockSupply=restock[0].supplies[i].quantityRestockSupply;
                const commentaryRestockSupply="";
                suppliesRestock.push({idSupply, nameSupply, quantityRestockSupply, costRestockSupply, idProvider, commentaryRestockSupply});
                this.setState({suppliesRestock});
            }
            console.log('restock: \n',restock);
        })
    }

    handleEditSupply = event => {
        const idSupply=parseInt(event.target.id, 10);
        const nameField=event.target.name;
        const suppliesRestock=this.state.suppliesRestock;
        const index=this.getSupplyRestockByID("index", idSupply);
        suppliesRestock[index][nameField]=event.target.value;
        this.setState({suppliesRestock});
    }

    handleSelectSupply = event => {
        const suppliesRestock=this.state.suppliesRestock;
        const nameSupply=this.getSupplyByID("name", event.target.value);
        const idSupply=event.target.value;
        const costRestockSupply=0
        const idProvider=1;
        const quantityRestockSupply=0;
        const commentaryRestockSupply="";
        suppliesRestock.push({idSupply, nameSupply, quantityRestockSupply, costRestockSupply, idProvider, commentaryRestockSupply});
        this.setState({suppliesRestock});
    };

    render(){
        const {classes}=this.props;
        return(
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <h2>Insumos</h2>
                    </Grid>
                    <Grid item xs={8}>
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
                    <Grid item xs={4}>
                        <Button onClick={()=>this.generateRecomendation()} color="primary" fullWidth variant="contained">Generar recomendación de pedido</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Pedido</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container justify="flex-start">
                                <Grid item xs={3}>
                                    Insumo
                                </Grid>
                                <Grid item xs={1}>
                                    Cantidad
                                </Grid>
                                <Grid item xs={1}>
                                    Costo
                                </Grid>
                                <Grid item xs={3}>
                                    Proveedor
                                </Grid>
                                
                                <Grid item xs={4}>
                                    Comentarios
                                </Grid>
                            </Grid>
                            {this.state.suppliesRestock.map(supply => (
                                <Grid container>
                                    <Grid item xs={3}>
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
                                    <Grid item xs={3}>
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
                                    <Grid item xs={4}>
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
                                </Grid>
                            ))}
                        </Paper>
                        <br/>
                    </Grid>
                    
                    <Grid item xs={8}/>
                    <Grid item xs={2}>
                        <Link to={"/pedidos"}>
                            <Button onClick={()=>this.handleSubmit("cancel")} color="secondary" variant="contained">Cancelar</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link to={"/pedidos"}>
                            <Button onClick={()=>this.handleSubmit("save")} color="primary" variant="contained">Registrar pedido</Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ActionRestock;