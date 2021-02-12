import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { ThemeProvider } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

// import theme from '../../src/theme';
import Notification from './Notification';

describe('Notification', () => {
  jest.useFakeTimers();
  it('renders notification', async () => {
    await act(async () => {
      const { queryByRole, getByText } = render(
        (() => {
          return (
            <SnackbarProvider
              maxSnack={3}
              dense
              hideIconVariant
              // classes={{ containerRoot: classes.containerRoot }}
            >
              <Notification message="test1" serverity="info" />
            </SnackbarProvider>
          );
        })()
      );
      // useEffect 待ち
      jest.advanceTimersByTime(1000);
      expect(queryByRole('alert')).toBeInTheDocument();
      expect(getByText('test1')).toBeInTheDocument();
      jest.advanceTimersByTime(6000);
      expect(queryByRole('alert')).toBeInTheDocument();
    });
  });
  it('renders notification with autoHide', async () => {
    await act(async () => {
      const { queryByRole, getByText } = render(
        (() => {
          return (
            <SnackbarProvider
              maxSnack={3}
              dense
              hideIconVariant
              // classes={{ containerRoot: classes.containerRoot }}
            >
              <Notification message="test1" serverity="info" autoHide={true} />
            </SnackbarProvider>
          );
        })()
      );
      // useEffect 待ち
      jest.advanceTimersByTime(1000);
      expect(queryByRole('alert')).toBeInTheDocument();
      expect(getByText('test1')).toBeInTheDocument();
      jest.advanceTimersByTime(6000);
      expect(queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
