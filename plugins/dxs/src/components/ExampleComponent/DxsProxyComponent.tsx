import React, { useEffect, useState } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';
import { discoveryApiRef, useApi} from '@backstage/core-plugin-api';
import { ListItem } from '@material-ui/core';
import { Table, TableColumn, TableFilter, TableState} from '@backstage/core-components';
import {useAsyncEntity} from '@backstage/plugin-catalog-react';
import {
  Progress,
  StatusOK,
  StatusAborted
} from '@backstage/core-components';
import useAsync from 'react-use/esm/useAsync';

import { Alert } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import useStyles from './styles';

import Typography from '@mui/material/Typography';
import { DefaultBodyType } from 'msw';
import Question from './Question';

export let entity = '';

//main page
const DxsProxyComponent = () => {  
  const navigate = useNavigate();
  const classes = useStyles();

  const discoveryAPI = useApi(discoveryApiRef);
  const proxyBackendBaseUrl = discoveryAPI.getBaseUrl('dxs');

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  entity = useAsyncEntity().entity.metadata.name;

  const { value, loading, error } = useAsync(async() => {
    
    let currentTeamId = -1;
    const teamIdToNameMap = {};
    const teamNamesResponse = await fetch(`${await proxyBackendBaseUrl}/teamname/${entity}`);
    const teamNamesData = await teamNamesResponse.json();
    teamNamesData.forEach((team: any ) => {
            teamIdToNameMap[team.team_id] = team.team_name;
            if(team.team_name === entity){
              currentTeamId = team.team_id;
            }
            
        });
      
    const response = await fetch(`${ await proxyBackendBaseUrl}/surveys/${currentTeamId}`)
    const jsonData = await response.json();

    const filteredData = jsonData.filter((survey: any) => {
      const teamName = teamIdToNameMap[survey.team_id];
      return teamName === entity;
    });
    
    const columns: TableColumn[] = [
      {
        title: 'Date',
        field: 'date',
        render: (row: any) => (
          <>
          {new Date(row.date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
          </>
      )},
      {
        title: 'Team ID',
        field: 'team_id',
        render: (row: any) => (
          <>{row.team_id}</>
      )
      },
      {
        title: 'Status',
        field: "status",
        render: (row: any) => (
          <Box display="flex" alignItems="center">
            {(currentMonth === new Date(row.date).getMonth() && currentYear === new Date(row.date).getFullYear()) ?
              <StatusOK />
             : 
              <StatusAborted />
            }
            <Typography variant="body2">
              {(currentMonth === new Date(row.date).getMonth() && currentYear === new Date(row.date).getFullYear()) ?
                "open"
              : 
                "closed"
              }
            </Typography>
          </Box>
        ),
      },
      {
        title: 'Options',
        field: 'options',
        render: (row: any) => (
          <ListItem >
            <div style={{ marginRight: '50px' }}>
              <IconButton size="large" onClick={() => navigate(`/dxspage/${row.survey_id}/1`, { state: { navigationSource: "Browse" } })}>
                <VisibilityIcon/>
              </IconButton>
            </div>
            {row.team_id === entity && currentMonth === new Date(row.date).getMonth() && currentYear === new Date(row.date).getFullYear() && (
              <IconButton size="large" onClick={() => navigate(`/dxspage/${row.survey_id}/1`, { state: { navigationSource: "Edit" } })}>
                <EditIcon/>
              </IconButton>
            )}
          </ListItem>
        )
        }];

    // Sort filtered list of surveys
    const data = filteredData.map((singleData: { survey_id: any; date: any; team_id: any; }) => {
      return {
        survey_id: singleData.survey_id,
        date: new Date(singleData.date).toLocaleString('en-US', { month: 'long', year: 'numeric' }),
        team_id: teamIdToNameMap[singleData.team_id],
      };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
      <div className={classes.container}>
        <Table
          options={{ paging: false}}
          data={data}
          columns={columns}
          title="Survey list"
        />
      </div>
    );
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity='error'/>;
  }
  return value;
}

  export default DxsProxyComponent;