import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Modal } from './Modal'

describe('Modal component', () => {
  let onClose: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onClose = vi.fn()
  })

  it('does not render anything when isOpen is false', async () => {
    render(
      <Modal
        isOpen={false}
        onClose={onClose}
      >
        <h1>Hello World!</h1>
      </Modal>,
    )

    expect(screen.queryByTestId('generic-modal')).toBeNull()
    expect(screen.queryByText('Hello World!')).not.toBeInTheDocument()
  })

  it('renders children and portal markup when open', () => {
    render(
      <Modal
        isOpen={true}
        onClose={onClose}
      >
        <h1>Hello World!</h1>
      </Modal>,
    )

    expect(screen.queryByTestId('generic-modal')).not.toBeNull()
    expect(screen.queryByText('Hello World!')).toBeInTheDocument()
  })

  it('calls onClose when backdrop is clicked', async () => {
    render(
      <Modal
        isOpen={true}
        onClose={onClose}
      >
        <h1>Hello World!</h1>
      </Modal>,
    )

    const backdrop = screen.getByTestId('generic-modal')
    await userEvent.click(backdrop)

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
