import React from 'react';
import { PageData, blankPageData } from '../types/pageTypes';

export const pageContextDefault: PageData = blankPageData();

const PageContext = React.createContext(pageContextDefault);
export default PageContext;
