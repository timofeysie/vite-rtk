import * as React from 'react';
import { MainList } from './MainList';
import { SelectedItemsList } from './SelectedItemsList';
import { Fund } from './Fund';

type Props = {
  fundList: Fund[];
  selectedIds: number[];
};

export const ParentComponent = ({ fundList, selectedIds }: Props) => {
  const [selectedFunds, setSelectedFunds] = React.useState<Fund[]>([]);
  const [mainListSelectedIds, setMainListSelectedIds] = React.useState<number[]>(selectedIds);

  React.useEffect(() => {
    const newSelectedFunds = fundList.filter((fund) => selectedIds.includes(fund.id));
    setSelectedFunds(newSelectedFunds);
  }, [fundList, selectedIds]);

  const handleMainListSelectionChange = (ids: number[]) => {
    setMainListSelectedIds(ids);
    const newSelectedFunds = fundList.filter((fund) => ids.includes(fund.id));
    setSelectedFunds(newSelectedFunds);
  };

  const handleSelectedItemsListSelectionChange = (ids: number[]) => {
    setMainListSelectedIds(ids);
    const newSelectedFunds = selectedFunds.filter((fund) => ids.includes(fund.id));
    setSelectedFunds(newSelectedFunds);
  };

  return (
    <>
      <MainList fundList={fundList} selectedIds={mainListSelectedIds} onSelectionChange={handleMainListSelectionChange} />
      <SelectedItemsList fundList={selectedFunds} onSelectionChange={handleSelectedItemsListSelectionChange} />
    </>
  );
};
