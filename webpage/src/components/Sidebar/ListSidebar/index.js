import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FoodIcon from '@material-ui/icons/Fastfood';
import RecipiesIcon from '@material-ui/icons/MenuBook';
import ChartIcon from '@material-ui/icons/InsertChart';
import StoreIcon from '@material-ui/icons/Storefront';
import AppleIcon from '@material-ui/icons/Apple';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ItemSidebar from './ItemSidebar';
import ColorizeIcon from '@material-ui/icons/Colorize';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { USER_ROLES } from '../../../constants';

const data = [
	{
		title: 'Insumos',
		icon: <FoodIcon />,
		link: 'insumos'
	},
	{
		title: 'Recetas',
		icon: <RecipiesIcon />,
		link: 'recetas'
	},
	{
		title: 'Comandas',
		icon: <ReceiptIcon />,
		link: 'ordenes'
	},
	{
		title: 'Mermas',
		icon: <AppleIcon />,
		link: 'mermas'
	},
	{
		title: 'Pedidos',
		icon: <StoreIcon />,
		link: 'pedidos'
	},
	{
		title: 'Unidades de medida',
		icon: <ColorizeIcon />,
		link: 'unidades'
	},
	{
		title: 'Gráficas',
		icon: <ChartIcon />,
		link: 'graficas'
	},
	{
		title: 'Usuarios',
		icon: <PeopleAltIcon />,
		link: 'usuarios',
		enable: sessionStorage.getItem('role') === USER_ROLES.ADMIN
	}
];

const useStyles = makeStyles((theme) => ({
	root: {}
}));

export default function ListSidebar() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<List component="nav" aria-label="">
				{data.map((option) => <ItemSidebar option={option} key={option.title} />)}
			</List>
			<Divider />
		</div>
	);
}
