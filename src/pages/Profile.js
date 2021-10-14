import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import axios from 'axios';

function Profile() {
  const { user } = useContext(AuthContext);
  // Init states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // check if we got a token
    const token = localStorage.getItem('token');
    if (token) {
      // When token is present fetch page content
      axios.get(`http://localhost:3000/660/private-content`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }).then(({ data }) => {
        // Set states with recieved data
        setContent(data.content);
        setTitle(data.title);
      }).catch(() => {
        // Random ass catch which should be never reachable
        setContent('bananen');
        setTitle('Zitten vol met banaan. If you see this please contant the administrator.');
      });
    }
  }, []);

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