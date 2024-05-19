import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { discoveryApiRef, useApi} from '@backstage/core-plugin-api';
import { Button} from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  HeaderLabel,
  Progress
} from '@backstage/core-components';
import useAsync from 'react-use/esm/useAsync';

import { Alert } from '@material-ui/lab';
import DxsProxyComponent from './DxsProxyComponent';
import useStyles from './styles';
import Question from './Question';
let entity = '';

//survey page
export const SurveyPage = () => {
  const { surveyid, questionid} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationSource = location.state ? location.state.navigationSource : "Browse";
  
  const classes = useStyles();

  const discoveryAPI = useApi(discoveryApiRef);
  const proxyBackendBaseUrl = discoveryAPI.getBaseUrl('dxs');

  const { value, loading, error } = useAsync(async() => {
    const response = await fetch(`${ await proxyBackendBaseUrl}/dxspage/${surveyid}`)

    const jsonData = await response.json();
    
  }, [] );
  
  const goToPreviousPage = () => {
    navigate(`/catalog/default/group/${entity}/dxs`); // Navigate to the previous page
  };

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity='error'/>;
  }
  return (
    <Page themeId="tool">
      <Header title="Survey page" subtitle={`${
          navigationSource === "Edit" ? "Editing" : "Browsing"
        } mode`}>
        <HeaderLabel label="Owner" value="Ocado Technology" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <div className={classes.backButton}>
          <Button onClick={goToPreviousPage}>&lt; Back</Button> {/* Back button */}
        </div>
        <Question questionid = {questionid} surveyid={surveyid}/>
      </Content>
    </Page>
);
}

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to dxs!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Ocado Technology" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
          <DxsProxyComponent />
    </Content>
  </Page>
);


