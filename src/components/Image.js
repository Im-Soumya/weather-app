import React, { useState } from "react";

const Image = ({ weather }) => {
  const [image, setImage] = useState()

  const getImage = () => {

    if (weather.name !== "undefined") {
      const URL = `https://api.unsplash.com/search/photos?query=${weather.name}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
      fetch(URL)
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error(res.statusText)
          }
        })
        .then(res => {
          setImage(res.results[1].urls.raw)
        })
    }
  }

  getImage()

  return (
    <>
      <img
        className="image"
        src={image}
        alt="background"
      />
    </>
  )
}

export default Image;