import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, {
  Coordinate,
  LatLng,
  Marker,
  Overlay,
  Point,
  Region,
} from "react-native-maps";

const uri =
  "https://vacationresortsrus.com/wp-content/uploads/2012/10/Smugglers-floorplan-2BR-150x150.png";
const OVERLAY_TOP_LEFT_COORDINATE1: Coordinate = [
  52.11931909933157,
  4.696993567049503,
];
const OVERLAY_BOTTOM_RIGHT_COORDINATE1: Coordinate = [
  52.109319068789766,
  4.606266506016254,
];

type Props = {};

export default function FloorPlan() {
  const region: Region = {
    latitude: 52.114319,
    longitude: 4.65163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const [coordinate, setCoordinate] = useState({
    latitude: 52.114319,
    longitude: 4.65163,
  });
  const mapRef = useRef<MapView>(null);

  const northEast: LatLng = {
    latitude: OVERLAY_TOP_LEFT_COORDINATE1[0],
    longitude: OVERLAY_TOP_LEFT_COORDINATE1[1],
  };
  const southWest: LatLng = {
    latitude: OVERLAY_BOTTOM_RIGHT_COORDINATE1[0],
    longitude: OVERLAY_BOTTOM_RIGHT_COORDINATE1[1],
  };
  const setBounding = async () => {
    mapRef?.current?.setMapBoundaries(northEast, southWest);
  };

  //#region anchor mixin
  /** A function that generates the centerOffset prop based on the anchor value */
  const getCenterOffsetForAnchor = (
    anchor: Point,
    markerWidth: number,
    markerHeight: number
  ): Point => ({
    x: markerWidth * 0.5 - markerWidth * anchor.x,
    y: markerHeight * 0.5 - markerHeight * anchor.y,
  });

  /** Marker's width */
  const MARKER_WIDTH = 50;
  /** Marker's height */
  const MARKER_HEIGHT = 70; // marker height

  /** Customizable anchor prop - Specify your desired anchor adjustements here */
  const ANCHOR = { x: 0.5, y: 0.5 }; // in my case I customized this based on marker dimensions like this: { x: 0.5, y: 1 - 10 / MARKER_HEIGHT } lifting the marker up a bit
  /** auto generated centerOffset prop based on the anchor property */
  const CENTEROFFSET = getCenterOffsetForAnchor(
    ANCHOR,
    MARKER_WIDTH,
    MARKER_HEIGHT
  );
  //#endregion
  return (
    <View style={styles.container}>
      <MapView
        zoomEnabled={false}
        zoomTapEnabled={false}
        minZoomLevel={15}
        maxZoomLevel={15}
        ref={mapRef}
        style={styles.map}
        provider={"google"}
        initialRegion={region}
        onPress={setBounding}
        onMapReady={setBounding}
        maxDelta={0}
        scrollEnabled={false}
        rotateEnabled={false}
        showsIndoorLevelPicker
      >
        <Overlay
          bounds={[
            OVERLAY_TOP_LEFT_COORDINATE1,
            OVERLAY_BOTTOM_RIGHT_COORDINATE1,
          ]}
          image={{ uri: uri }}
        />
        <Marker
          tracksViewChanges={false}
          draggable
          coordinate={coordinate}
          anchor={ANCHOR}
          centerOffset={CENTEROFFSET}
          onDragEnd={(e) => setCoordinate(e.nativeEvent.coordinate)}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
