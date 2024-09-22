"use client";

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Card from "./Card";

const mockProfile = {
  image: 'https://avatars.githubusercontent.com/u/63429876',
  name: 'johndoe',
  followers: '10k',
};

describe('Card Component', () => {
  it('renders card with correct profile information', () => {
    render(<Card profile={mockProfile} />);
  
    expect(screen.getByText(new RegExp(`@${mockProfile.name}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockProfile.followers} Followers`))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<Card profile={mockProfile} />);

    expect(screen.getByText('@johndoe')).toHaveClass('name');
    expect(screen.getByText('10k Followers')).toHaveClass('followers');
    expect(screen.getByRole('button', { name: 'Follow' })).toHaveClass('button');
  });

  it('renders image when it loads successfully', async () => {
    render(<Card profile={mockProfile} />);
  
    const img = screen.getByTestId('profile-image');
  
    await waitFor(() => {
      expect(img).toHaveAttribute(
        'src',
        expect.stringMatching(/^http:\/\/localhost\/_next\/image\?url=https%3A%2F%2Favatars\.githubusercontent\.com%2Fu%2F63429876&w=\d+&q=\d+$/)
      );
      expect(img).toHaveClass('image');
    });
  });

// it('renders FaUser icon when image fails to load', async () => {
//   const invalidImageUrl = 'https://example.com/invalid-image.jpg';
  
//   render(<Card profile={{ ...mockProfile, image: invalidImageUrl }} />);

//   // Wait for the image to be rendered with the invalid URL
//   const img = screen.getByTestId('profile-image');

//   // Simulate an error by triggering the onError event
//   img.dispatchEvent(new Event('error'));

//   // Wait for the FaUser icon to be rendered
//   await waitFor(() => {
//     // Check if the fallback src is set correctly
//     expect(screen.queryByTestId('profile-image')).not.toBeInTheDocument(); // Ensure original image is not in the document
//     expect(screen.getByRole('img', { name: /Profile/i })).toHaveAttribute('src', '/FaUser.png'); // Check if fallback src is set
//   });
// });
});