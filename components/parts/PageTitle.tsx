import React, { useContext, ElementType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import SectionContext from '../SectionContext';
import Link from '../Link';
import { pruneClasses } from '../../utils/classes';
import PageContext from '../PageContext';

const useStyles = makeStyles((theme) => ({
  'PageTitle-root': {},

  'PageTitle-link': {
    opacity: 1,
    color: theme.palette.text.primary,
    // transition: 'opacity .3s',
    '&:hover': { textDecorationLine: 'none', opacity: 0.5 }
  }
}));
const classNames = ['PageTitle-root', 'PageTitle-link'];

export type PageTitleComponent = {
  pageTitleComponent: ElementType<any>;
};
export type PageTitleVariant = {
  pageTitleVariant: TypographyProps['variant'];
};

type Props = {
  link?: string;
  classes?: { [key: string]: string };
};

const PageTitle = ({ link = '', classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { title } = useContext(PageContext);
  const { component, variant } = useContext(SectionContext);
  return (
    <Typography
      component={component.pageTitleComponent}
      variant={variant.pageTitleVariant}
      className={classes['PageTitle-root']}
    >
      {link ? (
        <Link href={link} className={classes['PageTitle-link']}>
          {title}
        </Link>
      ) : (
        title
      )}
    </Typography>
  );
};

export default PageTitle;
