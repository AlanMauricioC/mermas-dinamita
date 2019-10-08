import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";


export default function ItemSidebar({ option }) {

    return (
        <Link to={option.link}>
            <ListItem button aria-haspopup="true">
                <ListItemIcon>
                    {option.icon}
                </ListItemIcon>
                <ListItemText primary={option.title} />
            </ListItem>
        </Link>
    );
    
}