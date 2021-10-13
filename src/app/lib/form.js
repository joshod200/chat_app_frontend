import React from "react";
import SimpleReactValidator from "simple-react-validator";

export default function useForm(
  {
    init,
    validatorProps
  }
){
  const [isEditing, setIsEditing] = React.useState(false);
  const [formState, setFormState] = React.useState(init);
  const {current: validator} = React.useRef(new SimpleReactValidator(validatorProps));
  const [forceUpdate, setForceUpdate] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const formStateRef = React.useRef();

  const handleSetErrors = (e) => {
    setErrors(e);
    validator.showMessages();
    setForceUpdate(!forceUpdate);
  };

  const onSetIsEditing = (state, url) => {
    setIsEditing(true);
    setFormState(state);
  };

  const onClearForm = () => {
    setIsEditing(false);
    setFormState(init);
  };

  const onBlur = ({target}) => {
    const value = formState[target.name];
    validator.showMessageFor(value); // show the error for that value
  };

  const onSetImage = ({target}, file) => {
    const {name} = target;
    setFormState({...formStateRef.current, [name]: file});
  };

  const onChange = ({target}) => {
    const {name, value, checked} = target;
    const actual = target.type === "checkbox" ? checked : value;
    setFormState({...formStateRef.current, [name]: actual});
  };

  const onValidate = () => {
    if(validator.allValid()) return true;
    else {
      validator.showMessages();
      setForceUpdate(!forceUpdate);
      return false;
    }
  };

  const formHelper = (field, name, rule, opts = {  }) => {
    const {help, errorField} = opts;
    // errorField is to be displayed if it is not null
    if(errorField){
      var error = validator.messageWhenPresent(errorField);
      if(error) return error;
    }
    if(rule){
      error = validator.message(name, field, rule);
      if(error) return error;
    }
    return help;
  };

  React.useEffect(() => {
    formStateRef.current = formState;
  }, [formState]);

  return {
    formState,
    formStateRef,
    isEditing,
    validator,
    onSetIsEditing,
    onChange,
    onSetImage,
    formHelper,
    onValidate,
    setFormState,
    errors,
    onClearForm,
    handleSetErrors
  };

};
