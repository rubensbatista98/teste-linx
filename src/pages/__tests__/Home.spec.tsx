import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';

import Home from 'pages/Home';
import { Brewery } from 'entities';

type RouterOptions = {
  route?: string;
};

function renderWithRouter(ui: React.ReactElement, options: RouterOptions = {}) {
  const { route = '/' } = options;
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
}

enableFetchMocks();

const mockBreweries: Brewery[] = [
  {
    id: 2,
    name: 'Avondale Brewing Co',
    brewery_type: 'micro',
    street: '201 41st St S',
    city: 'Birmingham',
    state: 'Alabama',
    postal_code: '35222-1932',
    country: 'United States',
    longitude: '-86.774322',
    latitude: '33.524521',
    phone: '2057775456',
    website_url: 'http://www.avondalebrewing.com'
  },
  {
    id: 44,
    name: 'Trim Tab Brewing',
    brewery_type: 'micro',
    street: '2721 5th Ave S',
    city: 'Birmingham',
    state: 'Alabama',
    postal_code: '35233-3401',
    country: 'United States',
    longitude: '-86.7914000624146',
    latitude: '33.5128492349817',
    phone: '2057030536',
    website_url: 'http://www.trimtabbrewing.com'
  },
  {
    id: 46,
    name: 'Yellowhammer Brewery',
    brewery_type: 'micro',
    street: '2600 Clinton Ave W',
    city: 'Huntsville',
    state: 'Alabama',
    postal_code: '35805-3046',
    country: 'United States',
    longitude: '-86.5932014',
    latitude: '34.7277523',
    phone: '2569755950',
    website_url: 'http://www.yellowhammerbrewery.com'
  },
  {
    id: 55,
    name: 'Bearpaw River Brewing Co',
    brewery_type: 'micro',
    street: '4605 E Palmer Wasilla Hwy',
    city: 'Wasilla',
    state: 'Alaska',
    postal_code: '99654-7679',
    country: 'United States',
    longitude: '-149.4127103',
    latitude: '61.5752695',
    phone: '',
    website_url: 'http://bearpawriverbrewing.com'
  },
  {
    id: 76,
    name: 'King Street Brewing Co',
    brewery_type: 'micro',
    street: '9050 King Street',
    city: 'Anchorage',
    state: 'Alaska',
    postal_code: '99515',
    country: 'United States',
    longitude: '-149.879076042937',
    latitude: '61.1384893547315',
    phone: '9073365464',
    website_url: 'http://www.kingstreetbrewing.com'
  }
];

describe('<Home />', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should render the breweries cards', async () => {
    fetch.mockResponse(() => Promise.resolve(JSON.stringify(mockBreweries)));

    renderWithRouter(<Home />);

    const spinner = screen.getByLabelText(/loading/i);

    expect(spinner).toBeInTheDocument();

    await waitForElementToBeRemoved(spinner);

    expect(screen.getAllByLabelText(/brewery type/i)).toHaveLength(5);
    expect(
      screen.getByRole('heading', { name: mockBreweries[2].name, level: 3 })
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
    fetch.mockResponse(() => Promise.resolve(JSON.stringify(mockBreweries)));

    renderWithRouter(<Home />);

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    const breweryCard = screen.getByLabelText(/^go to king street.+ details$/i);

    userEvent.click(breweryCard);

    expect(window.location.pathname).toBe(`/breweries/${mockBreweries[4].id}`);
  });
});
