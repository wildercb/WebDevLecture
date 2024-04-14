import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Component from '../../components/Component'; // Assuming relative path is correct
import { UserPreferenceProvider } from '@/contexts/UserPreferenceContext';

// Setup the mock for the context
const mockUpdate = jest.fn();

jest.mock('@/contexts/UserPreferenceContext', () => ({
  //default values for buttons
  useUserPreference: () => ({
    data: { notifications: { email: false, sms: true, push: false } },
    update: mockUpdate
  })
}));

describe('Component', () => {
  beforeEach(() => {
    // Clear any previous operations on mocks before each test
    mockUpdate.mockClear();
    render(<Component />, { wrapper: UserPreferenceProvider });
  });

  test('renders notification toggle buttons correctly', () => {
    expect(screen.getByText(/Email:/)).toHaveTextContent('Email: false');
    expect(screen.getByText(/SMS:/)).toHaveTextContent('SMS: true');
    expect(screen.getByText(/Push:/)).toHaveTextContent('Push: false');
  });

  //Tests whether buttons switch after toggle 
  test('button click updates state correctly for Email', () => {
    fireEvent.click(screen.getByText(/Email:/));
    expect(mockUpdate).toHaveBeenCalledWith({
      notifications: {
        email: true, // Expected to change from false to true
        sms: true,  // No change
        push: false // No change
      }
    });
  });

  test('button click updates state correctly for SMS', () => {
    fireEvent.click(screen.getByText(/SMS:/));
    expect(mockUpdate).toHaveBeenCalledWith({
      notifications: {
        email: false, // No change
        sms: false,  // Expected to change from true to false
        push: false // No change
      }
    });
  });

  test('button click updates state correctly for Push', () => {
    fireEvent.click(screen.getByText(/Push:/));
    expect(mockUpdate).toHaveBeenCalledWith({
      notifications: {
        email: false, // No change
        sms: true,   // No change
        push: true   // Expected to change from false to true
      }
    });
  });
});
