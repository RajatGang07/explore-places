import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';
import img from '../../../assets/img.jpg'

import "../NewPlace/NewPlace.css";
import useForm from '../../../shared/components/hooks/form-hooks';

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
    creator: 'u1'
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

const UpdatePlace = (props) => {
    const [isLoad, setIsLoad] = useState(true);
    const placeId = useParams().placeId;


    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    
    }, false);

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        setFormData({
            title: {
                value: identifiedPlace.title,
                isValid: identifiedPlace.isValid
            },
            description: {
                value: identifiedPlace.description,
                isValid: identifiedPlace.isValid
            }
        
        }, true)
        setIsLoad(false)
    }, [setFormData, identifiedPlace])
   
    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState, "update")

    };

    if (!identifiedPlace) {
        return <div className="center">Could not find place</div>
    }

    if(isLoad){
        return <div className="center">
            Loading
        </div>
    }
    return (
        
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                type="text"
                element="input"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}

            />

            <Input
                element="textarea"
                rows={3}
                id="description"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)"
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}

            />
            <Button type="submit" disabled={!formState.isValid}>
                Edit Place
      </Button>
        </form>
    );
};

export default UpdatePlace;
