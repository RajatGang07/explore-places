import React, { useState , useContext} from 'react';

import "./Auth.css";
import Card from '../../../shared/components/UIElements/Card/Card';
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MIN, VALIDATOR_REQUIRE } from '../../../shared/utils/validators';
import useForm from '../../../shared/components/hooks/form-hooks';
import { AuthContext } from '../../../shared/context/auth-context';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    })

    const swithModeHandler = () => {
        if (!isLoginMode) {
            setFormData({ ...formState.inputs,
                 name: undefined }, formState.inputs.email.isValid, formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    };

    const onSubmitHandler = event => {
        event.preventDefault();
        console.log("", formState);
        auth.login();
    }

    return (
        <Card className="authentication">
            <h2>Login Required..</h2>
            <hr />
            <form onSubmit={onSubmitHandler}>
                {
                    !isLoginMode &&
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        error="Please enter a name"
                        onInput={inputHandler}
                    />
                }
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="E-mail"
                    validators={[VALIDATOR_EMAIL()]}
                    error="Please provide valid email"
                    onInput={inputHandler}
                />

                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MIN(6)]}
                    error="Please provide valid password, Atleast 5 characters"
                    onInput={inputHandler}
                />

                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? 'Login' : 'Sign Up'}
                </Button>

            </form>
            <Button inverse onClick={swithModeHandler} > Switch To {isLoginMode ? 'Signup' : 'Login'}</Button>
        </Card>
    );
}

export default Auth;
