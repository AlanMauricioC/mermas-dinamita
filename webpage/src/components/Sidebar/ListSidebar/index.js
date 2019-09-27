import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FoodIcon from '@material-ui/icons/Fastfood';
import RecipiesIcon from '@material-ui/icons/MenuBook';
import ChartIcon from '@material-ui/icons/InsertChart';
import StoreIcon from '@material-ui/icons/Storefront';
import ItemSidebar from './ItemSidebar';

const data = [
    {
        title: "Insumos",
        icon: <FoodIcon/>,
    },
    {
        title: "Recetas",
        icon: <RecipiesIcon/>,
    },
    {
        title: "Órdenes",
        icon: <RecipiesIcon/>,
    },
    {
        title: "Reportes",
        icon: <ChartIcon/>,
    },
    {
        title: "Pedidos",
        icon: <StoreIcon/>,
    },
];

const useStyles = makeStyles(theme => ({
    root: {
        
    },
}));
  
export default function ListSidebar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
              <List component="nav" aria-label="">
                  {data.map((option) => <ItemSidebar option={option} key={option.title}/>)}
              </List>
            <Divider />
        </div>
    );
}