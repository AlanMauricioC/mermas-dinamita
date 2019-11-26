import React, { useState } from 'react';
import { login } from '../../services/login';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { signIn } from '../../actions';
import alertifyjs from 'alertifyjs';
import { isValidEmail, isValidPassword } from '../../services/validations';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="#">
				Restaurante Vivall
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh'
	},
	image: {
		// backgroundImage: 'url(https://source.unsplash.com/ZuIDLSz3XLg)',
		backgroundImage: 'url(https://source.unsplash.com/800x1000/?food)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.grey[50],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	logo: {
		margin: theme.spacing(1),
		width: '9vw'
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function SignInSide() {
	const dispatch = useDispatch();
	const classes = useStyles();
	//falta el uso de states para el usuario y contraseña
	const [ user, setUser ] = useState(null);
	const [ pass, setPass ] = useState(null);

	const handleOnChangeEmail = (event) => setUser(event.target.value);
  const handleOnChangePass = (event) => setPass(event.target.value);
  const handleOnKeyEnter=(event) => {
      if (event.key === 'Enter') {
        handleOnLogin()
      }
  }
	//lógica de quien entra y quien no, llama al ws
	const handleOnLogin = async () => {
		//validar correo
		let validated = true;
		if (!isValidEmail(user)) {
			alertifyjs.warning('Verifique su correo');
			validated = false;
		}
		if (!isValidPassword(pass)) {
			alertifyjs.warning('Verifique su contraseña');
			validated = false;
		}
		if (!validated) {
			return null;
		}
		const usuario = { email: user, password: pass };
		//entrar en la app
		const isLogged = await login(usuario);
		if (isLogged) {
			dispatch(signIn());
		} else {
			alertifyjs.warning('Favor de validar los campos');
		}
	};
	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<img className={classes.logo} src="img/logoLR.png" />
					{/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>*/}
					<Typography component="h1" variant="h5">
						Ingresa
					</Typography>
					<form className={classes.form}>
						<TextField
							variant="standard"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Direccion de correo"
							type="email"
							name="email"
							autoComplete="email"
              onChange={handleOnChangeEmail}
              onKeyDown={handleOnKeyEnter}
							autoFocus
						/>
						<TextField
							variant="standard"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Contraseña"
							type="password"
							id="password"
							autoComplete="current-password"
              onChange={handleOnChangePass}
              onKeyDown={handleOnKeyEnter}
						/>

						<Button
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleOnLogin}
						>
							Entrar
						</Button>
						<Grid container>
							<Grid item xs />
							<Grid item />
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}
