import { AppBar, Grid, IconButton, Toolbar, Badge } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExitIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { menuOpen, signOut } from '../../actions';
import { logout } from '../../services/login';
import PopOverNotification from './PopOverNotification';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	title: {
		paddingRight: 10
	},
	bigAvatar: {
		width: 40,
		height: 40,
		padding: '0.5em'
	},
	navBar: {
		//Aquí iría un color para el navbar... Si tuviera uno!
	}
}));

export default function Navbar() {
	const [ open, setOpen ] = useState(false);
	const [ notificationCount, setNotificationCount ] = useState(1);
	const classes = useStyles();
	const dispatch = useDispatch();

	const username = sessionStorage.getItem('userName') || '';

	const toggleMenu = () => {
		dispatch(menuOpen(true));
	};
	const handleNotificationQuantity = (quantity) => setNotificationCount(quantity);
	const handleOnClickNotification = () => setOpen(!open);
	const handleOnClose = () => setOpen(false);
	const handleOnClickExit = () => {
		sessionStorage.removeItem('token');
		dispatch(signOut());
	};
	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.navBar}>
				<Toolbar>
					<MenuIcon onClick={toggleMenu} />
					<Grid container justify="flex-end" alignItems="center">
						<Avatar alt="Image profile" src="logo192.png" className={classes.bigAvatar} />
						<Typography variant="h6" className={classes.title}>
							<span>{username}</span>
						</Typography>
						<IconButton color="inherit" onClick={handleOnClickNotification}>
							<Badge color="secondary" badgeContent={notificationCount} className={classes.margin}>
								<NotificationsRoundedIcon />
							</Badge>
						</IconButton>
						<IconButton color="inherit" onClick={handleOnClickExit}>
							<ExitIcon />
						</IconButton>
						<PopOverNotification
							isOpen={open}
							close={handleOnClose}
							notificationQuantity={handleNotificationQuantity}
						/>
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
}
