# Geographic source and verification

`uae-region.json` contains Mercator-projected vector paths derived from Natural
Earth **1:10m Admin 0 countries**, downloaded from the upstream Natural Earth
repository. The JSON records the upstream URL, SHA-256 of the original dataset,
projection formula, simplification tolerance, and license. Only regional
features intersecting the displayed area are retained. No country silhouette
was invented. Geographic outlines are regional administrative/coastal data,
not a street map and not a record of routes run by the club.

Natural Earth is public domain:
https://www.naturalearthdata.com/about/terms-of-use/

Upstream dataset:
https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_admin_0_countries.geojson

The map attribution remains visible even though the license does not require
attribution. The Atlas works offline with no map-provider API key or tile
requests. Coastline detail is limited by the 1:10m source scale; the park pin
is a geographic place coordinate, not a street- or entrance-level diagram.

Run 001's exact place was confirmed by the owner on 20 October 2026:
**Reem Central Park, Al Reem Island, Abu Dhabi, UAE**.

- Latitude: **24.5042039**
- Longitude: **54.407309**
- Owner-provided Google Maps link:
  https://maps.app.goo.gl/e4VixiPSwbGmQb9XA

The cloud network denied fetching the short link. The owner subsequently
supplied and explicitly confirmed the Google Maps place coordinates above.
They are stored in `content/runs.ts` with that source URL. No road route,
distance, attendance figure, or run date has been inferred from the point.

`lib/geo.ts` uses the same projection as the vector paths. The Abu Dhabi camera
framing coordinate is a city centre, not an additional completed run marker.
