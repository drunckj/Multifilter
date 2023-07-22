import { useCallback, useContext, useEffect, useMemo } from "react";

import Multiselect from "multiselect-react-dropdown";
import { Filters } from "../context/ProductFilter";
import DataTable, { TableColumn } from "react-data-table-component";
import React, { useState } from "react";
import { Filtering } from "./DataTable";
import FilterBoxes from "./FilterBoxes";

interface DataRow {
  number: number;
  mod350: number;
  mod8000: number;
  mod20002: number;

}

export default function MainContainer() {
  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Number',
      selector: (row: DataRow) => row.number,
      sortable: true,
    },
    {
      name: 'mod350',
      selector: (row: DataRow) => row.mod350,
      sortable: true,
    },
    {
      name: 'mod8000',
      selector: (row: DataRow) => row.mod8000,
      sortable: true,
    },
    {
      name: 'mod20002',
      selector: (row: DataRow) => row.mod20002,
      sortable: true,
    },

  ];

  const context = useContext(Filters);

  const [filteredData, setFilteredData] = useState<DataRow[]>(context.list);
  const [numberFilteredList, setNumberFilterList] = useState<DataRow[]>(context.list);

  const [mod350, setmod350] = useState<number[]>([]);
  const[number,setNumber]=useState<number[]>([]);
  const [mod8000, setmod8000] = useState<number[]>([]);
  const [mod20002, setmod20002] = useState<number[]>([]);

  useEffect(()=>{
    applyPrimaryFilter()
  },[number])
  useEffect(() => {
    applyFilters();
    // console.log(`trial ${number}` )x
  }, [mod350, mod8000, mod20002,numberFilteredList]);

const applyPrimaryFilter = useCallback(() => {
  let filtered = context.list;
  if (number.length > 0) {
    filtered = filtered.filter((product) => number.includes(product.number));
  setFilteredData(filtered);
setNumberFilterList(filtered)
  const mod8000Values = [...new Set(filtered.map((obj) => obj.mod8000))];
  const mod20002Values = [...new Set(filtered.map((obj) => obj.mod20002))];
  const mod350Values = [...new Set(filtered.map((obj) => obj.mod350))];
  context.setMod8000(mod8000Values);
  context.setMod350(mod350Values);
  context.setMod20002(mod20002Values);
  }

},[number])

  const applyFilters = useCallback(() => {
    let filtered=numberFilteredList

    if (mod350.length > 0) {
      filtered = filtered.filter((product) => mod350.includes(product.mod350));
    }

    if (mod8000.length > 0) {
      filtered = filtered.filter((product) => mod8000.includes(product.mod8000));
    }

    if (mod20002.length > 0) {
      filtered = filtered.filter((product) => mod20002.includes(product.mod20002));
    }

   

    setFilteredData(filtered);
  }, [numberFilteredList, mod350, mod8000, mod20002]);

  const handleNumberSelect = useCallback((selectedList: []) => {
    setNumber(selectedList.length === 0 ? [] : selectedList);
  }, []);

  const handlemod350select = useCallback((selectedList: []) => {
    setmod350(selectedList.length === 0 ? [] : selectedList);
  }, []);

  const handlemod8000select = useCallback((selectedList: []) => {
    setmod8000(selectedList.length === 0 ? [] : selectedList);
  }, []);

  const handlemod20002Select = useCallback((selectedList: []) => {
    setmod20002(selectedList.length === 0 ? [] : selectedList);
  }, []);

 

  // useEffect(() => {
  //   updateFilters();
  // }, [JSON.stringify(filteredData)]);

  // useEffect(()=>{
    
  // },[number])

  // useEffect(()=>{
  //   const mod8000Values = [...new Set(filteredData.map((obj) => obj.mod8000))];
  //   context.setMod8000(mod8000Values);

  // },[mod350,number])
  // useEffect(()=>{
    
    

  // },[mod350,number,mod8000])
  // const updateFilters = () => {
   
  // };

  return (
    <div style={{
      minHeight:"100vh"
    }} className="flex w-full flex-col justify-center align-middle h-full text-center bg-slate-100 ">
      <h1 className="font-bold text-3xl">Multi Filter List</h1>
      <div className="flex p-5 m-2 justify-center flex-col lg:flex-row">
        <FilterBoxes name="Numbers" options={context.number} value={number} updatevalue={handleNumberSelect}/>
        {/* <div className="flex flex-col bg-white p-2  m-2 rounded-lg shadow-xl">
          <p className="font-bold text-left">Number</p>
      <Multiselect
          options={context.number}
          isObject={false}
          selectedValues={number}
          // onRemove={handlemod350Remove}
          onSelect={handleNumberSelect}
          onRemove={handleNumberSelect}
        />
        </div> */}
              <FilterBoxes name="Mod350" options={context.mod350} value={mod350} updatevalue={handlemod350select}/>

              <FilterBoxes name="Mod8000" options={context.mod8000} value={mod8000} updatevalue={handlemod8000select}/>

              <FilterBoxes name="Mod20002" options={context.mod20002} value={mod20002} updatevalue={handlemod20002Select}/>

       
      </div>
      <div className="flex flex-col  m-2 shadow-2xl">
        <Filtering data={filteredData} columns={columns} />
      </div>
    </div>
  );
}
