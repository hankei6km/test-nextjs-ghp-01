import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SiteContext from '../SiteContext';
import Link from '../Link';
import { pruneClasses } from '../../utils/classes';

const useStyles = makeStyles((theme) => ({
  'SiteLogo-image': {},
  'SiteLogo-link': {
    opacity: 1,
    color: theme.palette.text.primary,
    // transition: 'opacity .3s',
    '&:hover': { textDecorationLine: 'none', opacity: 0.5 }
  }
}));
const classNames = ['SiteLogo-image', 'SiteLogo-link'];

type Props = {
  link?: string;
  size?: '' | 'small' | 'large';
  classes?: { [key: string]: string };
};

const SiteLogo = ({ link = '', size = '', classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { labels: label, images: image } = useContext(SiteContext);
  const imgNode = (
    <img
      src={
        size === ''
          ? image.siteLogo
          : size === 'small'
          ? image.siteLogoSmall
          : image.siteLogLarge
      }
      width={size === '' ? 80 : size === 'small' ? 50 : 140}
      height={size === '' ? 80 : size === 'small' ? 50 : 140}
      alt={`${label.siteTitle} logo`}
      className={classes['SiteLogo-image']}
    />
  );
  if (link) {
    return (
      <Link href={link} className={classes['SiteLogo-link']}>
        {imgNode}
      </Link>
    );
  }
  return imgNode;
};

export default SiteLogo;
