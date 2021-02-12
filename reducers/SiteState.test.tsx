import React, { useEffect } from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  SiteStateContextType,
  SiteStateReducer,
  siteStateInitialState
} from '../reducers/SiteState';

const SiteStateMock = ({
  fn
}: {
  fn: (state: SiteStateContextType) => void;
}) => {
  const [state, dispatch] = React.useReducer(
    SiteStateReducer,
    siteStateInitialState,
    (init) => {
      const newState = { ...init };
      return newState;
    }
  );
  useEffect(() => {
    dispatch({ type: 'notifyClosed', payload: ['abcdef'] });
    return () => {
      fn(state);
    };
  }, [state, fn]);
  return <></>;
};

describe('SiteStateReducer', () => {
  it('reduce closedIds', async () => {
    await act(async () => {
      render(
        <SiteStateMock
          fn={(state) => {
            expect(state.notify.closedIds).toStrictEqual(['abcdef']);
          }}
        />
      );
    });
  });
});
