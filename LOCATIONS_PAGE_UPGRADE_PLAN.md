# Locations Page: Best-in-Class Implementation Plan

## Overview

This document outlines the research-backed plan to transform the locations page from "good foundation" to "best-in-class" childcare location finder.

**Current Status:** 7/10 - Solid foundation, needs enhancement  
**Target Status:** 9.5/10 - Best-in-class childcare location finder

## 🎯 Key Principle: Zero API Keys Required

**All solutions in this plan work without any API keys:**
- ✅ **Leaflet + OpenStreetMap** for maps (completely free, no keys)
- ✅ **Browser Geolocation API** (built into browsers, no keys)
- ✅ **Pure JavaScript** distance calculations (no external APIs)
- ✅ **Google Maps URLs** for directions (no API key needed for basic links)
- ✅ **OpenStreetMap routing** as alternative (completely free)

**Cost:** $0 - Everything is free and open-source

---

## Priority Matrix

### Phase 1: Critical (Week 1-2)
1. ✅ Real Map Integration
2. ✅ Geolocation & Distance Calculation
3. ✅ Location Detail Pages

### Phase 2: High Impact (Week 3-4)
4. ✅ Quick Actions (Directions, Call)
5. ✅ Location Photos
6. ✅ Enhanced Filtering

### Phase 3: Polish (Week 5-6)
7. ✅ Availability Indicators
8. ✅ Loading States & Error Handling
9. ✅ Social Proof (Ratings/Reviews)

---

## 1. REAL MAP INTEGRATION

### Research Summary
- **Google Maps**: Official `@vis.gl/react-google-maps` library (v1.0, May 2024)
- **Mapbox**: `react-map-gl` library, more customizable
- **Recommendation**: Google Maps for better UX familiarity, Mapbox for more control

### Technical Approach

#### Option A: Google Maps (Recommended)
**Library:** `@vis.gl/react-google-maps`

**Pros:**
- Familiar UX for parents
- Excellent mobile support
- Built-in directions integration
- Strong SEO (Google indexing)

**Cons:**
- Requires API key (costs after free tier)
- Less customization

**Implementation Steps:**

1. **Install Dependencies**
   ```bash
   npm install @vis.gl/react-google-maps
   ```

2. **Set Up Environment Variables**
   ```env
   # .env.local
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

3. **Create Map Component**
   ```tsx
   // components/locations-map-real.tsx
   "use client";
   
   import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
   import { useState } from 'react';
   
   export function LocationsMapReal({ locations, selectedLocation, onLocationSelect }) {
     const [infoWindowOpen, setInfoWindowOpen] = useState(false);
     
     return (
       <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
         <Map
           defaultCenter={{ lat: 39.5, lng: -98.35 }} // Center of USA
           defaultZoom={4}
           mapId="YOUR_MAP_ID" // Optional: custom map style
           style={{ width: '100%', height: '100%' }}
         >
           {locations.map((location) => (
             <Marker
               key={location.slug}
               position={{ lat: location.latitude, lng: location.longitude }}
               onClick={() => {
                 onLocationSelect(location);
                 setInfoWindowOpen(true);
               }}
             />
           ))}
           
           {infoWindowOpen && selectedLocation && (
             <InfoWindow
               position={{ 
                 lat: selectedLocation.latitude, 
                 lng: selectedLocation.longitude 
               }}
               onCloseClick={() => setInfoWindowOpen(false)}
             >
               <div>
                 <h3>{selectedLocation.name}</h3>
                 <p>{selectedLocation.city}, {selectedLocation.state}</p>
               </div>
             </InfoWindow>
           )}
         </Map>
       </APIProvider>
     );
   }
   ```

4. **API Key Setup**
   - Go to Google Cloud Console
   - Enable "Maps JavaScript API"
   - Create API key
   - Restrict to your domain
   - Set billing (free tier: $200/month credit)

#### Option B: Mapbox (Alternative)
**Library:** `react-map-gl`

**Pros:**
- More customizable styling
- Better performance
- Free tier more generous

**Cons:**
- Less familiar UX
- Requires more setup

**Implementation Steps:**

1. **Install Dependencies**
   ```bash
   npm install react-map-gl mapbox-gl
   ```

2. **Set Up Environment Variables**
   ```env
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here
   ```

3. **Create Map Component**
   ```tsx
   // components/locations-map-mapbox.tsx
   "use client";
   
   import { useState } from 'react';
   import Map, { Marker, Popup } from 'react-map-gl';
   import 'mapbox-gl/dist/mapbox-gl.css';
   
   export function LocationsMapMapbox({ locations, selectedLocation, onLocationSelect }) {
     const [popupInfo, setPopupInfo] = useState(null);
     
     return (
       <Map
         mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
         initialViewState={{
           longitude: -98.35,
           latitude: 39.5,
           zoom: 4
         }}
         style={{ width: '100%', height: '100%' }}
         mapStyle="mapbox://styles/mapbox/streets-v11"
       >
         {locations.map((location) => (
           <Marker
             key={location.slug}
             longitude={location.longitude}
             latitude={location.latitude}
             onClick={() => {
               onLocationSelect(location);
               setPopupInfo(location);
             }}
           />
         ))}
         
         {popupInfo && (
           <Popup
             longitude={popupInfo.longitude}
             latitude={popupInfo.latitude}
             onClose={() => setPopupInfo(null)}
           >
             <div>
               <h3>{popupInfo.name}</h3>
               <p>{popupInfo.city}, {popupInfo.state}</p>
             </div>
           </Popup>
         )}
       </Map>
     );
   }
   ```

### Decision Matrix
- **Choose Google Maps if:** You want familiar UX, built-in directions, better SEO
- **Choose Mapbox if:** You need custom styling, better performance, more control

**Recommendation:** Start with Google Maps for Phase 1, can migrate to Mapbox later if needed.

---

## 2. GEOLOCATION & DISTANCE CALCULATION

### Research Summary
- Browser Geolocation API requires HTTPS
- Use custom React hook for reusability
- Handle permissions gracefully
- Implement Haversine formula for distance

### Implementation Steps

#### Step 1: Create Custom Geolocation Hook
```tsx
// hooks/use-geolocation.ts
import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      }));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }

        setState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
      },
      options
    );
  }, []);

  return state;
}
```

#### Step 2: Create Distance Calculation Utility
```tsx
// lib/distance.ts
/**
 * Calculate distance between two coordinates using Haversine formula
 * @returns Distance in miles
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const toRadians = (degree: number) => degree * (Math.PI / 180);

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Sort locations by distance from user location
 */
export function sortByDistance(
  locations: Location[],
  userLat: number,
  userLon: number
): Location[] {
  return [...locations].sort((a, b) => {
    const distA = calculateDistance(userLat, userLon, a.latitude, a.longitude);
    const distB = calculateDistance(userLat, userLon, b.latitude, b.longitude);
    return distA - distB;
  });
}
```

#### Step 3: Integrate into Locations Page
```tsx
// app/(marketing)/locations/page.tsx
import { useGeolocation } from '@/hooks/use-geolocation';
import { calculateDistance, sortByDistance } from '@/lib/distance';

export default function LocationsPage() {
  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();
  const [sortBy, setSortBy] = useState<'distance' | 'name'>('name');
  
  // Add distance to each location when user location is available
  const locationsWithDistance = useMemo(() => {
    if (!latitude || !longitude) return locations;
    
    return locations.map(loc => ({
      ...loc,
      distance: calculateDistance(latitude, longitude, loc.latitude, loc.longitude),
    }));
  }, [locations, latitude, longitude]);
  
  // Sort by distance if enabled
  const sortedLocations = useMemo(() => {
    if (sortBy === 'distance' && latitude && longitude) {
      return sortByDistance(locationsWithDistance, latitude, longitude);
    }
    return locationsWithDistance;
  }, [locationsWithDistance, sortBy, latitude, longitude]);
  
  // Add "Use My Location" button in UI
  // Show distance badges in list
  // Add "Sort by Distance" toggle
}
```

### UX Enhancements
- "Use My Location" button with loading state
- Distance badges: "2.3 miles away"
- "Sort by Distance" toggle
- "Find Nearest" quick action
- Error handling with helpful messages

---

## 3. LOCATION DETAIL PAGES

### Research Summary
- Use Next.js dynamic routes: `/locations/[slug]`
- Implement SSG (Static Site Generation) for SEO
- Add structured data (Schema.org Place)
- Optimize images with next/image

### Implementation Steps

#### Step 1: Create Dynamic Route
```tsx
// app/(marketing)/locations/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locations } from '../page';
import Image from 'next/image';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = locations.find((loc) => loc.slug === params.slug);
  
  if (!location) {
    return {
      title: 'Location Not Found',
    };
  }

  return {
    title: `${location.name} | Lionheart Children's Academy`,
    description: `Visit ${location.name} in ${location.city}, ${location.state}. Schedule a tour today.`,
    openGraph: {
      title: `${location.name} | Lionheart Children's Academy`,
      description: `High-quality early education in ${location.city}, ${location.state}`,
      type: 'website',
    },
  };
}

export default function LocationDetailPage({ params }: Props) {
  const location = locations.find((loc) => loc.slug === params.slug);

  if (!location) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      {/* Hero Section */}
      <section className="py-12">
        <h1 className="text-4xl font-bold">{location.name}</h1>
        <p className="text-lg text-muted-foreground">
          {location.city}, {location.state}
        </p>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Place',
            name: location.name,
            address: {
              '@type': 'PostalAddress',
              streetAddress: location.fullAddress,
              addressLocality: location.city,
              addressRegion: location.state,
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: location.latitude,
              longitude: location.longitude,
            },
          }),
        }}
      />

      {/* Content Sections */}
      {/* Photos, Programs, Contact Info, etc. */}
    </div>
  );
}
```

#### Step 2: Add Structured Data
- Schema.org Place markup
- LocalBusiness schema (if applicable)
- BreadcrumbList schema

#### Step 3: Content Sections
- Hero with location name and address
- Photo gallery
- Programs offered
- Hours of operation
- Contact information
- Map embed
- CTA: Schedule Tour

---

## 4. QUICK ACTIONS (DIRECTIONS, CALL)

### Implementation Steps

#### Step 1: Directions Integration
```tsx
// lib/maps.ts
export function getDirectionsUrl(location: Location, userLocation?: { lat: number; lng: number }) {
  const destination = `${location.latitude},${location.longitude}`;
  
  if (userLocation) {
    // Use current location
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}&origin=${userLocation.lat},${userLocation.lng}`;
  }
  
  // Just show destination
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}
```

#### Step 2: Phone Call Integration
```tsx
// Add phone number to Location type
type Location = {
  // ... existing fields
  phone?: string;
};

// In component
<a href={`tel:${location.phone}`} className="flex items-center gap-2">
  <Phone className="h-4 w-4" />
  Call {location.name}
</a>
```

#### Step 3: Update Components
- Add working "Get Directions" buttons
- Add "Call Center" buttons (if phone numbers available)
- Add "Email" links
- Add "Schedule Tour" CTA linking to form

---

## 5. LOCATION PHOTOS

### Research Summary
- Use high-quality, authentic images
- Organize by categories (Classrooms, Outdoor, Activities)
- Optimize with next/image
- Mobile-responsive gallery

### Implementation Steps

#### Step 1: Extend Location Type
```tsx
type Location = {
  // ... existing fields
  photos?: {
    hero?: string;
    gallery?: string[];
    categories?: {
      classrooms?: string[];
      outdoor?: string[];
      activities?: string[];
    };
  };
};
```

#### Step 2: Create Photo Gallery Component
```tsx
// components/location-photo-gallery.tsx
import Image from 'next/image';
import { useState } from 'react';

export function LocationPhotoGallery({ photos }: { photos: Location['photos'] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        <button onClick={() => setSelectedCategory('all')}>All</button>
        <button onClick={() => setSelectedCategory('classrooms')}>Classrooms</button>
        <button onClick={() => setSelectedCategory('outdoor')}>Outdoor</button>
        <button onClick={() => setSelectedCategory('activities')}>Activities</button>
      </div>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {filteredPhotos.map((photo, index) => (
          <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={photo}
              alt={`${location.name} - Photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### Step 3: Add to List View
- Thumbnail image next to location name
- Hover preview
- Click to view full gallery

---

## 6. ENHANCED FILTERING

### Implementation Steps

#### Step 1: Extend Location Type
```tsx
type Location = {
  // ... existing fields
  ageGroups?: ('infants' | 'toddlers' | 'preschool' | 'pre-k' | 'kindergarten')[];
  hours?: {
    open: string; // "7:00 AM"
    close: string; // "6:00 PM"
  };
  features?: string[]; // ['outdoor-play', 'meals', 'nap-time', etc.]
  capacity?: number;
};
```

#### Step 2: Add Filter UI
```tsx
// components/location-filters.tsx
export function LocationFilters({
  filters,
  onFiltersChange,
}: {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Age Groups */}
      <div>
        <Label>Age Groups</Label>
        <div className="flex flex-wrap gap-2">
          {ageGroups.map((age) => (
            <Badge
              key={age}
              variant={filters.ageGroups.includes(age) ? 'default' : 'outline'}
              onClick={() => toggleAgeGroup(age)}
            >
              {age}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Hours */}
      <div>
        <Label>Hours</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any hours" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="early">Early (6 AM - 8 AM)</SelectItem>
            <SelectItem value="standard">Standard (7 AM - 6 PM)</SelectItem>
            <SelectItem value="extended">Extended (6 AM - 7 PM)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Features */}
      <div>
        <Label>Features</Label>
        {/* Checkbox list */}
      </div>
    </div>
  );
}
```

---

## 7. AVAILABILITY INDICATORS

### Implementation Steps

#### Step 1: Extend Location Type
```tsx
type Location = {
  // ... existing fields
  availability?: {
    status: 'open' | 'waitlist' | 'full';
    openings?: number;
    waitlistLength?: number;
  };
};
```

#### Step 2: Add Badge Component
```tsx
// In location list item
{location.availability?.status === 'open' && (
  <Badge variant="default" className="bg-green-500">
    Openings Available
  </Badge>
)}
{location.availability?.status === 'waitlist' && (
  <Badge variant="outline" className="border-yellow-500 text-yellow-700">
    Waitlist
  </Badge>
)}
{location.availability?.status === 'full' && (
  <Badge variant="outline" className="border-gray-500 text-gray-700">
    Full
  </Badge>
)}
```

---

## 8. LOADING STATES & ERROR HANDLING

### Implementation Steps

#### Step 1: Create Loading Components
```tsx
// components/location-map-skeleton.tsx
export function LocationMapSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[70vh] w-full bg-muted rounded-lg" />
    </div>
  );
}

// components/location-list-skeleton.tsx
export function LocationListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
      ))}
    </div>
  );
}
```

#### Step 2: Add Error Boundaries
```tsx
// components/location-error-boundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class LocationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">
            Something went wrong loading locations. Please try refreshing the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

#### Step 3: Add Error States
- Geolocation permission denied
- Map API errors
- Network errors
- Empty search results

---

## 9. SOCIAL PROOF (RATINGS/REVIEWS)

### Implementation Steps

#### Step 1: Extend Location Type
```tsx
type Location = {
  // ... existing fields
  reviews?: {
    averageRating: number;
    totalReviews: number;
    source: 'google' | 'facebook' | 'internal';
  };
};
```

#### Step 2: Add Rating Component
```tsx
// components/location-rating.tsx
import { Star } from 'lucide-react';

export function LocationRating({ rating, totalReviews }: { rating: number; totalReviews: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {rating.toFixed(1)} ({totalReviews} reviews)
      </span>
    </div>
  );
}
```

#### Step 3: Integrate Reviews
- Show average rating in list
- Link to Google Reviews
- Display review snippets
- Add "Read Reviews" button

---

## IMPLEMENTATION TIMELINE

### Week 1: Foundation
- [ ] Set up Google Maps API key
- [ ] Implement real map integration
- [ ] Create geolocation hook
- [ ] Add distance calculation

### Week 2: Core Features
- [ ] Build location detail pages
- [ ] Add structured data
- [ ] Implement quick actions (directions, call)
- [ ] Add location photos

### Week 3: Enhancement
- [ ] Enhanced filtering UI
- [ ] Availability indicators
- [ ] Loading states
- [ ] Error handling

### Week 4: Polish
- [ ] Social proof (ratings)
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Mobile testing

---

## SUCCESS METRICS

- **Performance:** Lighthouse score > 90
- **Accessibility:** WCAG AA compliance
- **Mobile:** 100% responsive, touch-friendly
- **SEO:** All location pages indexed
- **UX:** < 3 clicks to schedule tour

---

## TECHNICAL DECISIONS

### Map Provider: Leaflet + OpenStreetMap
- **Reason:** No API key required, fully free, good interactivity
- **Cost:** $0 - completely free
- **Alternative:** Enhanced placeholder if zero dependencies preferred

### State Management: React useState + useMemo
- **Reason:** Simple, no need for Redux/Zustand yet
- **Future:** Consider Zustand if complexity grows

### Image Optimization: next/image
- **Reason:** Built-in, automatic optimization
- **Format:** WebP with fallbacks

### API Strategy: Static data → API later
- **Phase 1:** Static TypeScript arrays
- **Phase 2:** API endpoints for dynamic data
- **Future:** Real-time availability updates

---

## RISKS & MITIGATION

### Risk 1: Map Performance on Mobile
- **Mitigation:** Lazy load map component, optimize tile loading, use Leaflet's built-in optimizations

### Risk 2: Geolocation Permission Denied
- **Mitigation:** Graceful fallback, helpful error messages

### Risk 3: Performance on Mobile
- **Mitigation:** Lazy load map, optimize images, code splitting

---

## NEXT STEPS

1. **Review this plan** with team
2. **Set up Google Maps API** account
3. **Create feature branch:** `feature/locations-upgrade`
4. **Start with Phase 1** (Map integration)
5. **Test incrementally** after each feature

---

*Last Updated: December 2024*  
*Status: Ready for Implementation*
