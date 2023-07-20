  import React, { createContext, useContext, useState, FC, ReactNode, Dispatch, SetStateAction, useMemo } from 'react';
  import listings from "../assets/list.json"
  type DistinctValuesProviderProps = {
    children: ReactNode;
  };

  export type FilterValueType = {
    list:any[];
    number: number[];
    mod350: number[];
    mod8000:number[];
    mod20002:number[];
    setMod350: Dispatch<SetStateAction<number[]>>;
    setNumber: Dispatch<SetStateAction<number[]>>;
    setMod8000: Dispatch<SetStateAction<number[]>>;
    setMod20002: Dispatch<SetStateAction<number[]>>;
  };

  export const Filters = createContext<FilterValueType>({
    list:[],
    number: [],
    mod350: [],
    mod8000: [],
    mod20002: [],
    setNumber: () => {},
    setMod350: () => {},
    setMod8000: () => {},
    setMod20002: () => {},
  });

  const FiltersList: FC<DistinctValuesProviderProps> = ({ children }) => {
    const data: any[] = useMemo(() => {
      return listings;
    }, []);
      
    function fetchdefaultvalues(){
      const uniqueNumbers = [...new Set(data.map(obj => obj.number))];
      const mod350 = [...new Set(data.map(obj => obj.mod350))];
      const mod8000 = [...new Set(data.map(obj => obj.mod8000))];
      const mod20002 = [...new Set(data.map(obj => obj.mod20002))];
  
  
  
  return ({num:uniqueNumbers,mod350:mod350,mod8000:mod8000,mod20002:mod20002})
  
  
    }
    const fields=fetchdefaultvalues()
    const [number,setNumber]=useState(fields.num)
    const [mod350,setMod350]=useState(fields.mod350)
    const [mod8000,setMod8000]=useState(fields.mod8000)
    const [mod20002,setMod20002]=useState(fields.mod20002)
    // const [mod6, setMod6] = useState(originalValues.mod6);
    const[list,setList]=useState(data)
    const updateNumber=(value:any[])=>
    {
      console.log(`xheck ${value}`)
      setNumber(value)}

    // The value provided by the Context Provider will be accessible to all consuming components

    return (
      <Filters.Provider
        value={{
          number,
          mod350,
          mod8000,
          mod20002,
        
          setNumber,
          setMod350,
          setMod8000,
          setMod20002,
          list
        }}
      >
        {children}
      </Filters.Provider>
    );
  };

  export default FiltersList;
