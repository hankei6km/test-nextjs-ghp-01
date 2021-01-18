import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Date from './Date';

type Props = {
  updated: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '10em',
    maxWidth: '16em',
    overflow: 'hidden',
    '& > .MuiTypography-root': {
      width: '100%',
      marginLeft: theme.spacing(1)
    }
  }
}));

const DateUpdated = ({ updated }: Props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(typeof window === 'undefined');
  }, []);
  return (
    <Box className={classes.root} display="flex" alignItems="center">
      <AccessTimeIcon fontSize="small" color="action" />
      <Typography component="div" variant="body2">
        {loading ? <Skeleton /> : <Date dateString={updated} />}
      </Typography>
    </Box>
  );
};

export default DateUpdated;
