import React, {Component} from 'react';
import { Button, Grid, TextField, MenuItem, Paper, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import { recipes, getRecipes, supplies, wastes, insertOrder, updateSupplyOrder, insertSupplyOrder, deleteSupplyOrder } from "./../../../../../services/orders";
import { getSupplies } from "./../../../../../services/supplies";
//import { getWastes } from "./../../../../../services/wastes";
import TableSuppliesOrderDetail from './TableSuppliesOrderDetail';
import alertifyjs from "alertifyjs";

class TableOrderDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            orderRecipe:{
                idRecipe: null, 
                nameRecipe: "No se ha seleccionado una receta", 
                supplies:[
                ],
                wastes:[
                ],
            },
            updateSupplies:[],
            deleteSupplies:[],
            updateWastes:[],
            deleteWastes:[],
            recipes:recipes,
            supplies:supplies,
            wastes:wastes,
            orderWastes: null,
            selectRecipe: null,
            selectSupply: null,
            quantityRecipeSupply: [],
        }
        console.log("constructor!")
    }

    componentDidMount() {
        const {idOrder, orderDetail}=this.props;
        if(idOrder){
            let newSupplies=[];
            for(let i=0;i<orderDetail.supplies.length;i++){
                newSupplies.push({
                    idSupply: orderDetail.supplies[i].idSupply,
                    nameSupply: orderDetail.supplies[i].nameSupply,
                    quantityRecipeSupply:  orderDetail.supplies[i].quantityOrderSupply, 
                    unitSupply: orderDetail.supplies[i].nameUnit}
                );
            }
            const newData={
                idOrder: orderDetail.idOrder,
                idRecipe: orderDetail.idRecipe,
                idUser: orderDetail.idUser,
                supplies: newSupplies
            }
            this.setState({orderRecipe:newData});
        }
        this.getRecipes();
        this.getSupplies();
    }
    
    async getRecipes() {
        getRecipes("").then(({ recipes }) => {
            for(let i=0;i<recipes.length;i++){
                let newSupplies=[];
                for(let j=0;j<recipes[i].supplies.length;j++){
                    const idSupply=recipes[i].supplies[j].id;
                    const nameSupply=recipes[i].supplies[j].name;
                    const quantityRecipeSupply=recipes[i].supplies[j].quantity;
                    const unitSupply=recipes[i].supplies[j].nameUnit;
                    newSupplies.push({idSupply, nameSupply, quantityRecipeSupply, unitSupply});
                }
                recipes[i].supplies=newSupplies;
            }
            this.setState({ recipes: recipes })
        })
    }

    async getSupplies() {
        getSupplies("").then(({ supplies }) => {
            let supplies2={supplies:[{idSupply:null,nameSupply:"Seleccione un insumo"}]};
            for(let i=0;i<supplies.length;i++){
                const newIDSupply=supplies[i].id;
                const newNameSupply=supplies[i].name;
                const newQuantitySupply=supplies[i].quantity;
                const newUnitSupply=supplies[i].unit;
                supplies2.supplies.push({idSupply: newIDSupply,nameSupply: newNameSupply,quantityOrderSupply: newQuantitySupply, unitSupply: newUnitSupply});
            }
            console.log(supplies2.supplies)
            this.setState({ supplies: supplies2.supplies })
            console.log(this.state.supplies)
        })

    }

    handleClickInsertOrder=()=>{
        const {orderRecipe, orderWastes}=this.state;
        const {idOrder}=this.props;
        const data={
            idRecipe: orderRecipe.idRecipe,
            idUser: 1,
            supplies:orderRecipe.supplies,
            wastes: orderWastes,
        }
        if(!idOrder){
            insertOrder(data).then(()=>{
                alertifyjs.success('Orden creada correctamente');
                this.props.handleReturnOrdersView();
            }, (e) => console.error(e))
        }else{
            for(let i=0; i<data.supplies.length; i++){
                //Hace falta arreglar esto
                const updataData={idOrder: this.props.idOrder, idSupply: data.supplies[i].idSupply, quantityOrderSupply: data.supplies[i].quantityRecipeSupply}
                updateSupplyOrder(updataData).then(()=>{
                    insertSupplyOrder(updataData).then(()=>{
                        this.props.handleReturnOrdersView();
                    }, (e) => console.error(e))
                }, (e) => console.error(e))
            }
            for(let i=0; i<this.state.deleteSupplies.length; i++){
                const deleteData={idOrder: this.props.idOrder, idSupply: this.state.deleteSupplies[i].idSupply};
                deleteSupplyOrder(deleteData).then(()=>{
                    this.props.handleReturnOrdersView();
                }, (e) => console.error(e))
            }
            alertifyjs.success('Orden actualizada correctamente');
        }
    }

    

    render(){
        const {handleReturnOrdersView, idOrder, classes}=this.props;
        const {recipes, supplies, wastes, orderRecipe, orderWastes, updateSupplies, deleteSupplies, updateWastes, deleteWastes}=this.state;
        const handleClickDeleteSupply=(supply)=>{
            const idSupply=supply.supply.idSupply;
            const indexSupply=getIDSupply(idSupply);
            let data=orderRecipe;
            if(idOrder){
                const newDeletionSupply={idOrder: idOrder, idSupply:data.supplies[indexSupply].idSupply};
                let oldDataDeletion=deleteSupplies;
                oldDataDeletion.push(newDeletionSupply);
                this.setState({deleteSupplies: oldDataDeletion});
            }
            data.supplies.splice(indexSupply,1)
            this.setState({orderDetail:data});
            console.log(deleteSupplies);
        }
        const getIDSupply=(idSupply)=>{
            for(let i=0;i<orderRecipe.supplies.length;i++) if(orderRecipe.supplies[i].idSupply===idSupply) return i;
        }
        const getNameSupply=(idSupply)=>{
            for(let i=0;i<supplies.length;i++) if(supplies[i].idSupply===idSupply) return supplies[i].nameSupply;
        }
        const getUnitSupply=(idSupply)=>{
            for(let i=0;i<supplies.length;i++) if(supplies[i].idSupply===idSupply) return supplies[i].unitSupply;
        }
        const handleChangeInput = event => {
            const val = event.target.value
            switch(event.target.name){
                case "selectRecipe":
                    let i;
                    for(i=0;i<recipes.length;i++) if(recipes[i].idRecipe===val) break;
                    this.setState({ 
                        [event.target.name]: val ,
                        orderRecipe: recipes[i],
                    });
                    console.log(orderRecipe)
                    break;
                case "selectSupply":
                    if(val){
                            let dataSupply=orderRecipe;
                            let duplicated=false;
                            for(let i=0;i<dataSupply.supplies.length;i++) if(dataSupply.supplies[i].idSupply===val) duplicated=true;
                            if(!duplicated) dataSupply.supplies.push({idSupply: val, quantityRecipeSupply: 0});
                            this.setState({orderRecipe: dataSupply,});
                            console.log(orderRecipe)
                    }
                    break;
                case "selectWaste":
                    if(val){
                        let dataSupply=orderWastes;
                        let duplicated=false;
                        for(let i=0;i<dataSupply.length;i++) if(dataSupply.idWaste===val) duplicated=true;
                        if(!duplicated) dataSupply.push({idWaste: val, quantityOrderWaste: 0});
                        this.setState({selectWaste: 0, orderWastes: dataSupply,});
                    }
                    break;
                case "quantityRecipeSupply":
                    console.log(orderRecipe.supplies[getIDSupply(parseFloat(event.target.id))].quantityRecipeSupply)
                    let data=orderRecipe;
                    data.supplies[getIDSupply(parseFloat(event.target.id))].quantityRecipeSupply=parseFloat(val);
                    this.setState({orderRecipe: data});
                    console.log(orderRecipe);
                    break;
                default:
                    this.setState({[event.target.name]: val});
            }
        }
        
        const selectRecipe=
            <div>
                <h2>Nueva receta</h2>
                <Divider/>
                <TextField
                    name="selectRecipe"
                    select
                    label="Receta"
                    value={this.state.selectRecipe}
                    fullWidth
                    onChange={handleChangeInput}
                    margin="normal"
                >
                    {recipes.map(recipe => (
                        <MenuItem key={recipe.idRecipe} value={recipe.idRecipe}>
                            {recipe.nameRecipe}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        ;
        //Pasar a otro componente, maybe
        const tableSupplies=
            orderRecipe.supplies.map(supply => (
                <div>
                    <Grid container>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="nameSupply"
                                id={supply.idSupply}
                                className={classes.textField}
                                fullWidth
                                InputProps={{
                                  readOnly: true,
                                }}
                                value={getNameSupply(supply.idSupply)}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                name="quantityRecipeSupply"
                                id={supply.idSupply}
                                className={classes.textField}
                                fullWidth
                                value={orderRecipe.supplies[getIDSupply(supply.idSupply)].quantityRecipeSupply}
                                onChange={handleChangeInput}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <TextField
                                name="unitSupply"
                                id={supply.idSupply}
                                className={classes.textField}
                                fullWidth
                                InputProps={{
                                  readOnly: true,
                                }}
                                value={getUnitSupply(supply.idSupply)}
                                margin="normal"
                            />
                        </Grid>
                            <Button id={supply.idSupply}  onClick={()=>handleClickDeleteSupply({supply})}><DeleteIcon id={supply.idSupply}/></Button>
                    </Grid>
                </div>
            ))
        ;

        const selectSupplies=
            <Grid container>
                <Grid item xs={12}>
                    <h2>Insumos disponibles</h2>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="selectSupply"
                        select
                        label="Seleccione un insumo para añadirlo a la orden"
                        fullWidth
                        onChange={handleChangeInput}
                        margin="normal"
                    >
                        {supplies.map(supply => (
                            <MenuItem key={supply.idSupply} value={supply.idSupply}>
                                {supply.nameSupply}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                {/*<Grid item xs={6}>
                    <TextField
                        name="selectWaste"
                        select
                        label="Merma"
                        value={this.state.selectWaste}
                        fullWidth
                        onChange={handleChangeInput}
                        margin="normal"
                    >
                        {wastes.map(waste => (
                            <MenuItem key={waste.idWaste} value={waste.idWaste}>
                                {waste.nameSupply}
                            </MenuItem>
                        ))}
                    </TextField>

                        </Grid>*/}
                <br/>
                <Grid item xs={12}>
                    <h2>Insumos utilizados</h2>
                </Grid>
            </Grid>
        ;

        const headers=
            <Paper>
                <Grid container>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Insumo</h4>
                    </Grid>
                    <Grid item xs={2}>
                        <h4>Cantidad</h4>
                    </Grid>
                    <Grid item xs={3}>
                        <h4>Unidad</h4>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={10}>
                        <Divider/>
                    </Grid>
                </Grid>
                {tableSupplies}
            </Paper>
        ;

        return (
            <Grid container>
                <Grid item xs={12}>
                    {idOrder ? console.log(idOrder) : selectRecipe}
                </Grid>
                    {orderRecipe.idRecipe ? selectSupplies : null}
                <Grid item xs={12}>
                    {orderRecipe.idRecipe ? headers : null}
                </Grid>
                <Grid item xs={12}>
                {orderRecipe.idRecipe ? 
                    <div>
                        <br/>
                        <Grid container>
                            <Grid item xs={8}/>
                            <Grid item xs={2}>
                                <Button onClick={handleReturnOrdersView} color="secondary" variant="contained">Cancelar</Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={this.handleClickInsertOrder} color="primary" variant="contained">Registrar orden</Button>
                            </Grid>
                        </Grid>
                        
                        
                    </div> : 
                    <Grid container>
                        <Grid item xs={10}/>
                        <Grid item xs={2}>
                            <Button onClick={handleReturnOrdersView} color="secondary" variant="contained">Atrás</Button>
                        </Grid>
                    </Grid>
                    
                }
                </Grid>
            </Grid>
        );
    }
}

export default TableOrderDetail;