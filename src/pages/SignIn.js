import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

function SignIn() {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

  const signIn = async (e) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        ...e
      });
      login(response.data.accessToken);
    } catch (e) {
      setError("api", {
        type: "manual",
        message: "Something went wrong, try again later",
      });
    }
  }

  return (
    <>
      <h1>Inloggen</h1>
      <form onSubmit={handleSubmit(signIn)}>
        <input type="email" placeholder="Email" {...register("email", { required: true, maxLength: 80 })} />
        <input type="password" placeholder="Password" {...register("password", { required: true, maxLength: 100 })} />
        {errors.api && <p>{errors.api.message}</p>}
        <input type="submit" onClick={() => clearErrors('api')} />
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;