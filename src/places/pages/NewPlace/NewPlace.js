import React from 'react';

import Input from '../../../shared/components/FormElements/Input/Input';
import './NewPlace.css';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';
import Button from '../../../shared/components/FormElements/Button/Button';
import useForm from '../../../shared/components/hooks/form-hooks';



const NewPlace = () => {

  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    },

  }, false)


  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs)

  }
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        label="Title"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}

      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
        onInput={inputHandler}

      />
      <Input
        element="textarea"
        rows={3}
        id="description"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)"
        onInput={inputHandler}

      />
      <Button type="submit" disabled={!formState.isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
