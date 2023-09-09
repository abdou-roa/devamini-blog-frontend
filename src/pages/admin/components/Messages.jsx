import { Paper, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'

export default function Messages() {
  return (
    <Paper>
        <Typography variant="h5" component="h2">
            messages
        </Typography>
        <List dense={false}>
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />
                </ListItem>
            </List>
    </Paper>
  )
}
