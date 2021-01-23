import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@material-ui/core';

import BreweryCard from 'components/BreweryCard';

import { Brewery } from 'entities';
import { useFetch } from 'utils/hooks';

function Home() {
  const { data: breweries, status, error } = useFetch<Brewery[]>('breweries');
  const history = useHistory();

  const isLoading = status === 'pending';

  if (status === 'rejected') {
    return (
      <Typography component="h1" variant="h4" align="center">
        {error}
      </Typography>
    );
  }

  function handleClick(id: number) {
    history.push(`breweries/${id}`);
  }

  return (
    <Grid
      container
      spacing={2}
      component="section"
      aria-describedby={isLoading ? '#progress' : undefined}
      aria-busy={isLoading}
      aria-live="polite"
    >
      {isLoading ? (
        <Grid item container justify="center">
          <CircularProgress id="progress" aria-label="loading" size={50} />
        </Grid>
      ) : (
        breweries?.map((brewery) => (
          <Grid key={brewery.id} item xs={12} sm={6} md={4} lg={3}>
            <BreweryCard {...brewery} onClick={handleClick} />
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default Home;
