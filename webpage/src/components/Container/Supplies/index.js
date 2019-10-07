import React, { Component } from 'react';
import CardList from "./CardList";
import Search from "./Search";
import ClasificationButtons from "./ClasificationButtons";
import { Grid } from '@material-ui/core';
export default class Supplies extends Component {
    
  render() {
    return (
      <Grid container>
        <Grid item container  spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Search />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <ClasificationButtons/>
          </Grid>
        </Grid>
        <Grid item container>
          <CardList />
        </Grid>
      </Grid>
    );
  }
}
