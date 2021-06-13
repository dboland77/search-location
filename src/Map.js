import React, {Fragment} from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";
import { Link } from "react-router-dom";
import "./Map.css";

const containerStyle = {
  width: "50vw",
  height: "50vh",
};

const center = {
  lat: 35.6804,
  lng: 139.769,
};

const options = {
  styles: mapStyles,
};

const Map = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <Fragment>
      <div className="mapcontainer">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
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
