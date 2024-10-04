import './profile.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Profile () {
  const [user, setUser] = useState([])
  const { id } = useParams()

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = () => {
    let url = 'https://myportfolioapi-8vku.onrender.com'
    axios
      .get(`${url}/auth/getUserById/${id}`)
      .then(({ data }) => {
        setUser(data.data)
      })
      .catch(error => {
        console.error('Error fetching user:', error)
      })
  }

  return (
    <div className='profile-container'>
      <h2>User Profile</h2>
      <div className='profile-content'>
        <img src={user.image} alt={user.fullNames} />
        <h3>
          {user.fullNames}
        </h3>
        <p>
          Email: {user.email}
        </p>
        <p>
          Phone Number: {user.phoneNumber}
        </p>
        <p>
          Role: {user.role}
        </p>
        <p>
          Gender: {user.gender}
        </p>
      </div>
    </div>
  )
}

export default Profile
