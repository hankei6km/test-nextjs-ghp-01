import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SnackbarProvider } from 'notistack';
import SiteStateContext, {
  SiteStateDispatch,
  siteStateInitialState
} from '../../reducers/SiteState';

import Notification from './Notification';

describe('Notification', () => {
  jest.useFakeTimers();
  it('renders notification', async () => {
    await act(async () => {
      const { container, queryByRole, getByText } = render(
        (() => {
          return (
            <SnackbarProvider
              maxSnack={3}
              dense
              hideIconVariant
              // classes={{ containerRoot: classes.containerRoot }}
            >
              <Notification
                title=""
                messageHtml="test1"
                serverity="info"
                autoHide={false}
                notificationId="test1id"
              />
            </SnackbarProvider>
          );
        })()
      );
      // useEffect 待ち
      jest.advanceTimersByTime(1000);
      expect(queryByRole('alert')).toBeInTheDocument();
      expect(getByText('test1')).toBeInTheDocument();
      expect(
        container.querySelector('[class*=Notification-title]')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('[class*=Notification-simple-message]')
      ).toBeInTheDocument();
      jest.advanceTimersByTime(6000);
      expect(queryByRole('alert')).toBeInTheDocument();
    });
  });
  it('renders notification(title + message)', async () => {
    await act(async () => {
      const { container, queryByRole, getByText } = render(
        (() => {
          return (
            <SnackbarProvider
              maxSnack={3}
              dense
              hideIconVariant
              // classes={{ containerRoot: classes.containerRoot }}
            >
              <Notification
                title="title1"
                messageHtml="test1"
                serverity="info"
                autoHide={false}
                notificationId="test1id"
              />
            </SnackbarProvider>
          );
        })()
      );
      // useEffect 待ち
      jest.advanceTimersByTime(1000);
      expect(queryByRole('alert')).toBeInTheDocument();
      expect(getByText('title1')).toBeInTheDocument();
      expect(getByText('test1')).toBeInTheDocument();
      expect(
        container.querySelector('[class*=Notification-title]')
      ).toBeInTheDocument();
      expect(
        container.querySelector('[class*=Notification-simple-message]')
      ).not.toBeInTheDocument();
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
              <Notification
                title=""
                messageHtml="test1"
                serverity="info"
                autoHide={true}
                notificationId="test1id"
              />
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
  it('should regist closed id to state', async () => {
    const dispatch = jest.fn();
    await act(async () => {
      const { getByRole } = render(
        <SiteStateDispatch.Provider value={dispatch}>
          <SnackbarProvider
            maxSnack={3}
            dense
            hideIconVariant
            // classes={{ containerRoot: classes.containerRoot }}
          >
            <Notification
              title=""
              messageHtml="test1"
              serverity="info"
              autoHide={true}
              notificationId="test1id"
            />
          </SnackbarProvider>
        </SiteStateDispatch.Provider>
      );
      // useEffect 待ち
      jest.advanceTimersByTime(1000);
      const close = getByRole('button');
      expect(close).toBeInTheDocument();
      fireEvent.click(close);
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'notifyClosed',
      payload: ['test1id']
    });
  });
  it('should not notify', async () => {
    await act(async () => {
      const { queryByRole } = render(
        <SiteStateContext.Provider
          value={{
            ...siteStateInitialState,
            notify: { closedIds: ['test1id'] }
          }}
        >
          <SnackbarProvider
            maxSnack={3}
            dense
            hideIconVariant
            // classes={{ containerRoot: classes.containerRoot }}
          >
            <Notification
              title=""
              messageHtml="test1"
              serverity="info"
              autoHide={true}
              notificationId="test1id"
            />
          </SnackbarProvider>
        </SiteStateContext.Provider>
      );
      // useEffect 待ち
      jest.advanceTimersByTime(1000);
      expect(queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
