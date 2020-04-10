import React from 'react';
import {useParams} from 'react-router-dom';

import img from '../../assets/img.jpg'
import PlaceList from '../component/PlaceList';

const DUMMY_PLACES = [{
    id: 'p1',
    title: 'Klassik Landmark',
    description: 'One of the most famous scrappers in the world',
    imageUrl: img,
    address: 'Cosmos 13A Klassik Landmark Sarjapur Road',
    location: {
        lat: 12.8960006,
        lng: 77.6755386
    },
    creator:'u1'
},
{
    id: 'p2',
    title: 'Klassik Landmark',
    description: 'One of the most famous scrappers in the world',
    imageUrl: img,
    address: 'Cosmos 13A Klassik Landmark Sarjapur Road',
    location: {
        lat: 12.8960006,
        lng: 77.6755386
    },
    creator: 'u2'
}]

const UserPlaces = (props) => {
   const userId =  useParams().userId;
   const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
    return (
        <PlaceList item={loadedPlaces} />
    );
}

export default UserPlaces;
