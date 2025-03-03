import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id}= useParams();
  const navigate= useNavigate(); 

  const[apiData, setApiData]= useState({
    name: "",
    key: "",
    published_at: "",
    typeof: " "
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWExOTIyMmJjMjdlMTJlOThiY2RjZWY4ZDQ2ZjIxMyIsIm5iZiI6MTc0MDI0NTQ4Ny4zMzQsInN1YiI6IjY3YmEwOWVmYjk3MzY3ZmNkNDBhODM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lGxEt110V3yK0aE5uYPIM4HUaUR5C3qAeg4Txw5yNuo'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));

  },[])


  return (
    <div className='Player'>
      <img src={back_arrow_icon} alt="" sx={{}} onClick={()=>{navigate(-2)}}/>
      <div className='Player2'>



      <iframe width='90%' height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
      </div>
    </div>
  )
}

export default Player
