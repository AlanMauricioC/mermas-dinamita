import React, {Component} from 'react';
import { Button, Grid, TextField, MenuItem, Paper, Divider, Switch, FormControlLabel } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import { recipes, getRecipes, supplies, wastes, insertOrder, updateSupplyOrder, insertSupplyOrder, deleteSupplyOrder, updateWasteOrder } from "./../../../../../services/orders";
import { getSupplies } from "./../../../../../services/supplies";
import { getWastes } from "./../../../../../services/wastes";
import alertifyjs from "alertifyjs";
import SelectSupply from "./../../../../Miscellaneous/SelectSupply"
import Info from "./../../../../Miscellaneous/Info";

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
            quantity: [],
            isSupply:false,
            index: 0,
            recipesBU:recipes,
            orderRecipeBU:{
                idRecipe: null, 
                nameRecipe: "No se ha seleccionado una receta", 
                supplies:[
                ],
                wastes:[
                ],
            },
        }
        console.log("constructor!")
    }

    componentDidMount() {
        const {idOrder, orderDetail}=this.props;
        if(idOrder){
            console.log(orderDetail)
            let newSupplies=[];
            let newWastes=[];
            for(let i=0;i<orderDetail.supplies.length;i++){
                newSupplies.push({
                    idSupply: orderDetail.supplies[i].idSupply,
                    nameSupply: orderDetail.supplies[i].nameSupply,
                    quantity:  orderDetail.supplies[i].quantityOrderSupply, 
                    unitSupply: orderDetail.supplies[i].nameUnit}
                );
            }
            if(orderDetail.wastes){
                for(let i=0;i<orderDetail.wastes.length;i++){
                    newWastes.push({
                        idWaste: orderDetail.wastes[i].idWaste,
                        nameSupply: orderDetail.wastes[i].nameSupply,
                        quantityOrderWaste:  orderDetail.wastes[i].quantityOrderWaste, 
                        nameUnit: orderDetail.wastes[i].nameUnit}
                    );
                }
            }
            const newData={
                idOrder: orderDetail.idOrder,
                idRecipe: orderDetail.idRecipe,
                idUser: orderDetail.idUser,
                supplies: newSupplies,
                wastes: newWastes
            }
            this.setState({orderRecipe:newData});
        }
        this.getRecipes();
        this.getRecipesBU();
        this.getSupplies();
        this.getWastes();
    }

    async getRecipesBU() {
        getRecipes("").then(({ recipes }) => {
            console.log(recipes)
            for(let i=0;i<recipes.length;i++){
                let newSupplies=[];
                for(let j=0;j<recipes[i].supplies.length;j++){
                    const idSupply=recipes[i].supplies[j].id;
                    const nameSupply=recipes[i].supplies[j].name;
                    const quantity=recipes[i].supplies[j].quantity;
                    const unitSupply=recipes[i].supplies[j].nameUnit;
                    newSupplies.push({idSupply, nameSupply, quantity, unitSupply});
                }
                recipes[i].supplies=newSupplies;
            }
            this.setState({ recipesBU: recipes })
        })
    }
    
    async getRecipes() {
        getRecipes("").then(({ recipes }) => {
            for(let i=0;i<recipes.length;i++){
                let newSupplies=[];
                for(let j=0;j<recipes[i].supplies.length;j++){
                    const idSupply=recipes[i].supplies[j].id;
                    const nameSupply=recipes[i].supplies[j].name;
                    const quantity=recipes[i].supplies[j].quantity;
                    const unitSupply=recipes[i].supplies[j].nameUnit;
                    newSupplies.push({idSupply, nameSupply, quantity, unitSupply});
                }
                recipes[i].supplies=newSupplies;
            }
            this.setState({ recipes })
        })
    }

    async getSupplies() {
        getSupplies("").then(({ supplies }) => {
            let supplies2={supplies:[{idSupply:null,nameSupply:"Seleccione un insumo"}]};
            console.log(supplies)
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

    async getWastes() {
        getWastes("").then(({ wastes }) => {
            let newWastes=[];
            for(let i=0; i<wastes.length; i++){
                if(wastes[i].typeWaste===1){
                    const idWaste=wastes[i].idWaste;
                    const nameWaste=wastes[i].nameSupply;
                    const nameUnit="ml"
                    newWastes.push({idWaste, nameWaste, nameUnit});
                }
            }
            this.setState({wastes: newWastes})
            console.log(wastes)
        })

    }

    getIndexSupply=(idSupply)=>{
        const supplies=this.state.supplies;
        for(let i=0;i<supplies.length;i++) if(supplies[i].idSupply===idSupply) return i;
    }

    validateData=()=>{
        let {orderRecipe, supplies, orderRecipeBU, isSupply}=this.state;
        if(isSupply) orderRecipe = orderRecipeBU;
        console.log(orderRecipe)
        for(let i=0;i<orderRecipe.supplies.length;i++) if(orderRecipe.supplies[i].quantity<=0) return false;
        for(let i=0;i<orderRecipe.supplies.length;i++){
            const index=this.getIndexSupply(orderRecipe.supplies[i].idSupply);
            if(supplies[index].quantityOrderSupply<orderRecipe.supplies[i].quantity) return false;
        }
        return true;
    }

    handleClickInsertOrder=()=>{
        if(this.validateData()){
                let {orderRecipe, orderWastes, isSupply, orderRecipeBU}=this.state;
                if(isSupply) orderRecipe = orderRecipeBU;
                const {idOrder}=this.props;
                const data={
                    idRecipe: orderRecipe.idRecipe,
                    idUser: 1,
                    supply: isSupply,
                    supplies:orderRecipe.supplies,
                    wastes: orderRecipe.wastes,
                }
                if(!idOrder){
                    insertOrder(data).then(()=>{
                        alertifyjs.success('Comanda creada correctamente');
                        this.props.handleReturnOrdersView();
                    }, (e) => console.error(e))
                }else{
                    for(let i=0; i<data.supplies.length; i++){
                        //Hace falta arreglar esto
                        const updataData={idOrder: this.props.idOrder, idSupply: data.supplies[i].idSupply, quantityOrderSupply: data.supplies[i].quantity}
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
                    if(data.wastes){
                        for(let i=0; i<data.wastes.length; i++){
                            //Hace falta arreglar esto
                            const updataData={idOrder: this.props.idOrder, idWaste: data.wastes[i].idWaste, quantityOrderWaste: data.wastes[i].quantityOrderWaste}
                            updateWasteOrder(updataData).then(()=>{
                                insertSupplyOrder(updataData).then(()=>{
                                    this.props.handleReturnOrdersView();
                                }, (e) => console.error(e))
                            }, (e) => console.error(e))
                        }
                    }
                    alertifyjs.success('Comanda actualizada correctamente');
                }
        }else{
            alertifyjs.warning("Asegúrese de colocar cantidades válidas")
        }
    }

    

    render(){
        const {handleReturnOrdersView, idOrder, classes}=this.props;
        const {recipes, isSupply, supplies, recipesBU, wastes, orderRecipe, orderRecipeBU, orderWastes, updateSupplies, deleteSupplies, updateWastes, deleteWastes}=this.state;
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
        const handleClickDeleteWaste=(supply)=>{
            const idWaste=supply.idWaste;
            const indexWaste=getIDWaste(idWaste);
            let data=orderRecipe;
            data.wastes.splice(indexWaste,1)
            this.setState({orderDetail:data});
        }
        const getIDSupply=(idSupply)=>{
            for(let i=0;i<orderRecipe.supplies.length;i++) if(orderRecipe.supplies[i].idSupply===idSupply) return i;
        }
        const getIDWaste=(idWaste)=>{
            for(let i=0;i<orderRecipe.wastes.length;i++) if(orderRecipe.wastes[i].idWaste===idWaste) return i;
        }
        const getNameSupply=(idSupply)=>{
            for(let i=0;i<supplies.length;i++) if(supplies[i].idSupply===idSupply) return supplies[i].nameSupply;
        }
        const getNameWaste=(idWaste)=>{
            for(let i=0;i<wastes.length;i++) if(wastes[i].idWaste===idWaste) return wastes[i].nameWaste;
        }
        const getUnitWaste=(idWaste)=>{
            for(let i=0;i<wastes.length;i++) if(wastes[i].idWaste===idWaste) return wastes[i].unitWaste;
        }
        const getUnitSupply=(idSupply)=>{
            for(let i=0;i<supplies.length;i++) if(supplies[i].idSupply===idSupply) return supplies[i].unitSupply;
        }

        const handleSelectSupply=(event)=>{
            const val = event.target.value
            if(val!=-1){
                let dataSupply=orderRecipe;
                let duplicated=false;
                for(let i=0;i<dataSupply.supplies.length;i++) if(dataSupply.supplies[i].idSupply===val) duplicated=true;
                if(!duplicated) dataSupply.supplies.push({idSupply: val, quantity: 0});
                else alertifyjs.warning("El insumo seleccionado ya se encuentra en la comanda");
                this.setState({orderRecipe: dataSupply,});
                console.log(orderRecipe)
            }
        }

        const handleChangeInput = event => {
            const val = event.target.value
            let data=null;
            switch(event.target.name){
                case "selectRecipe":
                    let i;
                    for(i=0;i<recipes.length;i++) if(recipes[i].idRecipe===val) break;
                    recipes[i]["wastes"]=[];
                    console.log(recipes[i])
                    this.setState({ 
                        [event.target.name]: val ,
                        orderRecipe: recipes[i],
                        orderRecipeBU: recipesBU[i],
                        index: i
                    });
                    console.log(recipesBU)
                    break;
                case "selectWaste":
                    if(val){
                        console.log(orderRecipe)
                        let dataSupply=orderRecipe;
                        let duplicated=false;
                        for(let i=0;i<dataSupply.wastes.length;i++) if(dataSupply.wastes[i].idWaste===val) duplicated=true;
                        if(!duplicated) dataSupply.wastes.push({idWaste: val, quantityOrderWaste: 0, nameUnit: "litros"});
                        else alertifyjs.warning("La merma seleccionado ya se encuentra en la comanda");
                        this.setState({orderRecipe: dataSupply,});
                        console.log(orderRecipe)
                    }
                    break;
                case "quantity":
                    console.log(orderRecipe.supplies[getIDSupply(parseFloat(event.target.id))].quantity)
                    data=orderRecipe;
                    data.supplies[getIDSupply(parseFloat(event.target.id))].quantity=(parseFloat(val) || 0);
                    this.setState({orderRecipe: data});
                    break;
                case "quantityOrderWaste":
                    console.log(orderRecipe)
                    data=orderRecipe;
                    data.wastes[getIDWaste(parseFloat(event.target.id))].quantityOrderWaste=(parseFloat(val) || 0);
                    this.setState({orderRecipe: data});
                    break;
                default:
                    this.setState({[event.target.name]: val});
            }
        }

        const handleChange = name => event => {
            this.setState({isSupply: event.target.checked})
        }
        
        const selectRecipe=
            <div>
                <Grid container>
                    <Grid item xs={5} md={9}>
                        <h2>Nueva comanda</h2>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <br/>
                        <FormControlLabel
                            label="Es insumo"
                            control={
                            <Switch
                                checked={this.state.isSupply}
                                onChange={handleChange('isSupply')}
                                value="isSupply"
                                color="primary"
                            />
                            }
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Info>
                            Para comenzar a realizar la comanda selecciona una receta.
                        </Info>
                    </Grid>
                </Grid>
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

        const tableWastes=<div>
            <h2>Mermas reutilizadas</h2>
            <Paper>
        {orderRecipe.wastes.map(waste => (
            <div>
                <Grid container>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="nameWaste"
                            id={waste.idWaste}
                            className={classes.textField}
                            fullWidth
                            InputProps={{
                              readOnly: true,
                            }}
                            value={getNameWaste(waste.idWaste)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            name="quantityOrderWaste"
                            id={waste.idWaste}
                            className={classes.textField}
                            fullWidth
                            value={orderRecipe.wastes[getIDWaste(waste.idWaste)].quantityOrderWaste}
                            onChange={handleChangeInput}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            name="unitWaste"
                            id={waste.idWaste}
                            className={classes.textField}
                            fullWidth
                            InputProps={{
                              readOnly: true,
                            }}
                            value={waste.nameUnit}
                            margin="normal"
                        />
                    </Grid>
                        <Button id={waste.idWaste}  onClick={()=>handleClickDeleteWaste({waste})}><DeleteIcon id={waste.idWaste}/></Button>
                </Grid>
            </div>
        ))}
        </Paper>
        </div>

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
                                name="quantity"
                                id={supply.idSupply}
                                className={classes.textField}
                                fullWidth
                                value={orderRecipe.supplies[getIDSupply(supply.idSupply)].quantity}
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

     
                        

        const tableSupplies2=
            orderRecipeBU.supplies.map(supply => (
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
                                name="quantity"
                                id={supply.idSupply}
                                className={classes.textField}
                                fullWidth
                                value={orderRecipeBU.supplies[getIDSupply(supply.idSupply) || 0].quantity}
                                InputProps={{
                                  readOnly: true,
                                }}
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
                            
                    </Grid>
                </div>
            ))
        ;

        const selectSupplies=
            <Grid container>
                <Grid item xs={6}>
                    <h2>Insumos disponibles</h2>
                </Grid>
                <Grid item xs={6}>
                    <h2>Mermas disponibles</h2>
                </Grid>
                <Grid item xs={6}>
                    <SelectSupply onChange={handleSelectSupply} value={-1}/>
                </Grid>
                <Grid item xs={6}>
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
                                {waste.nameWaste}
                            </MenuItem>
                        ))}
                    </TextField>

                        </Grid>
                <br/>
                <Grid item xs={12}>
                    <h2>Insumos utilizados</h2>
                </Grid>
            </Grid>
        ;

        const headers=<div>
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
                {isSupply ? tableSupplies2 : tableSupplies}
            </Paper>
                {orderRecipe.wastes ? tableWastes : null}
                </div>
        ;

        return (
            <Grid container>
                <Grid item xs={12}>
                    {idOrder ? console.log(idOrder) : selectRecipe}
                </Grid>
                    {isSupply ? null : (orderRecipe.idRecipe ? selectSupplies : null)}
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
                                <Button onClick={this.handleClickInsertOrder} color="primary" variant="contained">Registrar comanda</Button>
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