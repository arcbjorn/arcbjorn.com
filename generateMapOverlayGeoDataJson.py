# Script to filter the ne_10m_admin_1_states_provinces.geojson file to include
# only specified provinces and regions.
# Ensure you have the 'requests' library installed (run: pip install requests).

import requests
import json

url = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson"  # noqa: E501
response = requests.get(url)

with open("ne_10m_admin_1_states_provinces.geojson", "w", encoding="utf-8") as f:  # noqa: E501
    f.write(response.text)
print("Downloaded GeoJSON file.")


# Load the visited provinces and regions from src/data/visited_places.json
data_file = "src/data/visited_places.json"
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

# Save the filtered GeoJSON to a new file in src/data
output_file = "src/data/filtered_visited_provinces.geojson"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(filtered_geojson, f, indent=2)

print(f"Filtered GeoJSON saved to '{output_file}' with {len(filtered_features)} features.")  # noqa: E501
