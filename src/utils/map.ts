import countryToCode from '@data/flagsMap';
import L from 'leaflet';
import { Language } from '@/i18n/useI18n';
import { continentTranslations } from '@i18n/translations';
export interface Places {
  regions: Record<string, string[]>;
  provinces: Record<string, string[]>;
  planned_provinces: Record<string, string[]>;
  planned_regions: Record<string, string[]>;
}

const colours = {
  VISITED: '#008080',
  PLANNED: '#f15025',
  DEFAULT: '#cccccc',
  TRANSPARENT: 'transparent',
} as const;

export const getFeatureStyle = (
  // eslint-disable-next-line no-undef
  feature: GeoJSON.Feature | undefined,
  placesData: Places
): L.PathOptions => {
  if (!feature) return {};

  const { admin: country, name: province, region } = feature.properties || {};

  const isVisited =
    placesData.provinces[country]?.includes(province) ||
    placesData.regions[country]?.includes(region);

  const isPlanned =
    placesData.planned_provinces[country]?.includes(province) ||
    placesData.planned_regions[country]?.includes(region);

  const isSmallIsledToSee = country === 'French Polynesia';

  if (isVisited) {
    return {
      color: isSmallIsledToSee ? colours.VISITED : colours.TRANSPARENT,
      weight: 2,
      fillColor: colours.VISITED,
      fillOpacity: 0.4,
      opacity: 0.8,
    };
  }

  if (isPlanned) {
    return {
      color: isSmallIsledToSee ? colours.PLANNED : colours.TRANSPARENT,
      weight: 2,
      fillColor: colours.PLANNED,
      fillOpacity: 0.4,
      opacity: 0.8,
    };
  }

  return {
    color: colours.DEFAULT,
    weight: 1,
    fillColor: colours.TRANSPARENT,
    fillOpacity: 0,
    opacity: 0.2,
  };
};

// eslint-disable-next-line no-undef
export const isRelevant = (feature: GeoJSON.Feature | undefined, placesData: Places) => {
  if (!feature) return false;

  const { admin: country, name: province, region } = feature.properties || {};

  return (
    placesData.provinces[country]?.includes(province) ||
    placesData.regions[country]?.includes(region) ||
    placesData.planned_provinces[country]?.includes(province) ||
    placesData.planned_regions[country]?.includes(region)
  );
};

export const createLegend = (visited: string | undefined, planned: string | undefined) => {
  const legend = new L.Control({ position: 'bottomright' });

  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'info legend');
    div.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    div.style.padding = '12px 15px';
    div.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    div.style.borderRadius = '12px';
    div.style.backdropFilter = 'blur(8px)';
    div.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    div.style.color = '#333';
    div.style.fontSize = window.innerWidth >= 640 ? '14px' : '12px';
    div.style.lineHeight = '1.6';
    div.style.fontFamily = 'var(--font-ibm), system-ui, sans-serif';

    div.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <i style="background: #008080; width: ${window.innerWidth >= 640 ? '18px' : '16px'}; height: ${window.innerWidth >= 640 ? '18px' : '16px'}; border-radius: 4px; margin-right: 10px; opacity: 0.9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></i>
          <span style="font-weight: 500;">${visited}</span>
        </div>
        <div style="display: flex; align-items: center;">
          <i style="background: #f15025; width: ${window.innerWidth >= 640 ? '18px' : '16px'}; height: ${window.innerWidth >= 640 ? '18px' : '16px'}; border-radius: 4px; margin-right: 10px; opacity: 0.9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></i>
          <span style="font-weight: 500;">${planned}</span>
        </div>
      `;

    return div;
  };

  return legend;
};

// eslint-disable-next-line no-undef
export const createPopupContent = (feature: GeoJSON.Feature) => {
  const { admin: country, name: province, region } = feature.properties || {};
  const countryCode = countryToCode[country] || '';
  const flag = countryCode ? `<span class="fi fi-${countryCode}"></span>` : '';

  return `
    <div>
      <h3>${flag} ${province || region}</h3>
      <p>${country}</p>
    </div>
  `;
};

const getRegionLabels = (lang: Language) =>
  [
    { text: continentTranslations[lang].EUROPE, coords: [50, 15], fontSize: '20px' },
    { text: continentTranslations[lang].NORTH_AMERICA, coords: [45, -100], fontSize: '20px' },
    { text: continentTranslations[lang].SOUTH_AMERICA, coords: [-20, -60], fontSize: '20px' },
    { text: continentTranslations[lang].AFRICA, coords: [5, 20], fontSize: '20px' },
    { text: continentTranslations[lang].ASIA, coords: [45, 90], fontSize: '20px' },
    { text: continentTranslations[lang].OCEANIA, coords: [-25, 135], fontSize: '20px' },
  ] as const;

export const addRegionLabels = (map: L.Map, lang: Language) => {
  getRegionLabels(lang).forEach(({ text, coords, fontSize }) => {
    const labelIcon = L.divIcon({
      className: 'continent-label',
      html: `<div style="
        font-size: ${fontSize};
        font-family: 'Cinzel', serif;
        color: ${colours.PLANNED};
        font-weight: 600;
        text-align: center;
        line-height: 1.2;
        width: max-content;
        text-shadow: 
          2px 2px 4px rgba(255, 255, 255, 0.8),
          0 0 10px rgba(255, 255, 255, 0.5);
      ">${text.replace('\n', '<br>')}</div>`,
    });

    L.marker([...coords] as L.LatLngExpression, {
      icon: labelIcon,
      interactive: false,
      zIndexOffset: -1000,
    }).addTo(map);
  });
};
