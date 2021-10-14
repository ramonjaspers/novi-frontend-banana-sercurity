import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import axios from 'axios';

function Profile() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  useEffect(() => {
    // check if we got a token
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`http://localhost:3000/660/private-content`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }).then(({ data }) => {
        setContent(data.content);
        setTitle(data.title);
      });
    }
  }, []);

  const { user } = useContext(AuthContext);
  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam: </strong>{user.username}</p>
        <p><strong>Email: </strong>{user.email}</p>
      </section>
      <section>
        <h2>{title}</h2>
        <p>{content}</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;