import * as React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import notFoundImage from '../assets/imgs/tileNotFound.jpg';

interface Viewport {
  center: number[];
  zoom: number;
}

interface LeafyMapState {
  viewport: Viewport;
}

interface LeafyMapProps {
  viewport?: Viewport;
}

export class LeafyMap extends React.Component<LeafyMapProps, LeafyMapState> {
  state = {
    viewport: {
      center: [85.02154204362702, 180.66200438319675],
      zoom: 10
    }
  };
  componentWillReceiveProps({ viewport }: LeafyMapProps) {
    // When the provided viewport changes, apply it
    if (viewport && viewport !== this.props.viewport) {
      this.setState({ viewport });
    }
  }

  onViewportChanged = (viewport: Viewport) => {
    // The viewport got changed by the user, keep track in state
    console.log({ viewport });
    this.setState({ viewport });
  };

  render() {
    return (
      <LeafletMap
        maxZoom={13}
        attributionControl={false}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        onViewportChanged={this.onViewportChanged}
        viewport={this.state.viewport}
      >
        >
        <TileLayer
          maxZoom={13}
          minZoom={10}
          url="assets/map/{z}/{y}/{x}.png"
          errorTileUrl={notFoundImage}
        />
        <Marker position={[0, 0]}>
          <Popup>Popup for any custom information.</Popup>
        </Marker>
      </LeafletMap>
    );
  }
}
