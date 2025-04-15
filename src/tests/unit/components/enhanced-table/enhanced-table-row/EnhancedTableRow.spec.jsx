import { render, screen, waitFor } from '@testing-library/react'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'
import { describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

describe('EnhancedTableRow', () => {
  const mockedRowData = {
    _id: 1,
    name: 'Test name',
    age: 30,
    email: 'test@example.com'
  }

  const columns = [
    { field: 'age', label: 'Age' },
    { field: 'email', label: 'Email' },
    { field: 'name', label: 'Name' }
  ]

  const select = {
    isSelected: (id) => id === mockedRowData._id,
    handleSelectClick: vi.fn()
  }

  const rowActions = [
    { label: 'Action 1', func: vi.fn() },
    { label: 'Action 2', func: vi.fn() }
  ]

  test('should render table row with correct data', () => {
    render(
      <EnhancedTableRow
        columns={columns}
        isSelection
        item={mockedRowData}
        rowActions={[]}
        select={select}
      />
    )

    expect(screen.getByText('Test name')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  test('should call handleSelectClick when checkbox is clicked', async () => {
    render(
      <EnhancedTableRow
        columns={columns}
        isSelection
        item={mockedRowData}
        rowActions={[]}
        select={select}
      />
    )
    const checkbox = screen.getByRole('checkbox')

    await userEvent.click(checkbox)

    expect(select.handleSelectClick).toHaveBeenCalled()
  })

  test('should render action menu when menu icon is clicked', async () => {
    render(
      <EnhancedTableRow
        columns={columns}
        isSelection
        item={mockedRowData}
        rowActions={rowActions}
        select={select}
      />
    )
    const menuIconButton = screen.getByTestId('menu-icon')

    await userEvent.click(menuIconButton)

    const menuItems = await screen.findAllByRole('menuitem')

    expect(menuItems).toHaveLength(rowActions.length)
    expect(menuItems[0]).toHaveTextContent('Action 1')
    expect(menuItems[1]).toHaveTextContent('Action 2')
  })

  test('should call onAction function when clicking on the menu item', async () => {
    render(
      <EnhancedTableRow
        columns={columns}
        isSelection
        item={mockedRowData}
        rowActions={rowActions}
        select={select}
      />
    )

    const menuIconButton = screen.getByTestId('menu-icon')
    await userEvent.click(menuIconButton)

    const menuItems = await screen.findAllByRole('menuitem')
    expect(menuItems).toHaveLength(rowActions.length)

    const firstMenuItem = menuItems[0]
    await userEvent.click(firstMenuItem)

    expect(rowActions[0].func).toHaveBeenCalled()
  })
  test('should close the menu when "Escape" is pressed', async () => {
    render(
      <EnhancedTableRow
        columns={columns}
        isSelection
        item={mockedRowData}
        rowActions={rowActions}
        select={select}
      />
    )

    const menuIconButton = screen.getByTestId('menu-icon')
    await userEvent.click(menuIconButton)

    const menuItems = await screen.findAllByRole('menuitem')
    expect(menuItems).toHaveLength(rowActions.length)

    await userEvent.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryAllByRole('menuitem')).toHaveLength(0)
    })
  })
})
