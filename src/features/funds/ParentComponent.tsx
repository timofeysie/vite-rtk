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

  React.useEffect(() => {
    const newSelectedFunds = fundList.filter((fund) => selectedIds.includes(fund.id));
    setSelectedFunds(newSelectedFunds);
  }, [fundList, selectedIds]);

  const handleSelectionChange = (ids: number[]) => {
    const newSelectedFunds = fundList.filter((fund) => ids.includes(fund.id));
    setSelectedFunds(newSelectedFunds);
  };

  return (
    <>
      <MainList fundList={fundList} onSelectionChange={handleSelectionChange} />
      <SelectedItemsList fundList={selectedFunds} />
    </>
  );
};
