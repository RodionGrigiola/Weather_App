import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const API_KEY = 'a77b40829c87477d876121828232010';
const BASE_URL = 'https://api.weatherapi.com/v1';

type Position = {
    latitude: number,
    longitude: number
}

type WeatherObject = {
  location: {
    country: string,
    name: string
  },
  current: {
    temp_c: number,
    condition: {
      text: string,
      icon: string
    }
  }
}

export default function useFetch(search: string, position: Position | null) {

    const [weatherObj, setWeatherObj] = useState<WeatherObject | null>(null);
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    let queryValue = '';
    if(search.length >= 3) queryValue = search
    else if(position) queryValue = `${position.latitude},${position.longitude}`

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
          setIsFetchingData(true);
          setError('');

          try {
          const { data }: AxiosResponse = await axios.get(`${BASE_URL}/current.json`, {
            signal: controller.signal,
            params: {
              key: API_KEY,
              q: queryValue
            },
          })
          if (!data) throw new Error("Something went wrong with fetching data");
          setWeatherObj(data);
          setError('');
          } 
          catch(err) {
            if(axios.isAxiosError(err)) {
                setError(err.message);
            }
            else setError('Oops, something went wrong!')
          }
          finally{
            setIsFetchingData(false);
          }
        }

        if(queryValue) fetchData()
        else setWeatherObj(null);

        return () => controller.abort();
      }, [queryValue])

  return { weatherObj, isFetchingData, error }
}
