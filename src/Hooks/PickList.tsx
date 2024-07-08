import { PickList } from 'primereact/picklist';
import { useState } from 'react';

interface Item {
  name: string;
  // Define other properties of your item here as needed
}

const MyPickList: React.FC = () => {
  const [source, setSource] = useState<Item[]>([]); // Define your source list data type
  const [target, setTarget] = useState<Item[]>([]); // Define your target list data type

  const itemTemplate = (item: Item) => {
    return <span>{item.name}</span>; // Customize this based on your data structure
  };

  const onChange = (e: { source: Item[], target: Item[] }) => {
    setSource(e.source);
    setTarget(e.target);
  };

  return (
    <PickList
      dataKey='id'
      source={source}
      target={target}
      itemTemplate={itemTemplate}
      onChange={onChange}
    //   sourceHeader="Available"
    //   targetHeader="Selected"
    />
  );
};

export default MyPickList;
