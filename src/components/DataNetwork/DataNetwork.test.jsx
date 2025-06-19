import React from 'react';
import { render, screen } from '@testing-library/react';
import DataNetwork from './DataNetwork';

describe('DataNetwork', () => {
  test('renders canvas element', () => {
    render(<DataNetwork />);
    const canvas = screen.getByRole('img', { hidden: true });
    expect(canvas).toBeInTheDocument();
    expect(canvas.tagName).toBe('CANVAS');
  });

  test('applies custom dimensions', () => {
    render(<DataNetwork width="800px" height="400px" />);
    const container = screen.getByRole('img', { hidden: true }).parentElement;
    expect(container).toHaveStyle({
      width: '800px',
      height: '400px'
    });
  });

  test('sets background color', () => {
    render(<DataNetwork backgroundColor="#000000" />);
    const container = screen.getByRole('img', { hidden: true }).parentElement;
    expect(container).toHaveStyle({
      backgroundColor: '#000000'
    });
  });

  test('canvas has correct positioning styles', () => {
    render(<DataNetwork />);
    const canvas = screen.getByRole('img', { hidden: true });
    expect(canvas).toHaveStyle({
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%'
    });
  });

  test('handles custom node count prop', () => {
    const { rerender } = render(<DataNetwork nodeCount={20} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    
    rerender(<DataNetwork nodeCount={100} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });
});