import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: '#221d1e',
    boxShadow: theme.shadows[0]
  },
  toolBar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '136px'
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
