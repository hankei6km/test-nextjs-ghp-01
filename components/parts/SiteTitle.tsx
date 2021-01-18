import React, { useContext, ElementType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import SiteContext from '../SiteContext';
import SectionContext from '../SectionContext';
import Link from '../Link';
import { pruneClasses } from '../../utils/classes';

const useStyles = makeStyles(() => ({
  'SiteTitle-root': {}
}));
const classNames = ['SiteTitle-root'];

export type SiteTitleComponent = {
  siteTitleComponent: ElementType<any>;
};
export type SiteTitleVariant = {
  siteTitleVariant: TypographyProps['variant'];
};

type Props = {
  link?: string;
  classes?: { [key: string]: string };
};

const SiteTitle = ({ link = '', classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { label } = useContext(SiteContext);
  const { component, variant } = useContext(SectionContext);
  return (
    <Typography
      component={component.siteTitleComponent}
      variant={variant.siteTitleVariant}
      className={classes['SiteTitle-root']}
    >
      {link ? <Link href={link}>{label.siteTitle}</Link> : label.siteTitle}
    </Typography>
  );
};

export default SiteTitle;
