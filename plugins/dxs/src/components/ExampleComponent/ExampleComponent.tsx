import React, { useEffect } from 'react';
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
import { entity1 } from './DxsProxyComponent';

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

    const response1 = await fetch(`${ await proxyBackendBaseUrl}/getdate/${surveyid}`)
    const jsonData1 = await response1.json();
    return new Date(jsonData1.response[0].date).toLocaleString('en-US', { month: 'long', year: 'numeric' });

  }, [] );

  const date = value;
  
  const goToPreviousPage = () => {
    navigate(`/catalog/default/group/${entity1}/dxs`); // Navigate to the previous page
  };


  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity='error'/>;
  }
  return (
    <Page themeId="tool">
      <Header title={`Group ${entity1} / Date - ${date}`} subtitle={`${
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
    <Content>
          <DxsProxyComponent />
    </Content>
  </Page>
);

