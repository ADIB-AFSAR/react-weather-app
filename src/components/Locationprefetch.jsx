import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Weather from './Weather';

function Locationprefetch() {
     const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

  
  const bigDataCloudApiKey = process.env.REACT_APP_BIGDATACLOUD_API_KEY
  
  useEffect(() => {
    const fetchLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          setError(`Error retrieving location: ${err.message}`);
        }
      );
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${bigDataCloudApiKey}`
        );
        if (response.data) {
          setLocation(response.data.city);
        } else {
          setError('No location found');
        }
      } catch (error) {
        setError('Error fetching location');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  if (loading) {
    return <p>Poor Network Connection : Wait Loading ... </p>;
  }

  return <>
    <Weather location={location} error={error}/>
  </>
}
export default Locationprefetch