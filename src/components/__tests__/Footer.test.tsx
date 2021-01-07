import { render, screen } from '@testing-library/react';

import Footer from 'components/Footer';

describe('<Footer />', () => {
  test('should render Footer content correctly', () => {
    render(<Footer />);

    expect(screen.getByText(/breweries list/i)).toBeInTheDocument();
  });
});
