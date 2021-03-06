import React from "react";
// import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import { mapStringToPolylines } from "../utils/convert";

class Map extends React.Component {
  watchID: Promise<{ remove(): void }> | undefined;

  constructor(props) {
    super(props);
    const polyline = mapStringToPolylines(
      props.polylines
    ).map(([latitude, longitude]) => ({ latitude, longitude }));
    // console.log(decode(props.polyline))

    this.state = {
      polyline,
    };
  }

  async componentDidMount() {
    // await Location.requestPermissionsAsync();
    // const { coords: {latitude, longitude }} = await Location.getCurrentPositionAsync();
    // console.log(`${latitude}, ${longitude}`);
    // this.setState({ currentLocation: { latitude, longitude } });
    // this.watchID = Location.watchPositionAsync(
    //   {
    //     accuracy: Location.Accuracy.Balanced,
    //     enableHighAccuracy: false,
    //     timeInterval: 100,
    //     distanceInterval: 0.0000000001
    //   },
    //   (position) => {
    //     console.log(position);
    //     const { latitude, longitude } = position.coords;
    //     this.setState({ currentLocation: { latitude, longitude } });
    //   }
    // );
  }

  // componentWillUnmount() {
  //   this.watchID?.then(({ remove }) => remove());
  // }

  render() {
    const { latitude: sLat, longitude: sLng } = this.props.sendLatLng;
    const { latitude: rLat, longitude: rLng } = this.props.receiveLatLng;
    const { latitude: cLat, longitude: cLng } = this.props.currentLatLng;
    const { polyline } = this.state;

    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: cLat,
          longitude: cLng,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          key="send"
          coordinate={{
            latitude: sLat,
            longitude: sLng,
          }}
        />
        <Marker
          key="receive"
          coordinate={{
            latitude: rLat,
            longitude: rLng,
          }}
        />
        <Marker
          key="current"
          coordinate={{
            latitude: cLat,
            longitude: cLng,
          }}
        />
        <Polyline
          coordinates={polyline}
          strokeColor="#B24112"
          strokeWidth={4}
        />
        {/* <Polyline coordinates={paths} strokeColor="#238C23" strokeWidth={4} /> */}
      </MapView>
    );
  }
}

export default Map;
