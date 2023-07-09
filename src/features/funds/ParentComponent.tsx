import { useEffect, useState } from "react"
import { MainList } from "./MainList"
import { SelectedItemsList } from "./SelectedItemsList"
import { Fund } from "./Fund"
import data from "./data.json"

type Props = {
  selectedIds: number[]
}

function mapSelectedIdsToFundList(
  fundList: Fund[],
  selectedIds: number[],
): Fund[] {
  return fundList.map((fund) => ({
    ...fund,
    selected: selectedIds.includes(fund.id),
  }))
}

export const ParentComponent = ({ selectedIds }: Props) => {
  const [fundList, setFundList] = useState<Fund[]>(data)
  const [selectedFunds, setSelectedFunds] = useState<Fund[]>([])
  const [mainListSelectedIds, setMainListSelectedIds] =
    useState<number[]>(selectedIds)

  useEffect(() => {
    const newSelectedFunds = fundList.filter((fund) =>
      selectedIds.includes(fund.id),
    )
    setSelectedFunds(newSelectedFunds)
  }, [fundList, selectedIds])

  const handleMainListSelectionChange = (ids: number[]) => {
    setMainListSelectedIds(ids)
    const newSelectedFunds = fundList
      .filter((fund) => ids.includes(fund.id))
      .map((fund) => ({
        ...fund,
        selected: ids.includes(fund.id),
      }))
    setSelectedFunds(newSelectedFunds)
  }

  const handleSelectedItemsListSelectionChange = (ids: number[]) => {
    setMainListSelectedIds(ids)
    const newSelectedFunds = selectedFunds.filter((fund) =>
      ids.includes(fund.id),
    )
    setSelectedFunds(newSelectedFunds) // update the selected property on the main list
    const newFundList = fundList.map((fund) => ({
      ...fund,
      selected: ids.includes(fund.id),
    }))
    setFundList(newFundList)
    setMainListSelectedIds(ids)
  }

  return (
    <>
      <MainList
        fundList={fundList}
        selectedIds={mainListSelectedIds}
        onSelectionChange={handleMainListSelectionChange}
      />
      <SelectedItemsList
        selectedFunds={selectedFunds}
        onSelectionChange={handleSelectedItemsListSelectionChange}
      />
    </>
  )
}
