import React, { useEffect, useState } from 'react';
import { makeStyles, Button, ListItem } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import LinearProgress from '@mui/material/LinearProgress';
//progress bar
export default function LinearDeterminate() {
    const [progress, setProgress] = React.useState(0);
  
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    );
  }
  
  //styles
  const useStyles = makeStyles(theme => ({
      container: {
        width: '100%',
        alignItems: 'center',
      },
      empty: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      backButton: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
      },
    }));


