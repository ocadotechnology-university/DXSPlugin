import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableColumn, Progress, ResponseErrorPanel } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';

export const exampleSurveys = {
  "results": [
    {
      "id": "1",
      "date": {
        "month": "March",
        "year": "2024",
      },
      "status": "Closed",
    },
    {
      "id": "2",
      "date": {
        "month": "April",
        "year": "2024",
      },
      "status": "Opened",
    },
  ]
}

type Survey = {
  id: string;
  date: {
    month: string;
    year: string
  };
  status: string;
}

type DenseTableProps = {
  surveys: Survey[];
};

export const DenseTable = ({ surveys }: DenseTableProps) => {

  const columns: TableColumn[] = [
    { title: 'ID', field: 'id' },
    { title: 'Date', field: 'date' },
    { title: 'Status', field: 'status' },
  ];

  const data = surveys.map(survey => {
    return {
      id: survey.id,
      date: `${survey.date.month} ${survey.date.year}`,
      status: survey.status,
    };
  });

  return (
    <Table
      title="Survey List"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const ExampleFetchComponent = () => {

  const { value, loading, error } = useAsync(async (): Promise<Survey[]> => {
    // Would use fetch in a real world example
    return exampleSurveys.results;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <DenseTable surveys={value || []} />;
};
