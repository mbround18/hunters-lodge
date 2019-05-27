import * as React from 'react';
import { LeafyMap } from '../components/leafyMap';

export class WorldMap extends React.Component {
  render() {
    return <LeafyMap />;
    // return <Mappy />;
    // return <img src={WorldMapImg} alt="world map" />;
    // return <IronImage srcPreload={LoadingImg} srcLoaded={WorldMapImg} />;
    // return (
    //   <LazyImage
    //     src={() => import('../assets/imgs/worldMap.png')}
    //     alt="World Map"
    //   />
    // );
  }
}
