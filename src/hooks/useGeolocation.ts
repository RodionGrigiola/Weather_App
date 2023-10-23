import { useState } from 'react';

type Position = {
    latitude: number,
    longitude: number
}

export default function useGeolocation() {
    const [position, setPosition] = useState<Position | null>(null);
    const [isGettingCoords, setIsGettingCoords] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    function getCoords() {
        if (!navigator.geolocation) return setError("Your browser does not support geolocation");
        setIsGettingCoords(true);
        navigator.geolocation.getCurrentPosition(({coords}) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
        setIsGettingCoords(false);
        });
    }

    return {position, isGettingCoords, getCoords, error, setPosition};
}