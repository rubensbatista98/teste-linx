import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    fontSize: theme.typography.body1.fontSize,
    backgroundColor: theme.palette.action.hover,

    '& > p': {
      fontWeight: theme.typography.fontWeightBold,
      textAlign: 'center',
      margin: 0,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(6)
    }
  }
}));
