import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function SignUp() {
  const history = useHistory();
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

  const signUp = async (e) => {
    console.log(e);

    try {
      await axios.post('http://localhost:3000/register', {
        ...e
      });
      history.push('/signin');
    } catch (e) {
      setError("api", {
        type: "manual",
        message: "Invalid user or user already exists",
      });
    }
  }

  return (
    <>
      <h1>Registreren</h1>
      <form onSubmit={handleSubmit(signUp)}>
        <input type="email" placeholder="email" {...register("email", { required: true, maxLength: 80 })} />
        <input type="password" placeholder="password" {...register("password", { required: true, maxLength: 100 })} />
        <input type="text" placeholder="username" {...register("username", {})} />
        {errors.api && <p>{errors.api.message}</p>}
        <input type="submit" onClick={() => clearErrors('api')} />
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;