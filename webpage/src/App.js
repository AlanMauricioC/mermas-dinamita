import React from 'react';
import { Grid } from "@material-ui/core";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Grid container>
        {/*Navbar*/}
        <Grid item xs={12}>
          <Navbar></Navbar>
        </Grid>
        {/*Container*/}
        <Grid item xs={12}>
          <Container />
        </Grid>
      </Grid>
      {/*Sidebar*/}
      <Sidebar />
    </div>
  );
}

export default App;
