// import { useEffect, useRef } from "react";

// const HERE_MAPS_API_KEY = "T8dVmsYhIyFHV3MtnwsK4ZR21JUiC2SVqH2b654ZXWk";

// export const Maps = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     const platform = new H.service.Platform({ apikey: HERE_MAPS_API_KEY });
//     const defaultLayers = platform.createDefaultLayers();
//     const map = new H.Map(
//       mapRef.current,
//       defaultLayers.vector.normal.map,
//       {
//         zoom: 12,
//         center: { lat: 19.076, lng: 72.8777 }, // Mumbai, India
//       }
//     );

//     // Add interactive features
//     new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
//     H.ui.UI.createDefault(map, defaultLayers);

//     // Heatmap Data (Fixed Colors Format)
//     const heatmapProvider = new H.data.heatmap.Provider({
//         colors: new H.data.heatmap.Colors({
//             '0': 'blue',
//             '0.5': 'red',
//             '1': 'green'
//           }, true),
//       opacity: 2,
//     });

//     const heatmapLayer = new H.map.layer.TileLayer(heatmapProvider);
//     map.addLayer(heatmapLayer);

//     heatmapProvider.addData([
//       { lat: 19.076, lng: 72.8777, value: 1 },
//       { lat: 19.084, lng: 72.869, value: 0.8 },
//       { lat: 19.062, lng: 72.882, value: 0.7 },
//       { lat: 19.1, lng: 72.85, value: 0.6 },
//       { lat: 19.07, lng: 72.9, value: 0.9 },
//       { lat: 19.05, lng: 72.88, value: 0.5 },
//     ]);
//   }, []);

//   return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
// };

import { useEffect, useRef } from "react";

const HERE_MAPS_API_KEY = "T8dVmsYhIyFHV3MtnwsK4ZR21JUiC2SVqH2b654ZXWk";

export const Maps = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Ref to store the map instance

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map instance if it exists
    if (mapInstance.current) {
      mapInstance.current.dispose();
      mapInstance.current = null;
    }

    const platform = new H.service.Platform({ apikey: HERE_MAPS_API_KEY });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        zoom: 12,
        center: { lat: 19.076, lng: 72.8777 }, // Mumbai, India
      }
    );

    // Store the map instance in the ref
    mapInstance.current = map;

    // Add interactive features
    new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    H.ui.UI.createDefault(map, defaultLayers);

    // Heatmap Data (Fixed Colors Format)
    const heatmapProvider = new H.data.heatmap.Provider({
      colors: new H.data.heatmap.Colors({
        '0': 'blue',
        '0.9': 'red',
        '1': 'green'
      }, true),
      opacity: 1, // Fixed opacity to a valid range (0 to 1)
    });

    const heatmapLayer = new H.map.layer.TileLayer(heatmapProvider);
    map.addLayer(heatmapLayer);

    heatmapProvider.addData([
        { lat: 19.112, lng: 72.932, value: 0.5 },
        { lat: 19.100, lng: 72.860, value: 0.6 },
        { lat: 19.130, lng: 72.890, value: 0.7 },
        { lat: 19.142, lng: 72.883, value: 0.8 },
        { lat: 19.165, lng: 72.930, value: 0.4 },
        { lat: 19.155, lng: 72.870, value: 0.9 },
        { lat: 19.180, lng: 72.935, value: 0.7 },
        { lat: 19.175, lng: 72.850, value: 0.5 },
        { lat: 19.135, lng: 72.820, value: 0.6 },
        { lat: 19.150, lng: 72.910, value: 0.8 },
        { lat: 19.110, lng: 72.940, value: 0.6 },
        { lat: 19.125, lng: 72.980, value: 0.5 },
        { lat: 19.165, lng: 72.860, value: 0.4 },
        { lat: 19.145, lng: 72.880, value: 0.9 },
        { lat: 19.120, lng: 72.850, value: 0.7 },
        { lat: 19.160, lng: 72.870, value: 0.6 },
        { lat: 19.185, lng: 72.800, value: 0.5 },
        { lat: 19.200, lng: 72.910, value: 0.6 },
        { lat: 19.170, lng: 72.950, value: 0.4 },
        { lat: 19.190, lng: 72.860, value: 0.7 },
        { lat: 19.120, lng: 72.870, value: 0.6 },
        { lat: 19.115, lng: 72.880, value: 0.7 },
        { lat: 19.122, lng: 72.875, value: 0.7 },
        { lat: 19.118, lng: 72.890, value: 0.6 },
        { lat: 19.125, lng: 72.885, value: 0.5 },
        { lat: 19.130, lng: 72.865, value: 0.6 },
        { lat: 19.128, lng: 72.880, value: 0.7 },
        { lat: 19.120, lng: 72.875, value: 0.6 },
        { lat: 19.121, lng: 72.865, value: 0.6 },
        { lat: 19.125, lng: 72.878, value: 0.8 },
        { lat: 19.133, lng: 72.860, value: 0.5 },
        { lat: 19.137, lng: 72.870, value: 0.4 },
        { lat: 19.129, lng: 72.865, value: 0.7 },
        { lat: 19.126, lng: 72.860, value: 0.5 },
        { lat: 19.140, lng: 72.880, value: 0.6 },
        { lat: 19.143, lng: 72.875, value: 0.7 },
        { lat: 19.135, lng: 72.875, value: 0.6 },
        { lat: 19.142, lng: 72.868, value: 0.5 },
        { lat: 19.138, lng: 72.880, value: 0.8 },
        { lat: 19.132, lng: 72.888, value: 0.6 },
        { lat: 19.124, lng: 72.882, value: 0.5 },
        { lat: 19.140, lng: 72.886, value: 0.7 },
        { lat: 19.136, lng: 72.872, value: 0.4 },
        { lat: 19.119, lng: 72.895, value: 0.7 },
        { lat: 19.124, lng: 72.890, value: 0.5 },
        { lat: 19.139, lng: 72.895, value: 0.6 },
        { lat: 19.141, lng: 72.887, value: 0.7 },
        { lat: 19.132, lng: 72.894, value: 0.8 },
        { lat: 19.140, lng: 72.890, value: 0.6 },
        { lat: 19.133, lng: 72.885, value: 0.5 },
        { lat: 19.125, lng: 72.880, value: 0.7 },
        { lat: 19.118, lng: 72.876, value: 0.6 },
        { lat: 19.135, lng: 72.860, value: 0.5 },
        { lat: 19.136, lng: 72.855, value: 0.8 },
        { lat: 19.129, lng: 72.870, value: 0.7 },
        { lat: 19.127, lng: 72.885, value: 0.5 },
        { lat: 19.123, lng: 72.865, value: 0.6 },
        { lat: 19.140, lng: 72.875, value: 0.7 },
        { lat: 19.138, lng: 72.860, value: 0.6 },
        { lat: 19.124, lng: 72.868, value: 0.8 },
        { lat: 19.130, lng: 72.860, value: 0.7 },
        { lat: 19.128, lng: 72.860, value: 0.5 },
        { lat: 19.136, lng: 72.888, value: 0.6 },
        { lat: 19.134, lng: 72.872, value: 0.8 },
        { lat: 19.129, lng: 72.875, value: 0.7 },
        { lat: 19.141, lng: 72.878, value: 0.5 },
        { lat: 19.139, lng: 72.869, value: 0.6 },
        { lat: 19.137, lng: 72.865, value: 0.7 },
        { lat: 19.125, lng: 72.866, value: 0.6 },
        { lat: 19.132, lng: 72.880, value: 0.7 },
        { lat: 19.120, lng: 72.890, value: 0.8 },
        { lat: 19.135, lng: 72.869, value: 0.5 },
        { lat: 19.130, lng: 72.882, value: 0.7 },
        { lat: 19.124, lng: 72.884, value: 0.5 },
        { lat: 19.133, lng: 72.869, value: 0.6 },
        { lat: 19.131, lng: 72.875, value: 0.7 },
        { lat: 19.137, lng: 72.878, value: 0.8 },
        { lat: 19.136, lng: 72.864, value: 0.6 },
        { lat: 19.126, lng: 72.868, value: 0.5 },
        { lat: 19.131, lng: 72.887, value: 0.7 },
        { lat: 19.127, lng: 72.879, value: 0.6 },
        { lat: 19.139, lng: 72.877, value: 0.5 },
        { lat: 19.122, lng: 72.882, value: 0.7 },
        { lat: 19.133, lng: 72.874, value: 0.6 },
        { lat: 19.128, lng: 72.870, value: 0.5 },
        { lat: 19.138, lng: 72.883, value: 0.6 },
        { lat: 19.132, lng: 72.865, value: 0.7 },
        { lat: 19.126, lng: 72.880, value: 0.8 },
        { lat: 19.134, lng: 72.864, value: 0.6 },
        { lat: 19.127, lng: 72.885, value: 0.5 },
        { lat: 19.131, lng: 72.876, value: 0.6 },
        { lat: 19.139, lng: 72.883, value: 0.7 },
        { lat: 19.123, lng: 72.885, value: 0.5 },
        { lat: 19.125, lng: 72.860, value: 0.7 },
        { lat: 19.134, lng: 72.868, value: 0.6 },
        { lat: 19.120, lng: 72.882, value: 0.7 }
    ]);
    
      

    // Cleanup function to dispose of the map when the component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.dispose();
        mapInstance.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};