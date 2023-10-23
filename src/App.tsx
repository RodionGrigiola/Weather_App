import { ChangeEvent, useState } from 'react';
import useFetch from './hooks/useFetch';
import useGeolocation from './hooks/useGeolocation';
import useFlag from './hooks/useFlag';
import Spinner from './ui/Spinner';
import Error from './ui/Error';

function App() {
  const [search, setSearch] = useState<string>('');
  const { position, isGettingCoords, getCoords, setPosition } = useGeolocation();
  const { weatherObj, isFetchingData, error } = useFetch(search, position);

  const countryName = weatherObj?.location?.country || '';
  const { flag } = useFlag(countryName);
  const isLoading = isFetchingData || isGettingCoords;

  const handlerGetPosition = () => {
    setSearch('');
    getCoords();
  }

  const handleSearch = (e:  ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    if(position) setPosition(null);
  }

  return (
    <div className='flex justify-center items-center h-screen bg-cover bg-[url(./assets/background.jpg)] px-4'>
      <div className='flex flex-col md:flex-row w-[42rem] rounded opacity-[95%] h-[28rem] bg-neutral-100 py-4 text-center divide-x divide-neutral-200 shadow-md'>
        <div className='flex flex-col  gap-4 px-6 text-lg'>
          <h1 className='uppercase tracking-light font-semibold text-xl'>Weather App</h1>
          <form className='mb-4'>
            <label htmlFor='search' className='block text-left mb-2'>Search by the city</label>
            <input id='search' name='search' type='text' value={search} onChange={(e) => handleSearch(e)} 
            placeholder='e.g. London'
            className='bg-white w-full rounded-lg py-[4px] shadow-sm px-2 text-[1rem] outline-none  ' />
          </form>
          <p>Or get weather at your location</p>
          <button onClick={handlerGetPosition} disabled={isGettingCoords}
          className='bg-amber-300 mb-4 rounded-lg py-2 hover:brightness-105 transition-all duration-200 shadow-md hover:shadow-none'>{!isGettingCoords ? 'See weather in my city' : 'Getting your location...'}</button>
        </div>

        <div className='grow px-6 text-lg flex flex-col gap-6 items-center justify-center'>
          {(isLoading && !error) && <Spinner />}
          {(!weatherObj && !error && !isLoading) && <div>Type the city in or press the button</div>}
          {weatherObj && !isLoading && !error &&
            <>
              <h2 className='text-xl'>{weatherObj.location.name} {`(${weatherObj.location.country} ${flag})`}</h2> 
              <div className='flex flex-col items-center justify-center'>
                <img src={`https:${weatherObj.current.condition?.icon}`} className='w-20 h-20'/>
                <p>{weatherObj.current.condition.text} | {weatherObj.current.temp_c} <span>&#8451;</span></p>
              </div>
            </>
           }
           {error && <Error error={error}/>}
        </div>

      </div>
    </div>
  )
}

export default App;