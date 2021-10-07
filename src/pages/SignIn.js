import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

function SignIn() {
  const { login } = useContext(AuthContext);
  const { register } = useForm();

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={login}>
        <input type="email" placeholder="Email" {...register("Email", { required: true, maxLength: 80 })} />
        <input type="password" placeholder="Password" {...register("Password", { required: true, maxLength: 100 })} />

        <input type="submit" />
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;