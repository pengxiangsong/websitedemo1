'use client';

import { useEffect, useRef, useState } from 'react';

interface MapOptions {
  center: LatLng;
  zoom: number;
  pitch: number;
  rotation: number;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface MarkerStyle {
  width: number;
  height: number;
  anchor: { x: number; y: number };
  src: string;
}

interface MultiMarkerOptions {
  map: TMap;
  styles: { [key: string]: MarkerStyle };
  geometries: Array<{
    id: string;
    position: LatLng;
    properties: { title: string };
  }>;
}

interface InfoWindowOptions {
  map: TMap;
  position: LatLng;
  content: string;
  offset: { x: number; y: number };
}

interface TMap {
  destroy(): void;
}

interface SearchResult {
  title: string;
  location: { lat: number; lng: number };
  address: string;
}

interface SearchOptions {
  pageSize?: number;
  pageIndex?: number;
  region?: string;
}

interface TMapType {
  Map: new (container: HTMLElement, options: MapOptions) => TMap;
  LatLng: new (lat: number, lng: number) => LatLng;
  MultiMarker: new (options: MultiMarkerOptions) => void;
  MarkerStyle: new (options: MarkerStyle) => MarkerStyle;
  InfoWindow: new (options: InfoWindowOptions) => { open(): void };
  service: {
    Search: {
      new (options?: SearchOptions): {
        search: (query: string) => Promise<{ data: { count: number; request_id: string; result: SearchResult[] } }>;
      };
    };
  };
}

declare global {
  interface Window {
    TMap: TMapType;
  }
}

interface TencentMapProps {
  latitude: number;
  longitude: number;
  address: string;
}

const TencentMap = ({ latitude, longitude, address }: TencentMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<TMap | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!window.TMap || !searchQuery) return;
    
    setIsSearching(true);
    try {
      const searchService = new window.TMap.service.Search();
      const result = await searchService.search(searchQuery);
      setSearchResults(result.data.result);
      
      if (result.data.result.length > 0) {
        const firstResult = result.data.result[0];
        updateMapLocation(firstResult.location.lat, firstResult.location.lng, firstResult.address);
      }
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const updateMapLocation = (lat: number, lng: number, addr: string) => {
    if (!mapInstance.current || !window.TMap) return;

    const TMap = window.TMap;
    const newCenter = new TMap.LatLng(lat, lng);
    
    // 更新地图中心
    mapInstance.current = new TMap.Map(mapRef.current!, {
      center: newCenter,
      zoom: 16,
      pitch: 0,
      rotation: 0
    });

    // 更新标记点
    const markerStyle = new TMap.MarkerStyle({
      width: 25,
      height: 35,
      anchor: { x: 12.5, y: 35 },
      src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/marker.png'
    });

    new TMap.MultiMarker({
      map: mapInstance.current as TMap,
      styles: { marker: markerStyle },
      geometries: [{
        id: 'company',
        position: newCenter,
        properties: { title: addr }
      }]
    });

    // 更新信息窗
    new TMap.InfoWindow({
      map: mapInstance.current as TMap,
      position: newCenter,
      content: `
        <div style="padding: 10px;">
          <h4 style="margin: 0 0 5px;">选定位置</h4>
          <p style="margin: 0;">${addr}</p>
        </div>
      `,
      offset: { x: 0, y: -35 }
    }).open();
  };

  useEffect(() => {
    let loadingInterval: NodeJS.Timeout;

    const initMap = () => {
      if (!mapRef.current || !window.TMap) return;

      // 创建地图实例
      mapInstance.current = new window.TMap.Map(mapRef.current, {
        center: new window.TMap.LatLng(latitude, longitude),
        zoom: 16,
        pitch: 0,
        rotation: 0
      });

      const markerStyle = new window.TMap.MarkerStyle({
        width: 25,
        height: 35,
        anchor: { x: 12.5, y: 35 },
        src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/marker.png'
      });

      // 添加标记点
      new window.TMap.MultiMarker({
        map: mapInstance.current as TMap,
        styles: {
          marker: markerStyle
        },
        geometries: [{
          id: 'company',
          position: new window.TMap.LatLng(latitude, longitude),
          properties: {
            title: address
          }
        }]
      });

      // 添加信息窗
      new window.TMap.InfoWindow({
        map: mapInstance.current as TMap,
        position: new window.TMap.LatLng(latitude, longitude),
        content: `
          <div style="padding: 10px;">
            <h4 style="margin: 0 0 5px;">您的公司</h4>
            <p style="margin: 0;">${address}</p>
          </div>
        `,
        offset: { x: 0, y: -35 }
      }).open();
    };

    // 检查地图 API 是否已加载
    if (window.TMap) {
      initMap();
    } else {
      loadingInterval = setInterval(() => {
        if (window.TMap) {
          clearInterval(loadingInterval);
          initMap();
        }
      }, 100);
    }

    return () => {
      if (loadingInterval) {
        clearInterval(loadingInterval);
      }
      if (mapInstance.current) {
        mapInstance.current.destroy();
      }
    };
  }, [latitude, longitude, address]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="输入地址搜索..."
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isSearching ? '搜索中...' : '搜索'}
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="absolute top-16 left-4 z-10 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto w-72">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              onClick={() => {
                updateMapLocation(result.location.lat, result.location.lng, result.address);
                setSearchResults([]);
              }}
            >
              <div className="font-medium">{result.title}</div>
              <div className="text-sm text-gray-600">{result.address}</div>
            </div>
          ))}
        </div>
      )}
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default TencentMap; 