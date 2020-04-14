import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import img from '../../../assets/img.jpg'
import PlaceList from '../../component/PlaceList/PlaceList';
import { useHttpClient } from '../../../shared/components/hooks/httpHook';
import ErrorModal from '../../../shared/components/UIElements/Error/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/Loader/LoadingSpinner';


const UserPlaces = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlaces, setLoadedPlace] = useState(null);

   const userId =  useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
          try {
            const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
            setLoadedPlace(responseData.userWithPlaces)
          } catch (err) { }
        }
        fetchPlaces();
      }, [sendRequest, userId])

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
      {
        isLoading && <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      }
        {!isLoading && loadedPlaces && <PlaceList item={loadedPlaces} />}
        </React.Fragment>
    );
}

export default UserPlaces;
