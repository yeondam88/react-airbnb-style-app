import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Circle
} from "react-google-maps";

import Cacher from "../../services/cacher";

const MapComponent = ({ coordinates, isError, isLocationLoaded }) => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={coordinates}
    center={coordinates}
    options={{ disableDefaultUI: isError ? true : false }}
  >
    {isLocationLoaded &&
      !isError && <Circle center={coordinates} radius={500} />}
    {isLocationLoaded &&
      isError && (
        <InfoWindow position={coordinates} options={{ maxWidth: 300 }}>
          <div>
            Oooh, there is problem to find location on the map, we are trying to
            resolve problem as fast as possible. Contact host for additional
            information if you are still interested in booking this place. We
            are sorry for inconveniance.
          </div>
        </InfoWindow>
      )}
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
        },
        isError: false,
        isLocationLoaded: false
      };
    }

    componentDidMount() {
      this.getGeocodedLocation();
    }

    updateCoordinates = coordinates => {
      this.setState({
        coordinates,
        isLocationLoaded: true
      });
    };

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
        this.updateCoordinates(this.cacher.getCachedValue(location));
        // else geocode location
      } else {
        this.geocodeLocation(location).then(
          coordinates => {
            this.updateCoordinates(coordinates);
          },
          error => {
            this.setState({ isError: true, isLocationLoaded: true });
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
