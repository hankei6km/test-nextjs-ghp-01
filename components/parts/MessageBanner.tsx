import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { pruneClasses } from '../../utils/classes';

// Snackbar だと複数表示が面倒なので作り直す予定

const useStyles = makeStyles(() => ({
  'MessageBanner-root': {
    top: 0,
    width: '100%'
  },
  'MessageBanner-alert': {
    width: '100%'
  },
  'MessageBanner-close': {
    paddingTop: 0,
    paddingBottom: 0
  }
}));
const classNames = [
  'MessageBanner-root',
  'MessageBanner-alert',
  'MessageBanner-close'
];

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type Props = {
  message: string;
  variant: 'info' | 'warning' | 'alert';
  autoHide?: boolean;
  classes?: { [key: string]: string };
};

const MessageBanner = ({
  message,
  variant,
  autoHide = false,
  classes: inClasses
}: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const [open, setOpen] = useState(true);
  const severity =
    variant === 'info' ? 'info' : variant === 'warning' ? 'warning' : 'error';
  return (
    <Snackbar
      open={open}
      onClose={(_e, reason) => reason === 'timeout' && setOpen(false)}
      autoHideDuration={autoHide ? 10 * 1000 : null}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      className={classes['MessageBanner-root']}
    >
      <Alert
        severity={severity}
        className={classes['MessageBanner-alert']}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes['MessageBanner-close']}
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Typography variant="body1"> {`${message}`}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default MessageBanner;
