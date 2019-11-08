import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Grid, Divider, Typography, IconButton } from '@material-ui/core';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

const StockNotification = ({id, name, expectedQuantity=0, actualQuantity=0, handleOnDelete,onClose }) => {
	const style = {
		stripe: {
            height:'100%',
            width:'30%',
            backgroundColor:'orange',

		},
		root: {
			margin: 10
		}
	};

	return (
		<div>
			<Link to={`/insumos`}>
				<Paper style={style.root} onClick={onClose} >
					<Grid container direction="row">
						<Grid item xs={1}>
							<div style={style.stripe}/>
						</Grid>
						<Grid item xs={9}>
							<Grid container direction="column" justify="flex-start" alignItems="flex-start">
								<Grid item xs={12}>
									<Typography variant="body1" display="inline">
										Insumo:
									</Typography>
									<Typography variant="caption" display="inline">
										{` ${name}`}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1" display="inline">
										Cantidad actual:
									</Typography>
									<Typography variant="caption" display="inline">
										{` ${actualQuantity}`}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1" display="inline">
										Para llegar al optimo:
									</Typography>
									<Typography variant="caption" display="inline">
										{` ${expectedQuantity}`}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={2}>
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="span"
								onClick={handleOnDelete(id)}
							>
								<HighlightOffRoundedIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Paper>
			</Link>
		</div>
	);
};

export default StockNotification;
