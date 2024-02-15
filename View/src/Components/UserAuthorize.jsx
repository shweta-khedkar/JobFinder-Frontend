import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';

const UserAuthorize = ({children, authentication=true}) => {
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate();
    const {user: {isAuth: userStatus}} = useAuth();

    useEffect(()=> {
        if(authentication && !userStatus) navigate('/signin')
        else if(!authentication && userStatus) navigate('/')
        setLoader(false);
    }, [])
  return (
    loader ? <h1>Loading...</h1> : <>{children}</>
  )
}

export default UserAuthorize