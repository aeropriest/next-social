import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfluencerGrid, { formatFollowersCount } from './InfluencerGrid';

jest.mock('./InfluencerCard/InfluencerCard', () => {
  return function MockCard({ profile }) {
    return <div data-testid="influencer-card">{profile.name}</div>;
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

describe('Influencers Grid Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders initial set of profiles', async () => {
    render(<InfluencerGrid />);

    await waitFor(() => {
      const cards = screen.getAllByTestId('influencer-card');
      expect(cards).toHaveLength(296);
    });
  });

  it('loads more profiles when intersection observer triggers', async () => {
    render(<InfluencerGrid />);

    await waitFor(() => {
      expect(screen.getAllByTestId('influencer-card')).toHaveLength(296);
    });

    act(() => {
      const [intersectionCallback] = mockIntersectionObserver.mock.calls[0];
      intersectionCallback([{ isIntersecting: true }]);
    });

    await waitFor(() => {
      const cards = screen.getAllByTestId('influencer-card');
      expect(cards).toHaveLength(592);
    });
  });

  it('formats follower count correctly', () => {
    expect(formatFollowersCount(500)).toBe('500');
    expect(formatFollowersCount(1500)).toBe('1.5k');
    expect(formatFollowersCount(1000000)).toBe('1.0m');
  });
});
