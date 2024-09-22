import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Influencers, { formatFollowersCount } from './Influencers';

jest.mock('./Card/Card', () => {
  return function MockCard({ profile }) {
    return <div data-testid="card">{profile.name}</div>;
  };
});

jest.mock('react-spinners/BeatLoader', () => {
  return function MockBeatLoader() {
    return <div data-testid="beat-loader">Loading...</div>;
  };
});

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

describe('Influencers Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders initial set of profiles', async () => {
    render(<Influencers />);
    
    act(() => {
      jest.advanceTimersByTime(200);
    });

    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(10);
    });
  });

  it('shows loading indicator while fetching profiles', async () => {
    render(<Influencers />);

    expect(screen.getByTestId('beat-loader')).toBeInTheDocument();
    expect(screen.getByTestId('loading-text')).toHaveTextContent('Loading More Profiles...');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('beat-loader')).not.toBeInTheDocument();
    });
  });

  it('loads more profiles when intersection observer triggers', async () => {
    render(<Influencers />);

    act(() => {
      jest.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(10);
    });

    act(() => {
      const [intersectionCallback] = mockIntersectionObserver.mock.calls[0];
      intersectionCallback([{ isIntersecting: true }]);
      jest.advanceTimersByTime(200);
    });

    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(20);
    });
  });

  it('formats follower count correctly', () => {
    expect(formatFollowersCount(500)).toBe('500');
    expect(formatFollowersCount(1500)).toBe('1.5k');
    expect(formatFollowersCount(1000000)).toBe('1.0m');
  });
});