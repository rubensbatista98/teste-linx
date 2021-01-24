import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

type RouterOptions = {
  route?: string;
};

export function renderWithRouter(
  ui: React.ReactElement,
  options: RouterOptions = {}
) {
  const { route = '/' } = options;
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
}
