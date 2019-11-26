import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

export default function ItemSidebar({ option }) {
	const { title, icon, link, enable = true } = option;
	return (
		<Link to={enable ? link : '/'}>
			<ListItem button aria-haspopup="true" disabled={!enable}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={title} />
			</ListItem>
		</Link>
	);
}
