import React from 'react';
import Grid from '@material-ui/core/Grid';
import { HomePageCompanyLogo } from '@backstage/plugin-home';
import { BazaarOverviewCard } from '@backstage/plugin-bazaar';

export const HomePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <HomePageCompanyLogo />
    </Grid>
    <Grid item xs={12} md={6}>
        <BazaarOverviewCard order='latest'/>
    </Grid>

    <Grid item xs={12} >
        <BazaarOverviewCard title='My Orgs Projects' order='random' fullWidth fullHeight />
+   </Grid>
  </Grid>
);