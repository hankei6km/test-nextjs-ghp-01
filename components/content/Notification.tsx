import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';
import { pruneClasses } from '../../utils/classes';
import SiteStateContext, { SiteStateDispatch } from '../../reducers/SiteState';

// Snackbar だと複数表示が面倒なので作り直す予定

const useStyles = makeStyles((theme) => ({
  // _app.tsx で SnackbarProvider の className を上書きすることで
  // container 側の幅を 100% まで広げている.
  'Notification-outer': {},
  'Notification-message': {
    ...theme.typography.body1,
    '& a': {
      // color: theme.palette.primary.main
      // color: theme.palette.text.secondary
      color: 'inherit'
    }
  },
  'Notification-close': { paddingTop: 0, paddingBottom: 0 }
}));
const classNames = [
  'Notification-outer',
  'Notification-message',
  'Notification-close'
];

type Props = {
  message: string;
  serverity: 'info' | 'warning' | 'alert';
  autoHide: boolean;
  notificationId: string;
  classes?: { [key: string]: string };
};

const Notification = ({
  message,
  serverity: variant,
  autoHide = false,
  notificationId,
  classes: inClasses
}: Props) => {
  const state = useContext(SiteStateContext);
  const dispatch = useContext(SiteStateDispatch);
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (!state.notify.closedIds.some((id) => id === notificationId)) {
      enqueueSnackbar(message, {
        preventDuplicate: true,
        persist: !autoHide,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        content: (key, message) => (
          <Alert
            id={`${key}`}
            icon={false}
            elevation={6}
            variant="filled"
            severity={
              variant === 'info'
                ? 'info'
                : variant === 'warning'
                ? 'warning'
                : 'error'
            }
            className={classes['Notification-outer']}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                className={classes['Notification-close']}
                onClick={() => {
                  closeSnackbar(key);
                  dispatch({ type: 'notifyClosed', payload: [notificationId] });
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {typeof message === 'string' ? (
              <div
                className={classes['Notification-message']}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            ) : (
              { message }
            )}
          </Alert>
        )
      });
    }
  }, [
    state,
    dispatch,
    notificationId,
    enqueueSnackbar,
    closeSnackbar,
    message,
    autoHide,
    variant,
    classes
  ]);
  return <></>;
};

export default Notification;
