import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { expertsData } from './data/expertsData';
import { communityData } from './data/communityData';

test.each(['/', '/service', '/community', '/experts', '/contacts'])('home route %s renders', async (path) => {
  window.history.replaceState({}, '', path);
  const { container } = render(<App />);
  await waitFor(() => expect(window.location.pathname).toBe(path));
  expect(container.querySelectorAll('section[aria-hidden="false"]')).toHaveLength(1);
  expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
});

test.each([['experts', expertsData], ['community', communityData]])('%s listing links to every detail', (base, items) => {
  window.history.replaceState({}, '', `/${base}/more`);
  render(<App />);
  items.forEach(item => expect(document.querySelector(`a[href="/${base}/${item.slug}"]`)).toBeInTheDocument());
});

test.each(expertsData.map(item => [item.slug, item.name]))('expert %s renders', (slug, name) => {
  window.history.replaceState({}, '', `/experts/${slug}`);
  render(<App />);
  expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveTextContent(name);
  expect(screen.getByRole('region', { name: 'Expert presentation' })).toBeInTheDocument();
});

test.each(communityData.map(item => [item.slug, item.more?.title || item.name]))('community %s renders', (slug, name) => {
  window.history.replaceState({}, '', `/community/${slug}`);
  render(<App />);
  expect(screen.getAllByRole('heading', { name }).length).toBeGreaterThan(0);
});

test.each(['experts', 'community'])('unknown %s redirects', async (base) => {
  window.history.replaceState({}, '', `/${base}/missing-item`);
  render(<App />);
  await waitFor(() => expect(window.location.pathname).toBe(`/${base}/more`));
});

test('service options update price and duration', () => {
  window.history.replaceState({}, '', '/service/headshots');
  render(<App />);
  expect(screen.getByText('340$')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'headshot options' }));
  fireEvent.click(screen.getByRole('button', { name: /quick shot/ }));
  expect(screen.getByText('200$')).toBeInTheDocument();
  expect(screen.getByText('30 min')).toBeInTheDocument();
});

test('mobile navigation changes URL and closes menu', async () => {
  window.history.replaceState({}, '', '/');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
  fireEvent.click(screen.getByRole('button', { name: 'contacts' }));
  await waitFor(() => expect(window.location.pathname).toBe('/contacts'));
  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByText('we are here:')).toBeInTheDocument();
});
