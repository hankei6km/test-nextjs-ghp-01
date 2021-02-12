import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';
import { pruneClasses } from '../../utils/classes';

// Snackbar だと複数表示が面倒なので作り直す予定

const useStyles = makeStyles(() => ({
  // _app.tsx で SnackbarProvider の className を上書きすることで
  // container 側の幅を 100% まで広げている.
  'MessageBanner-message': { width: '100%', alignSelf: 'center' },
  'MessageBanner-close': { paddingTop: 0, paddingBottom: 0 }
}));
const classNames = ['MessageBanner-message', 'MessageBanner-close'];

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    enqueueSnackbar(message, {
      preventDuplicate: true,
      persist: !autoHide,
      // variant:
      //   variant === 'info'
      //     ? 'info'
      //     : variant === 'warning'
      //     ? 'warning'
      //     : 'error',
      // dense: true,
      //hideIconVariant: true,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      // content: (key, message) => (
      //   <div id={key} className={classes['MessageBanner-message']}>
      //     {message}
      //   </div>
      // ),
      content: (key, message) => (
        <Alert
          id={`${key}`}
          elevation={6}
          variant="filled"
          severity={
            variant === 'info'
              ? 'info'
              : variant === 'warning'
              ? 'warning'
              : 'error'
          }
          className={classes['MessageBanner-message']}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes['MessageBanner-close']}
              onClick={() => closeSnackbar(key)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      )
    });
  }, [enqueueSnackbar, closeSnackbar, message, autoHide, variant, classes]);
  return <></>;
};

export default MessageBanner;
