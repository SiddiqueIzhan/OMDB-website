import React, { useEffect, useState } from 'react'
// import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css'
import "./App.css"

const MovieCard = (props) => {
    return (
      <div>
          <div className="card" style={{width: "200"}}>
          <img src={props.poster} className="card-img-top" alt="im" width="100%" height={300}/>
          <div className="card-body">
          <h2 className="card-title">{props.name}</h2>
          <p className="card-text">{props.year}</p>
          </div>
          </div>
      </div>
    )
  }

const OMDB = () => {
    let [state, setState] = useState([])
    let [movie, setMovie] = useState("")
    let [input , setInput] = useState("")
    useEffect(() => {
        if(movie === ""){
            console.log("type something")
        }
        else{
            fetch(`http://www.omdbapi.com/?s=${movie}&apikey=6869d764`)
            .then(res => res.json())
            .then(data => { setState(data.Search)  })
        }
    }, [movie])

    let handleSubmit = (e) => {
        setMovie(input)
        console.log(input)
        e.preventDefault()
    }
  return (
    <div className='page'>
        <br />
        <h1>OMDb API</h1>
        <br />
        <form onSubmit={handleSubmit}>
            <input type="search" className='form-control w-100 ' value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit" className='btn btn-danger btn-sm'>SEARCH</button>
        </form>
        <br />
        <div className='cont'>
        {
            state.map((elem, i) => {
                return(
                    <>
                         <MovieCard key={i} name={elem.Title} poster={elem.Poster} year={elem.Year} />
                    </> 
                )
            })
        }
        </div>
    </div>
  )
}



export default OMDB