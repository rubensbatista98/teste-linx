import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BreweryCard, { BreweryCardProps } from 'components/BreweryCard';
import { BADGE_COLORS } from 'components/BreweryCard/styles';

const props: BreweryCardProps = {
  id: 1,
  name: 'Cool Brewery',
  brewery_type: 'closed',
  onClick: () => void 0,
  city: 'Night City',
  postal_code: '00011-900',
  country: 'mess country',
  state: 'My State',
  street: 'Some place out there'
};

describe('<BreweryCard />', () => {
  test('should render correctly', () => {
    render(<BreweryCard {...props} />);

    expect(
      screen.getByRole('heading', { name: /cool brewery/i })
    ).toBeInTheDocument();

    expect(screen.getByText(props.street)).toBeInTheDocument();
    expect(screen.getByText(props.country)).toBeInTheDocument();

    expect(screen.getByText(new RegExp(props.city, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(props.state, 'i'))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(props.postal_code, 'i'))
    ).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(props.brewery_type, 'i'))
    ).toBeInTheDocument();
  });

  test('should render the bagde with corresponding color', () => {
    const { rerender } = render(<BreweryCard {...props} />);

    expect(screen.getByText(/closed/i).parentElement).toHaveStyle({
      color: BADGE_COLORS.closed.color,
      'background-color': BADGE_COLORS.closed.bg
    });

    rerender(<BreweryCard {...props} brewery_type="brewpub" />);

    expect(screen.getByText(/brewpub/i).parentElement).toHaveStyle({
      color: BADGE_COLORS.brewpub.color,
      'background-color': BADGE_COLORS.brewpub.bg
    });
  });

  test(`should call onClick with brewery id`, () => {
    const onClick = jest.fn();

    render(<BreweryCard {...props} onClick={onClick} />);

    const button = screen.getByRole('button', {
      name: /go to cool brewery/i
    });

    userEvent.click(button);

    expect(onClick).toBeCalledWith(props.id);
  });
});
