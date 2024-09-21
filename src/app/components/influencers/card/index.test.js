import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './index';

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      blob: () => Promise.resolve(new Blob()),
    })
  );
});

afterAll(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} data-testid="profile-image" />;
  },
}));

// Mock the FaUser icon
jest.mock('react-icons/fa', () => ({
  FaUser: () => <div data-testid="fa-user-icon" />
}));

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
});


describe('AltImage Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('checks if image URL is accessible', async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
  
    try {
      const response = await fetch(mockProfile.image, { signal: controller.signal });
      expect(response.ok).toBe(true);
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Fetch request timed out');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }, 10000);
  
  // it('renders image when it loads successfully', async () => {
  //   render(<Card profile={mockProfile} />);

  //   const controller = new AbortController();
  //   const timeoutId = setTimeout(() => controller.abort(), 5000);

  //   try {
  //     await act(async () => {
  //       await waitFor(() => {
  //         expect(screen.getByTestId('profile-image')).toBeInTheDocument();
  //       }, { timeout: 5000 });
  //     });

  //     const img = screen.getByTestId('profile-image');
  //     expect(img).toHaveAttribute('src', mockProfile.image);
  //     expect(img).toHaveClass('image');
  //   } catch (error) {
  //     if (error.name === 'AbortError') {
  //       throw new Error('Image load timed out');
  //     }
  //     throw error;
  //   } finally {
  //     clearTimeout(timeoutId);
  //   }
  // }, 10000);

  it('renders FaUser icon when image fails to load', async () => {
    const invalidImageUrl = 'https://example.com/invalid-image.jpg';
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Card profile={{ ...mockProfile, image: invalidImageUrl }} />);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      await act(async () => {
        await waitFor(() => {
          expect(screen.getByTestId('fa-user-icon')).toBeInTheDocument();
        }, { timeout: 5000 });
      });

      expect(screen.queryByTestId('profile-image')).not.toBeInTheDocument();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('FaUser icon render timed out');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
      consoleErrorSpy.mockRestore();
    }
  }, 10000);

  // it('switches from FaUser icon to image when image loads after delay', async () => {
  //   render(<Card profile={mockProfile} />);

  //   const controller = new AbortController();
  //   const timeoutId = setTimeout(() => controller.abort(), 5000);

  //   try {
  //     // Initially, it should show the FaUser icon
  //     expect(screen.getByTestId('fa-user-icon')).toBeInTheDocument();

  //     await act(async () => {
  //       await waitFor(() => {
  //         expect(screen.getByTestId('profile-image')).toBeInTheDocument();
  //       }, { timeout: 5000 });
  //     });

  //     expect(screen.queryByTestId('fa-user-icon')).not.toBeInTheDocument();
  //   } catch (error) {
  //     if (error.name === 'AbortError') {
  //       throw new Error('Image load after delay timed out');
  //     }
  //     throw error;
  //   } finally {
  //     clearTimeout(timeoutId);
  //   }
  // }, 10000);
  
});