import { fireEvent, render, screen } from '@testing-library/react';
import { SettingsProvider, useSettingsContext } from '../SettingsContext';

// Mock component to test useSettingsContext
const MockComponent = () => {
  const { view, setView, date, setDate } = useSettingsContext();

  return (
    <div>
      <p>View: {view}</p>
      <p>Date: {date.toISOString()}</p>
      <button onClick={() => setView('table')}>Set View to Table</button>
      <button onClick={() => setDate(new Date('2020-01-01'))}>
        Set Date to 2020-01-01
      </button>
    </div>
  );
};

describe('SettingsContext', () => {
  test('renders children correctly', () => {
    render(
      <SettingsProvider>
        <div>Child Component</div>
      </SettingsProvider>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  test('setView updates the view state correctly', () => {
    render(
      <SettingsProvider>
        <MockComponent />
      </SettingsProvider>
    );
    const button = screen.getByText('Set View to Table');
    fireEvent.click(button);
    expect(screen.getByText('View: table')).toBeInTheDocument();
  });

  test('setDate updates the date state correctly', () => {
    render(
      <SettingsProvider>
        <MockComponent />
      </SettingsProvider>
    );
    const button = screen.getByText('Set Date to 2020-01-01');
    fireEvent.click(button);
    expect(
      screen.getByText('Date: 2020-01-01T00:00:00.000Z')
    ).toBeInTheDocument();
  });

  test('useSettingsContext throws error when used outside provider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<MockComponent />)).toThrow(
      'useSettingsContext must be used within a SettingsProvider'
    );

    consoleError.mockRestore();
  });
});
