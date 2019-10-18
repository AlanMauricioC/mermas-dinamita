import React from 'react';
import { ButtonGroup, Button, Grid, Chip, Avatar } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { setSupplies } from "../../../actions";
import { useDispatch } from "react-redux";
import { getSupplies } from "../../../services/supplies";
import { SUPPLY_SELECTOR } from "../../../constants";


export default function ClasificationButtons(props) {
    const theme = useTheme()
    const styles = makeStyles({
        root: {
        },
        chip: {
        },
        warningButton: {
            backgroundColor: theme.palette.feedback.warning,
            color: '#FFF'
        },
        okButton: {
            backgroundColor: theme.palette.feedback.ok,
            color: '#FFF'
        },
        errorButton: {
            backgroundColor: theme.palette.feedback.error,
            color: '#FFF'
        }
    })
    const classes = styles()
    const dispatch = useDispatch()
    const searchOk = () => {
        getSupplies(null, SUPPLY_SELECTOR.OK).then(({ supplies }) => {
            dispatch(setSupplies(supplies))
        })

    }
    const searchWarning = () => {
        getSupplies(null, SUPPLY_SELECTOR.WARNING).then(({ supplies }) => {
            dispatch(setSupplies(supplies))
        })
    }
    const searchError = () => {
        getSupplies(null, SUPPLY_SELECTOR.ERROR).then(({ supplies }) => {
            dispatch(setSupplies(supplies))
        })
    }
    const clearSearch = () => {
        getSupplies(null, null).then(({ supplies }) => {
            dispatch(setSupplies(supplies))
        })
    }
    return (
        <div>
            <Grid container
                alignItems="center"
                spacing={1}>
                <Grid item>
                    <Chip
                        onClick={searchOk}
                        className={classes.chip}
                        avatar={<Avatar className={classes.okButton} >O</Avatar>}
                        label='optimo' />
                </Grid>
                <Grid item>
                    <Chip
                        onClick={searchWarning}
                        className={classes.chip}
                        avatar={<Avatar className={classes.warningButton} >C</Avatar>}
                        label='cuidado' />
                </Grid>
                <Grid item>
                    <Chip
                        onClick={searchError}
                        className={classes.chip}
                        avatar={<Avatar className={classes.errorButton} >E</Avatar>}
                        label='Error' />
                </Grid>
                <Grid item>
                    <Chip
                        onClick={clearSearch}
                        className={classes.chip}
                        avatar={<Avatar  >L</Avatar>}
                        label='limpiar' />
                </Grid>
            </Grid>
        </div>
    );
}