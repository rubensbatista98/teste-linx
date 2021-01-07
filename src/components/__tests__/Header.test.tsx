import { render, screen } from '@testing-library/react';

import Header from 'components/Header';

describe('<Header />', () => {
  test('should render the title and subtitle', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', { name: /breweries/i, level: 1 })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /a breweries list by/i, level: 2 })
    ).toBeInTheDocument();
  });
});
