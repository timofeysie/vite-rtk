import { render, fireEvent } from "@testing-library/react"
import { MainList } from "./MainList"

describe("MainList", () => {
  const data = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]

  it("renders the list items", () => {
    const { getByText } = render(
      <MainList
        data={data}
        onItemSelect={() => {}}
        onItemDeselect={() => {}}
        selectedItems={[]}
      />,
    )

    expect(getByText("Item 1")).toBeInTheDocument()
    expect(getByText("Item 2")).toBeInTheDocument()
    expect(getByText("Item 3")).toBeInTheDocument()
  })

  it("filters the list items", () => {
    const { getByText, getByLabelText } = render(
      <MainList
        data={data}
        onItemSelect={() => {}}
        onItemDeselect={() => {}}
        selectedItems={[]}
      />,
    )

    fireEvent.change(getByLabelText("Search"), { target: { value: "item 1" } })

    expect(getByText("Item 1")).toBeInTheDocument()
    expect(() => getByText("Item 2")).toThrow()
    expect(() => getByText("Item 3")).toThrow()
  })

  it("selects and deselects list items", () => {
    const handleItemSelect = jest.fn()
    const handleItemDeselect = jest.fn()

    const { getByLabelText } = render(
      <MainList
        data={data}
        onItemSelect={handleItemSelect}
        onItemDeselect={handleItemDeselect}
        selectedItems={[]}
      />,
    )

    fireEvent.click(getByLabelText("Item 1"))

    expect(handleItemSelect).toHaveBeenCalledWith(1)

    fireEvent.click(getByLabelText("Item 1"))

    expect(handleItemDeselect).toHaveBeenCalledWith(1)
  })
})
