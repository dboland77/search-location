import React, { Fragment } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";

const containerStyle = {
  width: "60vw",
  height: "60vh",
};

const options = {
  styles: "",
};

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
console.log(API_KEY)

const Map = (props) => {
  const center = {
    lat: props.location.state.lat,
    lng: props.location.state.lng,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  console.log(API_KEY)

  return (
    <Fragment>
      <h1>{props.location.state.name}</h1>
      <div className="mapcontainer">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={options}
        >
          <Marker position={{ lat: center.lat, lng: center.lng }} />
        </GoogleMap>
      </div>
      <br />
      <br />
      <Link to="/">HOME</Link>
    </Fragment>
  );
};

export default Map;
