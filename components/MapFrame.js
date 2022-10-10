import React, { useState, useMemo } from 'react'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getCenter } from 'geolib'
import { XIcon } from '@heroicons/react/solid'
import Pin from './Pin'
import Image from 'next/image'

const scaleControlStyle = {
  marginBottom: '2rem',
  border: 'none'
}

const positionOptions = { enableHighAccuracy: true };

export default function MapFrame({ searchResults }) {
  const [popupInfo, setPopupInfo] = useState(null)

  const coords = searchResults?.map(result => ({
    longitude: result.long,
    latitude: result.lat
  }))

  const center = getCenter(coords)

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    height: '100%',
    width: '100%',
    zoom: 11,
    bearing: 0,
    pitch: 0
  })

  const pins = useMemo(
    () =>
      searchResults?.map((result, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={result.long}
          latitude={result.lat}
          anchor="bottom"
        >
          <Pin onClick={() => setPopupInfo(result)} />
        </Marker>
      )),
    [searchResults]
  )

  return (
    <>
      <Map
        initialViewState={viewport}
        mapStyle='mapbox://styles/mavixx/cku9q9gfg260818s0btpzohb6'
        mapboxAccessToken={process.env.MAPBOX_TOKEN}
        onMove={nextViewport => setViewport(nextViewport)}
      >

        {pins}

        {popupInfo && (
          <Popup
            longitude={Number(popupInfo.long)}
            latitude={Number(popupInfo.lat)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
            anchor="bottom"
            offset={30}
            closeButton={false}
          >
            <div className="rounded-lg">
              <div className="flex items-center mb-1">
                <p className="font-medium truncate pr-1">{popupInfo?.title}</p>
                <XIcon onClick={() => setPopupInfo(null)} className="w-5 h-5 p-1 hover:bg-gray-300 rounded-full fill-black text-black ml-auto cursor-pointer" />
              </div>
              <div className="relative h-32">
                <Image
                  src={popupInfo.img}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                  alt=""
                />
              </div>
            </div>
          </Popup>
        )}

        <GeolocateControl
          positionOptions={positionOptions}
          trackUserLocation
          position="top-right"
        />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-right" style={scaleControlStyle} />
      </Map>
    </>
  )
}