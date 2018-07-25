import React from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MapComponent = ({ coordinates }) => (
  <GoogleMap defaultZoom={8} defaultCenter={coordinates} center={coordinates}>
    <Marker position={coordinates} />
  </GoogleMap>
);

const withGeoCode = WrappedComponent => {
  return class extends React.Component {
    state = {
      coordinates: {
        lat: 0,
        lng: 0
      }
    };

    componentDidMount() {
      this.geoCodeLocation();
    }

    geoCodeLocation = () => {
      const { location } = this.props;
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: location }, (result, status) => {
        if (status === "OK") {
          const geometry = result[0].geometry.location;
          const coordinates = {
            lat: geometry.lat(),
            lng: geometry.lng()
          };

          this.setState({
            coordinates
          });
        }
      });
    };

    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
};

export const MapWithAGeoCode = withScriptjs(
  withGoogleMap(withGeoCode(MapComponent))
);
