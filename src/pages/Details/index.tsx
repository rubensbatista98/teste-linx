import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Paper,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

import { Brewery } from 'entities';
import { useFetch } from 'utils/hooks';

function getMapsLink(brewery: Brewery) {
  return `https://www.google.com.br/maps/@${brewery.latitude},${brewery.longitude},17z`;
}

function Details() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { data: brewery, status, error } = useFetch<Brewery>(`breweries/${id}`);

  const isLoading = status === 'pending';

  if (status === 'rejected')
    return (
      <Typography align="center" component="h1" variant="h3">
        {error}
      </Typography>
    );

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();

    history.goBack();
  }

  return (
    <section
      aria-describedby={isLoading ? '#progress' : undefined}
      aria-busy={isLoading}
      aria-live="polite"
    >
      {isLoading ? (
        <CircularProgress
          style={{ display: 'block', margin: '0 auto' }}
          id="progress"
          aria-label="loading"
          size={50}
        />
      ) : (
        <div>
          <Link
            style={{ display: 'inline-flex', alignItems: 'center' }}
            href="#"
            title="Go back to previous page"
            color="inherit"
            variant="body1"
            onClick={handleClick}
          >
            <ArrowBack fontSize="small" style={{ marginRight: '5px' }} /> Back
          </Link>

          <Paper elevation={3}>
            <Box component="section" paddingX={2} paddingY={3} marginTop={1}>
              <Typography component="h1" variant="h3" gutterBottom>
                {brewery?.name}
              </Typography>

              <Typography>Type: {brewery?.brewery_type}</Typography>

              {brewery?.street ? (
                <Typography>Street: {brewery?.street}</Typography>
              ) : null}

              {brewery?.city ? (
                <Typography>City: {brewery?.city}</Typography>
              ) : null}

              {brewery?.state ? (
                <Typography>State: {brewery?.state}</Typography>
              ) : null}

              {brewery?.postal_code ? (
                <Typography>Postal code: {brewery?.postal_code}</Typography>
              ) : null}

              <Typography>Country: {brewery?.country}</Typography>

              {brewery?.website_url ? (
                <Typography>
                  Website:{' '}
                  <Link target="_blank" href={brewery?.website_url}>
                    {brewery?.website_url}
                  </Link>
                </Typography>
              ) : null}

              {brewery?.phone ? (
                <Typography>Phone: {brewery?.phone}</Typography>
              ) : null}

              {brewery?.longitude && brewery?.latitude ? (
                <Typography>
                  Open in maps:{' '}
                  <Link
                    target="_blank"
                    title="Link to Google Maps with brewery location"
                    href={getMapsLink(brewery)}
                  >
                    {brewery?.longitude},{brewery?.latitude}
                  </Link>
                </Typography>
              ) : null}
            </Box>
          </Paper>
        </div>
      )}
    </section>
  );
}

export default Details;
