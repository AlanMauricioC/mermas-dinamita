import React from 'react';
import { ButtonGroup, Button, Grid, Chip, Avatar } from '@material-ui/core';
import { makeStyles,useTheme } from "@material-ui/core/styles";

export default function ClasificationButtons(props) {
    const theme=useTheme()
    const styles=makeStyles({
        root:{
        },
        chip:{
        },
        warningButton:{
            backgroundColor: theme.palette.feedback.warning,
            color: '#FFF'
        },
        okButton:{
            backgroundColor: theme.palette.feedback.ok,
            color: '#FFF'
        },
        errorButton:{
            backgroundColor: theme.palette.feedback.error,
            color: '#FFF'
        }
    })
    const classes= styles()
    return (
        <div>
            <Grid container 
                alignItems="center"
                spacing={1}>
                <Grid item>
                    <Chip 
                    className={classes.chip} 
                    avatar={<Avatar className={classes.okButton} >G</Avatar>} 
                    label='verdecito' />
                </Grid>
                <Grid item>
                    <Chip 
                    className={classes.chip} 
                    avatar={<Avatar className={classes.warningButton} >O</Avatar>} 
                    label='naranjita' />
                </Grid>
                <Grid item>
                    <Chip 
                    className={classes.chip} 
                    avatar={<Avatar className={classes.errorButton} >R</Avatar>} 
                    label='rojito' />
                </Grid>
            </Grid>
        </div>
    );
}