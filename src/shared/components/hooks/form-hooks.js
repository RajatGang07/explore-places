import React, { useCallback, useReducer } from 'react';



const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formsIsValid = true;
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue;
                }
                if (inputId === action.inputId) {
                    formsIsValid = formsIsValid && action.isValid
                } else {
                    formsIsValid = formsIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formsIsValid
            }

        case "SET_DATA":
            return {
                inputs: action.inputs,
                isValid: action.formsIsValid
            }

        default:
            return state
    }
};



const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    })

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id })
    }, [])

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formsIsValid: formValidity
        })
    }, [])

    return [formState, inputHandler, setFormData];


}

export default useForm