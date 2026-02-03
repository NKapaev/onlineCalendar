import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('render button with text ', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls on click callback', () => {
    const onClickHandler = jest.fn();
    render(<Button onClick={onClickHandler}>Click Me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(onClickHandler).toHaveBeenCalled();
  });

  test('does not call onClick when disabled', () => {
    const onClickHandler = jest.fn();
    render(
      <Button onClick={onClickHandler} disabled>
        Disabled
      </Button>,
    );
    const buttonElement = screen.getByText(/disabled/i);
    fireEvent.click(buttonElement);
    expect(onClickHandler).not.toHaveBeenCalled();
    expect(buttonElement).toBeDisabled();
  });

  test('applies correct variant class', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const buttonElement = screen.getByText(/secondary/i);
    expect(buttonElement).toHaveClass('button', 'secondary');
  });
  test('renders icon when provided', () => {
    render(<Button icon="/icon.png">With Icon</Button>);
    const iconElement = screen.getByRole('img');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('src', '/icon.png');
  });
});
