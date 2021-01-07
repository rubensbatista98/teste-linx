import useStyles from './styles';

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <p>Breweries List</p>
    </footer>
  );
}

export default Footer;
