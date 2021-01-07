import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';

import useStyles from './styles';

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" classes={{ root: classes.root }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters classes={{ root: classes.toolBar }}>
          <Typography
            classes={{ root: classes.title }}
            component="h1"
            variant="h5"
          >
            Breweries
          </Typography>

          <Typography component="h2" variant="subtitle1">
            A breweries list by Open Brewery DB
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
