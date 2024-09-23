'use client';

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Card from './InfluencerCard';

const mockProfile = {
  image: 'https://avatars.githubusercontent.com/u/63429876',
  name: 'johndoe',
  followers: '10k',
};

describe('Card Component', () => {
  it('renders card with correct profile information', () => {
    render(<Card profile={mockProfile} />);

    expect(
      screen.getByText(new RegExp(`@${mockProfile.name}`))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${mockProfile.followers} Followers`))
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<Card profile={mockProfile} />);

    expect(screen.getByText('@johndoe')).toHaveClass('name');
    expect(screen.getByText('10k Followers')).toHaveClass('followers');
    expect(screen.getByRole('button', { name: 'Follow' })).toHaveClass(
      'button'
    );
  });

  it('renders image when it loads successfully', async () => {
    render(<Card profile={mockProfile} />);

    const img = screen.getByTestId('profile-image');

    await waitFor(() => {
      expect(img).toHaveAttribute(
        'src',
        expect.stringMatching(
          /^http:\/\/localhost\/_next\/image\?url=https%3A%2F%2Favatars\.githubusercontent\.com%2Fu%2F63429876&w=\d+&q=\d+$/
        )
      );
      expect(img).toHaveClass('image');
    });
  });
});
