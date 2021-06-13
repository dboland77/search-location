import React, {Fragment} from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";
import { Link } from "react-router-dom";

const containerStyle = {
  width: "60vw",
  height: "60vh",
};

const options = {
  styles: mapStyles,
};

const Map = (props) => {
  console.log(props.location.state)
  const center = {
    lat: props.location.state.lat,
    lng: props.location.state.lng,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <Fragment>
    <h1>{props.location.state.name}</h1>
      <div className="mapcontainer">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={options}
        ></GoogleMap>
      </div>
      <br/>
      <br/>
      <Link to="/">HOME</Link>
    </Fragment>
  );
};

export default Map;
