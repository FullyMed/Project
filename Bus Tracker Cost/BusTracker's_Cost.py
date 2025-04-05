import requests
import json
from datetime import datetime

def get_bus_locations(api_key, route_id):
    url = f'https://api.bustracker.com/locations?api_key={api_key}&route_id={route_id}'
    
    response = requests.get(url)
    
    if response.status_code == 200:
        data = json.loads(response.text)
        return data
    else:
        print(f'Error: {response.status_code}')
        return None

def print_bus_locations(bus_locations):
    if bus_locations:
        print(f'Bus locations at {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}:')
        for bus in bus_locations['buses']:
            print(f"Bus {bus['id']} - Latitude: {bus['lat']}, Longitude: {bus['lon']}")
    else:
        print('Failed to retrieve bus locations.')

if __name__ == "__main__":
    # Ganti dengan kunci API dan ID rute yang sesuai dengan BusTracker Taiwan
    api_key = 'your_api_key'
    route_id = 'your_route_id'
    
    bus_locations = get_bus_locations(api_key, route_id)
    print_bus_locations(bus_locations)