import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import UserPreferenceContext, { UserPreferenceProvider } from '@/contexts/UserPreferenceContext';
import Component from '@/components/Component';
import useSWR from 'swr';

// Mock the external useSWR hook
jest.mock('swr', () => jest.fn());

const mockData = {
  notifications: { sms: true, email: false, push: false }
};

// Define a TestComponent 
function TestComponent() {
  return (
    <UserPreferenceProvider>
      <Component />
    </UserPreferenceProvider>
  );
}

describe('Component and UserPreferenceProvider', () => {
  beforeEach(() => {
    // Mock implementation of useSWR to return the data immediately
    useSWR.mockImplementation(() => ({
      data: mockData,
      error: null,
      isLoading: false
    }));
  });

  it('renders initial notification settings correctly', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText(/Email:/).textContent).toContain('Email: false');
      expect(screen.getByText(/SMS:/).textContent).toContain('SMS: true');
      expect(screen.getByText(/Push:/).textContent).toContain('Push: false');
    });
  });

  it('updates notification settings on button click for Email', async () => {
    render(<TestComponent />);
    const emailButton = screen.getByText(/Email:/);
    
    act(() => {
      fireEvent.click(emailButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Email:/).textContent).toContain('Email: true');
    });
  });
});

