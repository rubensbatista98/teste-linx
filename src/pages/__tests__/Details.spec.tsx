import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';

import Details from 'pages/Details';
import { renderWithRouter } from 'tests/helpers';
import { breweriesMock } from 'pages/__mocks__/';

enableFetchMocks();

describe('<Details />', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should render all the informations about the brewery', async () => {
    fetch.mockResponseOnce(JSON.stringify(breweriesMock[2]));

    const {
      brewery_type,
      city,
      country,
      state,
      street,
      latitude,
      longitude,
      name,
      website_url,
      postal_code,
      phone
    } = breweriesMock[2];

    renderWithRouter(<Details />);

    const spinner = screen.getByLabelText(/loading/i);

    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner);
    expect(spinner).not.toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: name, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(brewery_type, 'g'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(street, 'g'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(city, 'g'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(state, 'g'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(country, 'g'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(postal_code, 'g'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(phone, 'g'))).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: new RegExp(website_url, 'g')
      })
    ).toHaveAttribute('href', website_url);
    expect(
      screen.getByRole('link', {
        name: /link to google maps with brewery location/i
      })
    ).toHaveAttribute(
      'href',
      `https://www.google.com.br/maps/@${latitude},${longitude},17z`
    );
  });

  it('should render error message when has an error', async () => {
    const message = 'Some error message !';
    fetch.mockRejectOnce(new Error(message));

    renderWithRouter(<Details />);

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(screen.getByRole('heading', { name: message })).toBeInTheDocument();
  });

  it('should go back to previous page when click on back link', async () => {
    const ROUTE = '/breweries/2';
    fetch.mockResponse(JSON.stringify({}));

    renderWithRouter(<Details />, { route: ROUTE });

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(window.location.pathname).toBe(ROUTE);

    window.history.pushState({}, 'Test page', '/breweries/34');

    expect(window.location.pathname).toBe('/breweries/34');

    userEvent.click(
      screen.getByRole('link', { name: /go back to previous page/i })
    );

    // wait for rerender of BrowserRouter finish
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(window.location.pathname).toBe(ROUTE);
  });

  it('should not render some informations when does not have all the data', async () => {
    const breweryWithoutAllData = {
      ...breweriesMock[2],
      street: null,
      city: null,
      state: null,
      postal_code: null,
      website_url: null,
      phone: null,
      latitude: null,
      longitude: null
    };

    fetch.mockResponse(JSON.stringify(breweryWithoutAllData));

    renderWithRouter(<Details />);

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(
      screen.getByRole('heading', {
        name: breweryWithoutAllData.name,
        level: 1
      })
    ).toBeInTheDocument();
    expect(screen.queryByText(/type/i)).toBeInTheDocument();
    expect(screen.queryByText(/country/i)).toBeInTheDocument();

    expect(screen.queryByText(/street/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/city/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^state/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/postal code/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/phone/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/website/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/open in maps/i)).not.toBeInTheDocument();
  });
});
