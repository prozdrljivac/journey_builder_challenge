import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Sidebar } from './Sidebar'

describe('Sidebar component', () => {
  let onClose: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onClose = vi.fn()
  })

  it('always renders its children', () => {
    render(
      <Sidebar
        isOpen={false}
        onClose={onClose}
      >
        <div>Test Content</div>
      </Sidebar>,
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('toggles the "open" class based on isOpen prop', () => {
    const { container, rerender } = render(
      <Sidebar
        isOpen={false}
        onClose={onClose}
      >
        <div />
      </Sidebar>,
    )

    const backdrop = container.querySelector('.sidebar-backdrop')
    const panel = container.querySelector('aside.sidebar')

    // closed state
    expect(backdrop).not.toHaveClass('open')
    expect(panel).not.toHaveClass('open')

    // open state
    rerender(
      <Sidebar
        isOpen={true}
        onClose={onClose}
      >
        <div />
      </Sidebar>,
    )
    expect(backdrop).toHaveClass('open')
    expect(panel).toHaveClass('open')
  })

  it('calls onClose when clicking the backdrop', async () => {
    const { container } = render(
      <Sidebar
        isOpen={true}
        onClose={onClose}
      >
        <div>Inside</div>
      </Sidebar>,
    )
    const backdrop = container.querySelector('.sidebar-backdrop')!
    await userEvent.click(backdrop)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
