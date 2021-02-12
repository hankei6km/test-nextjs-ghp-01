import React from 'react';

// notification の再表示を抑制するためだけに作った.
// おそらく notification はプレビューモードの通知以外に
// (コンテンツとしての表示として)使うことはないと思うので、
// 現状では永続化はしていない

export type SiteStateContextType = {
  notify: {
    closedIds: string[];
  };
};

export const siteStateInitialState: SiteStateContextType = {
  notify: { closedIds: [] }
};

export const SiteStateDispatch = React.createContext<React.Dispatch<ActType>>(
  (_a: ActType) => {}
);

type ActTypeNotifyClosed = {
  type: 'notifyClosed';
  payload: [string];
};

type ActType = ActTypeNotifyClosed;

export function SiteStateReducer(
  state: SiteStateContextType,
  action: ActType
): SiteStateContextType {
  switch (action.type) {
    case 'notifyClosed':
      state.notify.closedIds.push(action.payload[0]);
      break;
  }
  return state;
}

const SiteStateContext = React.createContext(siteStateInitialState);

export default SiteStateContext;
