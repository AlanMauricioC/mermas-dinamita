import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Popper, Paper, ClickAwayListener, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	button: {
        // backgroundColor:'rgba(255,255,255, .9)'
        display:'inline'
	},
	paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        marginTop:theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        maxWidth:400,
    },
    root:{
        zIndex:10000,
    }
}));

const Info = ({children}) => {
	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const handleOnClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const handleOnClickAway = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<Popper open={open} anchorEl={anchorEl} placement="bottom-start" className={classes.root}>
				<Paper className={classes.paper}>{children}</Paper>
			</Popper>
			<ClickAwayListener onClickAway={handleOnClickAway}>
				<IconButton
					variant="contained"
					size="small"
                    onClick={handleOnClick}
                    onMouseEnter={handleOnClick}
                    onMouseLeave={handleOnClickAway}
                    className={classes.button}
                    color="inherit"
				>
                    <InfoIcon />
				</IconButton>
			</ClickAwayListener>
		</>
	);
};

export default Info;
