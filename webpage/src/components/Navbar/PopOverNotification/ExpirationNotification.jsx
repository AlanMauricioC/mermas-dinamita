import React from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Grid, Typography, IconButton } from '@material-ui/core';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

const ExpirationNotification = ({id, name, expirationDate, handleOnDelete,onClose }) => {
    const style = {
		stripe: {
            height:'100%',
            width:'30%',
            backgroundColor:'red',
		},
		root: {
			margin: 10
		}
	};
    return (
        <div>
			<Link to={`/ordenes`}>
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
										Caduca:
									</Typography>
									<Typography variant="caption" display="inline">
										{` ${expirationDate}`}
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

export default ExpirationNotification;