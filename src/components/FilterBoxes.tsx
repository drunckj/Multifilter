import Multiselect from "multiselect-react-dropdown";
import { Dispatch, SetStateAction } from "react";

interface FilterBoxesProps {
options: number[];
value:number[],
  name: string;
  updatevalue:any;
}

export default function FilterBoxes({ options,value, updatevalue, name }: FilterBoxesProps) {
  return (
    <div className="flex flex-col bg-white p-2  m-2 rounded-lg shadow-xl">
      <p className="font-bold text-left">{name}</p>
      <Multiselect
        options={options}
        isObject={false}
        selectedValues={value}
        onSelect={updatevalue}
        onRemove={updatevalue}
      />
    </div>
  );
}
