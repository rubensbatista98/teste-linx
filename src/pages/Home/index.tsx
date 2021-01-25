import { Link, useHistory, useLocation } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';

import BreweryCard from 'components/BreweryCard';

import { Brewery } from 'entities';
import { useFetch } from 'utils/hooks';

function Home() {
  const history = useHistory();
  const location = useLocation();

  const pageQuery = location.search
    ? new URLSearchParams(location.search).get('page')
    : null;

  const ENDPOINT = `breweries${pageQuery ? `?page=${pageQuery}` : ''}`;

  const { data: breweries, status, error } = useFetch<Brewery[]>(ENDPOINT);

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
    <>
      <Grid
        container
        spacing={2}
        component="section"
        justify="center"
        aria-describedby={isLoading ? '#progress' : undefined}
        aria-busy={isLoading}
        aria-live="polite"
      >
        {isLoading ? (
          <Grid item container justify="center">
            <CircularProgress id="progress" aria-label="loading" size={50} />
          </Grid>
        ) : (
          <>
            {breweries?.map((brewery) => (
              <Grid key={brewery.id} item xs={12} sm={6} md={4} lg={3}>
                <BreweryCard {...brewery} onClick={handleClick} />
              </Grid>
            ))}

            <Pagination
              page={pageQuery ? Number(pageQuery) : 1}
              count={3}
              hideNextButton
              hidePrevButton
              shape="rounded"
              color="primary"
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/breweries${
                    item.page === 1 ? '' : `?page=${item.page}`
                  }`}
                  {...item}
                />
              )}
            />
          </>
        )}
      </Grid>
    </>
  );
}

export default Home;
