import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Influencers, { formatFollowersCount, generateFakeProfile } from './page';
import '@testing-library/jest-dom/extend-expect';

// Mock the BeatLoader component
jest.mock('react-spinners/BeatLoader', () => () => <div>Loading...</div>);

// Test 6: Verify that loadMoreProfiles function is called when page loads
test('loads profiles on initial render', async () => {
  jest.useFakeTimers();

  render(<Influencers />);

  // Fast-forward until all timers have been executed
  jest.runAllTimers();

  await waitFor(() => {
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBeGreaterThan(0);
  });
});

// Test 7: Verify that loadMoreProfiles function is called when user scrolls to bottom
test('loads more profiles on scroll', async () => {
  jest.useFakeTimers();

  render(<Influencers />);

  // Fast-forward until all timers have been executed
  jest.runAllTimers();

  // Simulate scroll into view
  const loaderElement = screen.getByTestId('beat-loader');

  fireEvent.intersectionObserver(loaderElement, { isIntersecting: true });

  await waitFor(() => {
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBeGreaterThan(8); // Assuming initial load was more than zero
  });
});

// Test Utility Function: formatFollowersCount
test('formatFollowersCount formats followers count correctly', () => {
  expect(formatFollowersCount(999)).toBe('999');
  expect(formatFollowersCount(1000)).toBe('1.0k');
  expect(formatFollowersCount(1500)).toBe('1.5k');
  expect(formatFollowersCount(1000000)).toBe('1.0m');
});

// Test Utility Function: generateFakeProfile
test('generateFakeProfile creates a valid profile object', () => {
  const profile = generateFakeProfile();

  expect(profile).toHaveProperty('image');
  expect(profile).toHaveProperty('name');
  expect(profile).toHaveProperty('followers');
});
