import React, { useContext } from 'react';
import {useHistory} from 'react-router-dom';
import Input from '../../../shared/components/FormElements/Input/Input';
import './NewPlace.css';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';
import Button from '../../../shared/components/FormElements/Button/Button';
import useForm from '../../../shared/components/hooks/form-hooks';
import { useHttpClient } from '../../../shared/components/hooks/httpHook';
import { AuthContext } from '../../../shared/context/auth-context';
import LoadingSpinner from '../../../shared/components/UIElements/Loader/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Error/ErrorModal';



const NewPlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext);
  console.log(auth);
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

  const history = useHistory();
  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest('http://localhost:5000/api/places', 'POST', JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        address: formState.inputs.address.value,
        creator: auth.userId
      }),
      {
        'Content-Type': 'application/json'
      }
      )
      // Redirect user
      history.push('/')
    } catch (err) { }


  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
  
      <form className="place-form" onSubmit={placeSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay />}
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
    </React.Fragment>
  );
};

export default NewPlace;
