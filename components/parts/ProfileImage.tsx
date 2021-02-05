import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SiteContext from '../SiteContext';
import Link from '../Link';
import { pruneClasses } from '../../utils/classes';

const useStyles = makeStyles((theme) => ({
  'ProfileImage-root': {
    display: 'inline-block'
  },
  'ProfileImage-image': {
    borderRadius: '9999px'
  },
  'ProfileImage-name': { textAlign: 'center' },
  'ProfileImage-link': {
    opacity: 1,
    color: theme.palette.text.primary,
    // transition: 'opacity .3s',
    '&:hover': { textDecorationLine: 'none', opacity: 0.5 }
  }
}));
const classNames = [
  'ProfileImage-root',
  'ProfileImage-image',
  'ProfileImage-name',
  'ProfileImage-link'
];

type Props = {
  link?: string;
  size?: '' | 'small' | 'large';
  name?: boolean;
  classes?: { [key: string]: string };
};

const ProfileImage = ({
  link = '',
  size = '',
  name = false,
  classes: inClasses
}: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { labels: label, images: image } = useContext(SiteContext);
  const imgNode = (
    <>
      <img
        src={
          size === ''
            ? image.profileImage
            : size === 'small'
            ? image.profileImageSmall
            : image.profileImageLarge
        }
        width={size === '' ? 140 : size === 'small' ? 80 : 240}
        height={size === '' ? 140 : size === 'small' ? 80 : 240}
        alt="profile"
        className={classes['ProfileImage-image']}
      />
      {name && (
        <Typography variant="body1" className={classes['ProfileImage-name']}>
          {label.profileName}
        </Typography>
      )}
    </>
  );
  if (link) {
    return (
      <Box className={classes['ProfileImage-root']}>
        <Link href={link} className={classes['ProfileImage-link']}>
          {imgNode}
        </Link>
      </Box>
    );
  }
  return <Box className={classes['ProfileImage-root']}>{imgNode}</Box>;
};

export default ProfileImage;
