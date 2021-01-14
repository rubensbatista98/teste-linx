import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BreweryType } from 'entities/Brewery';

type StylesProps = {
  type: BreweryType;
};

export const BADGE_COLORS = {
  brewpub: {
    color: '#000',
    bg: '#ffdd57'
  },
  contract: {
    color: '#fff',
    bg: '#353535'
  },
  closed: {
    color: '#fff',
    bg: '#e53935'
  },
  micro: {
    color: '#fff',
    bg: '#00d1b1'
  },
  nano: {
    color: '#fff',
    bg: '#7b1fa2'
  },
  planning: {
    color: '#fff',
    bg: '#5d4037'
  },
  proprietor: {
    color: '#fff',
    bg: '#ff3d00'
  },
  regional: {
    color: '#fff',
    bg: '#3173dc'
  }
};

export default makeStyles<Theme, StylesProps>((theme) => ({
  card: {
    maxWidth: '450px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  action: {
    height: '100%',
    userSelect: 'auto'
  },
  header: {
    alignItems: 'flex-start',
    flexGrow: 1
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(2)
  },
  subheader: {
    color: 'inherit'
  },
  address: {
    fontStyle: 'normal'
  },
  divider: {
    height: '1px'
  },
  bagde: (props) => ({
    color: BADGE_COLORS[props.type].color,
    backgroundColor: BADGE_COLORS[props.type].bg,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(1, 2)
  })
}));
