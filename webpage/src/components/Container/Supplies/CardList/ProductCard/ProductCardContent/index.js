import React from 'react'
import { Grid, LinearProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';


const ProductCardContent = ({ content }) => {
    const { min, avg, max, quantity } = content
    const percentage = (quantity / max) * 100

    const BorderLinearProgress = withStyles({
        bar: {
            borderRadius: 20,
            backgroundColor: () => {
                console.log(percentage);

                if (quantity > max || quantity <= min) {
                    return 'red'
                } else if (quantity > min && quantity < avg) {
                    //warning
                    return '#ffbb33'
                } else if (quantity <= max && quantity >= avg) {
                    //Ok
                    return 'green'
                }
            },
        },
    })(LinearProgress);

    return (
        <Grid container direction='row'>
            <Grid container item xs={12} direction='column' alignItems="flex-start">
                <Grid item>
                    <Typography display={"inline"}>
                        Insumo:
                </Typography>
                    <Typography display={"inline"} variant={"inherit"} noWrap>
                        {` ${content.name}`}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography display={"inline"}>
                        Existencias:
                </Typography>
                    <Typography color={"secondary"} display={"inline"} variant='subtitle1'>
                        {`${content.quantity} ${content.unit}`}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <BorderLinearProgress variant="determinate" value={percentage > 100 ? 100 : percentage} />
            </Grid>
        </Grid>
    )
}

export default ProductCardContent