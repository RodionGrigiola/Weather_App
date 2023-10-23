import { useEffect, useState } from 'react';
import axios from 'axios';

const COUNTRY_URL = 'https://restcountries.com/v3.1/name'

export default function useFlag(countryName: string) {
 const [flag, setFlag] = useState('');

  useEffect(() => {
    if(!countryName) return;

    const getFlag = async (countryName: string) => {
        if(!countryName) return;
        try {
          const {data} = await axios.get(`${COUNTRY_URL}/${countryName}`);
          setFlag(data[0].flag);
        }
        catch(e) {
          console.log(e);
        }
    }

    getFlag(countryName)
  }, [countryName])

  return {flag}
}