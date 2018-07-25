import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from "react-google-maps";

import Cacher from "../../services/cacher";

const MapComponent = ({ coordinates }) => (
  <GoogleMap defaultZoom={13} defaultCenter={coordinates} center={coordinates}>
    <Circle center={coordinates} radius={500} />
  </GoogleMap>
);

const withGeoCode = WrappedComponent => {
  return class extends React.Component {
    constructor() {
      super();
      this.cacher = new Cacher();
      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        }
      };
    }

    componentDidMount() {
      this.getGeocodedLocation();
    }

    geocodeLocation = location => {
      const geocoder = new window.google.maps.Geocoder();
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (result, status) => {
          if (status === "OK") {
            const geometry = result[0].geometry.location;
            const coordinates = {
              lat: geometry.lat(),
              lng: geometry.lng()
            };
            this.cacher.cacheValue(location, coordinates);
            resolve(coordinates);
          } else {
            reject("Error!!!");
          }
        });
      });
    };

    getGeocodedLocation = () => {
      const { location } = this.props;
      // if location is cached return cached values
      if (this.cacher.isValueCached(location)) {
        this.setState({
          coordinates: this.cacher.getCachedValue(location)
        });
        // else geocode location
      } else {
        this.geocodeLocation(location).then(
          coordinates => {
            this.setState({
              coordinates
            });
          },
          error => {
            console.error(error);
          }
        );
      }
    };

    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
};

export const MapWithAGeoCode = withScriptjs(
  withGoogleMap(withGeoCode(MapComponent))
);
