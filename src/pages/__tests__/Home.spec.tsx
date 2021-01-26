import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';

import { renderWithRouter } from 'tests/helpers';
import { breweriesMock } from 'pages/__mocks__';

import Home from 'pages/Home';

enableFetchMocks();

describe('<Home />', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should render the breweries cards', async () => {
    fetch.mockResponse(() => Promise.resolve(JSON.stringify(breweriesMock)));

    renderWithRouter(<Home />);

    const spinner = screen.getByLabelText(/loading/i);

    expect(spinner).toBeInTheDocument();

    await waitForElementToBeRemoved(spinner);

    expect(screen.getAllByLabelText(/brewery type/i)).toHaveLength(5);
    expect(
      screen.getByRole('heading', { name: breweriesMock[2].name, level: 3 })
    ).toBeInTheDocument();
  });

  it('should render error message when has an error', async () => {
    fetch.mockResponse(() => Promise.reject(new Error('Some weird error!')));

    renderWithRouter(<Home />);

    const spinner = screen.getByLabelText(/loading/i);

    expect(spinner).toBeInTheDocument();

    await waitForElementToBeRemoved(spinner);

    expect(
      screen.getByRole('heading', { name: /some weird error/i, level: 1 })
    );
  });

  it('should go to details page when click on a brewery card', async () => {
    fetch.mockResponse(() => Promise.resolve(JSON.stringify(breweriesMock)));

    renderWithRouter(<Home />);

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    const breweryCard = screen.getByLabelText(/^go to king street.+ details$/i);

    userEvent.click(breweryCard);

    expect(window.location.pathname).toBe(`/breweries/${breweriesMock[4].id}`);
  });

  it('should fetch breweries by page when uses pagination', async () => {
    fetch.mockResponse(JSON.stringify(breweriesMock));

    renderWithRouter(<Home />);

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    const pageOneLink = screen.getByLabelText(/page 1/i);
    const pageTwoLink = screen.getByLabelText(/page 2/i);

    expect(pageOneLink).toHaveAttribute('aria-current', 'true');
    expect(pageTwoLink).not.toHaveAttribute('aria-current');

    userEvent.click(pageTwoLink);

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(pageOneLink).not.toHaveAttribute('aria-current');
    expect(pageTwoLink).toHaveAttribute('aria-current', 'true');

    expect(new URLSearchParams(window.location.search).get('page')).toBe('2');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.openbrewerydb.org/breweries?page=2'
    );
  });

  it('should fetch breweries by type when filter', async () => {
    fetch.mockResponse(JSON.stringify(breweriesMock));

    renderWithRouter(<Home />);

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    userEvent.selectOptions(screen.getByLabelText(/filter/i), 'micro');
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(screen.getByLabelText(/filter/i)).toHaveValue('micro');
    expect(new URLSearchParams(window.location.search).get('filter')).toBe(
      'micro'
    );
    expect(fetch).toHaveBeenCalledWith(
      'https://api.openbrewerydb.org/breweries?by_type=micro'
    );

    userEvent.selectOptions(screen.getByLabelText(/filter/i), '');

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(screen.getByLabelText(/filter/i)).toHaveValue('');
    expect(window.location.pathname).toBe('/');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.openbrewerydb.org/breweries'
    );
  });

  it('should render message when has no breweries', async () => {
    fetch.mockResponse(JSON.stringify([]));

    renderWithRouter(<Home />);

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(
      screen.getByRole('heading', { name: /no breweries found/i })
    ).toBeInTheDocument();
  });
});
