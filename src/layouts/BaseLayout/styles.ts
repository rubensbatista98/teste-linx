import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  gridWrapper: {
    minHeight: '100vh'
  },
  container: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}));
