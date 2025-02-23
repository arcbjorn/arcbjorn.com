# Script to filter the ne_10m_admin_1_states_provinces.geojson file to include
# only specified provinces and regions.
# Ensure you have the 'requests' library installed (run: pip install requests).

import requests
import json

from shapely.geometry import shape, mapping


def round_coordinates(coords, precision=4):
    if isinstance(coords, (list, tuple)):
        return [round_coordinates(c, precision) for c in coords]
    return round(coords, precision)


def simplify_geojson(data, tolerance=0.01):
    simplified_features = []
    essential_properties = ['name', 'admin', 'region']
    
    for feature in data['features']:
        # Simplify geometry
        geom = shape(feature['geometry'])
        simplified_geom = geom.simplify(tolerance)
        
        # Filter properties
        filtered_props = {k: v for k, v in feature['properties'].items() if k in essential_properties}  # noqa: E501
        
        # Create new feature with simplified geometry and reduced properties
        new_feature = {
            'type': 'Feature',
            'properties': filtered_props,
            'geometry': mapping(simplified_geom)
        }
        
        # Round coordinates
        new_feature['geometry']['coordinates'] = round_coordinates(
            new_feature['geometry']['coordinates']
        )
        
        simplified_features.append(new_feature)
    
    return {
        'type': 'FeatureCollection',
        'features': simplified_features
    }


url = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson"  # noqa: E501
response = requests.get(url)

with open("ne_10m_admin_1_states_provinces.geojson", "w", encoding="utf-8") as f:  # noqa: E501
    f.write(response.text)
print("Downloaded GeoJSON file.")


# Load the visited provinces and regions from src/data/places.json
data_file = "src/data/places.json"
with open(data_file, "r", encoding="utf-8") as f:
    visited_data = json.load(f)

# Extract visitedRegions and visitedProvinces from the loaded JSON
visited_regions = visited_data["visitedRegions"]
visited_provinces = visited_data["visitedProvinces"]

# Load the original GeoJSON file
input_file = "ne_10m_admin_1_states_provinces.geojson"
with open(input_file, "r", encoding="utf-8") as f:
    data = json.load(f)

# Filter features based on visited provinces and regions
filtered_features = []
for feature in data["features"]:
    country = feature["properties"].get("admin")
    province = feature["properties"].get("name")
    region = feature["properties"].get("region")

    # Check if the province is in visited_provinces for the country
    is_visited_province = (
        country in visited_provinces and
        province in visited_provinces[country]
    )

    # Check if the region is in visited_regions for the country
    is_visited_region = (
        country in visited_regions and
        region in visited_regions[country]
    )

    # Include the feature if it matches either condition
    if is_visited_province or is_visited_region:
        filtered_features.append(feature)

# Create a new GeoJSON structure
filtered_geojson = {
    "type": "FeatureCollection",
    "features": filtered_features
}

# Simplify the filtered data
simplified_geojson = simplify_geojson(filtered_geojson)

# Save the simplified GeoJSON to a new file in src/data
output_file = "src/data/filtered_provinces.geojson"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(simplified_geojson, f, indent=2)

print(f"Filtered GeoJSON saved to '{output_file}' with {len(filtered_features)} features.")  # noqa: E501
