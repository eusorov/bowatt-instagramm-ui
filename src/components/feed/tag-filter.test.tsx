import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { TagFilter } from '@/components/feed/tag-filter'
import { fetchTags } from '@/lib/api/tags'
import { renderWithProviders } from '@/test/test-utils'

vi.mock('@/lib/api/tags', () => ({
  fetchTags: vi.fn(),
}))

const mockFetchTags = vi.mocked(fetchTags)

const sampleTags = [
  { id: 1, name: 'beach' },
  { id: 2, name: 'summer' },
]

describe('TagFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchTags.mockResolvedValue(sampleTags)
  })

  it('shows a loading state while tags are fetched', () => {
    mockFetchTags.mockImplementation(() => new Promise(() => {}))

    const { getByText } = renderWithProviders(
      <TagFilter activeTags={[]} onChange={vi.fn()} />,
    )

    expect(getByText('Loading tags...')).toBeInTheDocument()
  })

  it('renders all tags from the API', async () => {
    const { findByRole, getByRole } = renderWithProviders(
      <TagFilter activeTags={[]} onChange={vi.fn()} />,
    )

    expect(await findByRole('button', { name: '#beach' })).toBeInTheDocument()
    expect(getByRole('button', { name: '#summer' })).toBeInTheDocument()
    expect(getByRole('button', { name: 'All' })).toBeInTheDocument()
  })

  it('shows an error message when tag loading fails', async () => {
    mockFetchTags.mockRejectedValue(new Error('Failed to fetch tags'))

    const { findByText } = renderWithProviders(
      <TagFilter activeTags={[]} onChange={vi.fn()} />,
    )

    expect(await findByText('Failed to load tags')).toBeInTheDocument()
  })

  it('selects a tag when clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    const { findByRole } = renderWithProviders(
      <TagFilter activeTags={[]} onChange={onChange} />,
    )

    await user.click(await findByRole('button', { name: '#beach' }))

    expect(onChange).toHaveBeenCalledWith(['beach'])
  })

  it('deselects a tag when clicked again', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    const { findByRole } = renderWithProviders(
      <TagFilter activeTags={['beach']} onChange={onChange} />,
    )

    await user.click(await findByRole('button', { name: '#beach' }))

    expect(onChange).toHaveBeenCalledWith([])
  })

  it('supports selecting multiple tags', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    const { findByRole } = renderWithProviders(
      <TagFilter activeTags={['beach']} onChange={onChange} />,
    )

    await user.click(await findByRole('button', { name: '#summer' }))

    expect(onChange).toHaveBeenCalledWith(['beach', 'summer'])
  })

  it('marks selected tags with aria-pressed=true', async () => {
    const { findByRole, getByRole } = renderWithProviders(
      <TagFilter activeTags={['beach']} onChange={vi.fn()} />,
    )

    expect(await findByRole('button', { name: '#beach' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(getByRole('button', { name: '#summer' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('clears the selection when All is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    const { getByRole } = renderWithProviders(
      <TagFilter activeTags={['beach', 'summer']} onChange={onChange} />,
    )

    await waitFor(() => {
      expect(getByRole('button', { name: '#beach' })).toBeInTheDocument()
    })

    await user.click(getByRole('button', { name: 'All' }))

    expect(onChange).toHaveBeenCalledWith([])
  })
})
