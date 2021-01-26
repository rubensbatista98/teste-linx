import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography
} from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';

import BreweryCard from 'components/BreweryCard';

import { Brewery } from 'entities';
// importing from the entities index file gives a webpack error
import { BREWERY_TYPES } from 'entities/Brewery';
import { useFetch } from 'utils/hooks';

function Home() {
  const history = useHistory();
  const location = useLocation();

  const searchParams = location.search
    ? new URLSearchParams(location.search)
    : null;

  const filter = searchParams?.get('filter') ?? '';
  const shouldFilter = Boolean(filter);
  const page = searchParams?.get('page') ?? 1;

  const QUERY = location.search
    ? shouldFilter
      ? `?by_type=${filter}`
      : `?page=${page}`
    : '';

  const { data: breweries, status, error } = useFetch<Brewery[]>(
    `breweries${QUERY}`
  );

  const isLoading = status === 'pending';

  if (status === 'rejected') {
    return (
      <Typography component="h1" variant="h4" align="center">
        {error}
      </Typography>
    );
  }

  function goToDetails(id: number) {
    history.push(`breweries/${id}`);
  }

  function handleFilter(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    const { value } = event.target;
    value ? history.push(`/breweries?filter=${value}`) : history.push('/');
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
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor="filter">Filter</InputLabel>
                <Select
                  native
                  value={filter}
                  onChange={handleFilter}
                  inputProps={{
                    name: 'filter',
                    id: 'filter'
                  }}
                >
                  <option aria-label="None" value="" />

                  {BREWERY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {breweries?.length ? (
              breweries?.map((brewery) => (
                <Grid key={brewery.id} item xs={12} sm={6} md={4} lg={3}>
                  <BreweryCard {...brewery} onClick={goToDetails} />
                </Grid>
              ))
            ) : (
              <Typography component="h1" variant="h4">
                No breweries found.
              </Typography>
            )}

            {shouldFilter ? null : (
              <Grid item container xs={12} justify="center">
                <Pagination
                  page={Number(page)}
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
              </Grid>
            )}
          </>
        )}
      </Grid>
    </>
  );
}

export default Home;
