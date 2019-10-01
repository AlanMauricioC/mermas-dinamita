import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


export default function ItemSidebar({ option }) {

    return (
        <div>
            <ListItem button aria-haspopup="true">
                <ListItemIcon>
                    {option.icon}
                </ListItemIcon>
                <ListItemText primary={option.title} />
            </ListItem>
        </div>
    );
    
}