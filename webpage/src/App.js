import React, { useState, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Navbar from './components/Navbar';
import Container from './components/Container';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { useSelector } from 'react-redux';


function App() {
	
	


	const isLogged = useSelector((state) => state.isLogged);
	const content = (
		<Fragment>
			<Grid container>
				{/*Navbar*/}
				<Grid item xs={12}>
					<Navbar />
				</Grid>
				{/*Container*/}
				<Grid item xs={12}>
					<Container />
				</Grid>
			</Grid>
			{/*Sidebar*/}
			<Sidebar />
		</Fragment>
	);

	return <div className="App">{true ? content : <Login />}</div>;
}

export default App;
