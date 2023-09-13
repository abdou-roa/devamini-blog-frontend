import React from 'react'
import Grid from '@mui/material/Grid';

import Posts from './Posts';
import Messages from './Messages';

export default function DashboardIndex() {
  return (
    <Grid container spacing={2}>
        {/* posts */}
        <Grid item sm={6} xs={12}>
            <Posts/>
        </Grid>
        {/* messages */}
        <Grid item sm={6} xs={12}>
            <Messages/>
        </Grid>
    </Grid>
  )
}
