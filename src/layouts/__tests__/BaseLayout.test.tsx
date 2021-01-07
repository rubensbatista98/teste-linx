import { render, screen } from '@testing-library/react';

import BaseLayout from 'layouts/BaseLayout';

jest.mock('components/Header', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="header" />;
  }
}));

jest.mock('components/Footer', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="footer" />;
  }
}));

describe('<BaseLayout />', () => {
  test('should render header, footer and children', () => {
    render(
      <BaseLayout>
        <h1>My Title</h1>
      </BaseLayout>
    );

    expect(
      screen.getByRole('heading', { name: /my title/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
