import React from 'react';
import { Container, Grid } from '@material-ui/core';

import Header from 'components/Header';
import Footer from 'components/Footer';

import useStyles from './styles';

type BaseLayoutProps = {
  children: JSX.Element;
};

function BaseLayout({ children }: BaseLayoutProps) {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.gridWrapper}>
      <Header />

      <Container maxWidth="lg" className={classes.container}>
        <main>{children}</main>
      </Container>

      <Footer />
    </Grid>
  );
}

export default BaseLayout;
