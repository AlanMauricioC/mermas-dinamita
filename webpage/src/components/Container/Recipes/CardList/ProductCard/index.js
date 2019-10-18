import React from 'react';
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';
import { Grid, Grow, CardMedia, Typography, IconButton } from '@material-ui/core';

const ProductCard = ({ card, handleOpenDialog, handleDelete }) => {
	const useStyles = makeStyles({
		root: {
			border: 0,
			boxShadow: '5px 4px 18px -2px rgba(0,0,0,0.75)',
			margin: 10,
			borderRadius: '10px'
		},
		media: {
			height: 0,
			backgroundColor: 'white',
			paddingTop: '70.25%' // 16:9
		}
	});

	const classes = useStyles();
	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Grow in={true}>
				<Card className={classes.root}>
					<CardMedia
                        onClick={e=>handleOpenDialog(card)}
						className={classes.media}
						image={`http://lorempixel.com/400/200/cats/${Math.floor(Math.random() * Math.floor(10))}`}
						title={card.nameRecipe}
					/>
					<CardContent>
						<Grid container>
							<Grid item xs={10} onClick={e=>handleOpenDialog(card)}>
								<Typography variant={'h5'} display={'inline'}>
									{card.nameRecipe}
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<IconButton
									color="primary"
									aria-label="upload picture"
									component="span"
									onClick={(e) => handleDelete(card)}
								>
									<DeleteRoundedIcon color={'secondary'} />
								</IconButton>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grow>
		</Grid>
	);
};
//julioalarcon962@gmail.com
export default ProductCard;
