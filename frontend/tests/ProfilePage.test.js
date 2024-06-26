import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ProfilePage from '../src/UserPages/ProfilePage';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
};

// Mocking react-router-dom module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock user data
const mockUserData = {
  name: 'John Doe',
  email_address: 'john@example.com',
  phone_number: '1234567890',
  role: 'User',
  farmer_pid: '123',
  profile_bio: 'Lorem ipsum dolor sit amet',
};

describe('ProfilePage component', () => {
  beforeAll(() => {
    // Mock localStorage getItem method
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  

  afterEach(() => {
    // Clear mocks after each test
    jest.clearAllMocks();
  });



  it('fetchUserData', async () => {
    // Mock localStorage getItem to return user data
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockUserData));

    const { getByText } = render(<ProfilePage />);

    // Wait for data to be loaded
    await waitFor(() => {
      expect(getByText('Profile Page')).toBeInTheDocument();
      expect(getByText(`${mockUserData.name}`)).toBeInTheDocument();
      expect(getByText(`${mockUserData.email_address}`)).toBeInTheDocument();
      expect(getByText(`${mockUserData.phone_number}`)).toBeInTheDocument();
      expect(getByText(`${mockUserData.role}`)).toBeInTheDocument();
      expect(getByText(`${mockUserData.farmer_pid}`)).toBeInTheDocument();
      expect(getByText(`${mockUserData.profile_bio}`)).toBeInTheDocument();
    });
  });

  it('displaysLoading', async () => {
    // Mock localStorage getItem to return null (no user data)
    mockLocalStorage.getItem.mockReturnValueOnce(null);

    const { getByText } = render(<ProfilePage />);

    // Wait for data to be loaded
    await waitFor(() => {
      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });
});