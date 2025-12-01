# Locations Page Upgrade - Implementation Checklist

## Quick Reference

### Phase 1: Critical Features (Week 1-2)

#### 1. Real Map Integration (No API Key)
- [ ] Choose approach: Leaflet (recommended) or Enhanced Placeholder
- [ ] Install `react-leaflet` and `leaflet` (if using Leaflet)
- [ ] Import Leaflet CSS in layout/globals.css
- [ ] Create `components/locations-map-leaflet.tsx`
- [ ] Fix Leaflet marker icon issue for Next.js
- [ ] Replace placeholder map with Leaflet component
- [ ] Add markers for all locations
- [ ] Implement click handlers for markers
- [ ] Add popups with location info
- [ ] Add map center update when location selected
- [ ] Test on mobile devices
- [ ] Style map to match brand (optional custom tiles)

#### 2. Geolocation & Distance
- [ ] Create `hooks/use-geolocation.ts`
- [ ] Handle permission requests gracefully
- [ ] Add error handling for denied permissions
- [ ] Create `lib/distance.ts` with Haversine formula
- [ ] Add "Use My Location" button
- [ ] Display distance badges in list
- [ ] Add "Sort by Distance" toggle
- [ ] Test geolocation on HTTPS (required)
- [ ] Add loading state for geolocation

#### 3. Location Detail Pages
- [ ] Create `app/(marketing)/locations/[slug]/page.tsx`
- [ ] Implement `generateStaticParams()`
- [ ] Add dynamic metadata with `generateMetadata()`
- [ ] Add Schema.org Place structured data
- [ ] Create hero section
- [ ] Add photo gallery section
- [ ] Add programs section
- [ ] Add contact information
- [ ] Add map embed
- [ ] Add "Schedule Tour" CTA
- [ ] Test all routes

---

### Phase 2: High Impact (Week 3-4)

#### 4. Quick Actions
- [ ] Add phone numbers to Location type
- [ ] Create `lib/maps.ts` for directions URLs
- [ ] Implement "Get Directions" button (Google Maps URL)
- [ ] Implement "Call Center" button (`tel:` links)
- [ ] Implement "Email" links (`mailto:`)
- [ ] Add quick actions to map info window
- [ ] Add quick actions to list items
- [ ] Test on mobile (especially phone links)

#### 5. Location Photos
- [ ] Extend Location type with photos field
- [ ] Create `components/location-photo-gallery.tsx`
- [ ] Add photo categories (classrooms, outdoor, activities)
- [ ] Implement category filtering
- [ ] Add thumbnail images to list view
- [ ] Optimize images with `next/image`
- [ ] Add lazy loading
- [ ] Test image loading performance

#### 6. Enhanced Filtering
- [ ] Extend Location type with ageGroups, hours, features
- [ ] Create `components/location-filters.tsx`
- [ ] Add age group filter (checkboxes/badges)
- [ ] Add hours filter (dropdown)
- [ ] Add features filter (checkboxes)
- [ ] Implement filter logic
- [ ] Add "Clear Filters" button
- [ ] Show active filter count
- [ ] Test filter combinations

---

### Phase 3: Polish (Week 5-6)

#### 7. Availability Indicators
- [ ] Extend Location type with availability field
- [ ] Add status badges (Open, Waitlist, Full)
- [ ] Style badges with appropriate colors
- [ ] Add to list view
- [ ] Add to map info window
- [ ] Add to detail pages
- [ ] Consider real-time updates (future)

#### 8. Loading States & Errors
- [ ] Create `components/location-map-skeleton.tsx`
- [ ] Create `components/location-list-skeleton.tsx`
- [ ] Add loading states for geolocation
- [ ] Add loading states for map initialization
- [ ] Create `components/location-error-boundary.tsx`
- [ ] Add error messages for:
  - [ ] Geolocation denied
  - [ ] Map API errors
  - [ ] Network errors
  - [ ] Empty search results
- [ ] Test error scenarios

#### 9. Social Proof
- [ ] Extend Location type with reviews field
- [ ] Create `components/location-rating.tsx`
- [ ] Add star rating display
- [ ] Show review count
- [ ] Add to list view
- [ ] Add to detail pages
- [ ] Link to Google Reviews (if available)
- [ ] Consider integrating review API (future)

---

## Testing Checklist

### Functionality
- [ ] Map loads correctly
- [ ] Markers display for all locations
- [ ] Clicking marker selects location
- [ ] Geolocation works (with permission)
- [ ] Distance calculation is accurate
- [ ] Filtering works correctly
- [ ] Search works correctly
- [ ] Detail pages load correctly
- [ ] Quick actions work (directions, call, email)
- [ ] Photos display correctly

### Responsive Design
- [ ] Mobile toggle works (List/Map)
- [ ] Map is responsive on mobile
- [ ] List is scrollable on mobile
- [ ] Touch targets are adequate (44x44px)
- [ ] Text is readable on small screens
- [ ] Images scale correctly

### Performance
- [ ] Lighthouse score > 90
- [ ] Map loads in < 2 seconds
- [ ] Images are optimized
- [ ] No layout shift (CLS < 0.1)
- [ ] First contentful paint < 1.5s

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] ARIA labels on interactive elements
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] Error messages are accessible

### SEO
- [ ] All location pages indexed
- [ ] Structured data validates
- [ ] Meta descriptions unique
- [ ] URLs are SEO-friendly
- [ ] Images have alt text
- [ ] Sitemap includes all locations

---

## Environment Variables Needed

```env
# .env.local
# NONE REQUIRED! 🎉
# Leaflet + OpenStreetMap works without any API keys
```

---

## Dependencies to Install

```bash
# For Leaflet (no API key needed)
npm install react-leaflet leaflet
npm install -D @types/leaflet

# For distance calculations (optional - we'll use custom implementation)
# npm install geolocation-distance-between
```

---

## File Structure

```
app/(marketing)/
  locations/
    [slug]/
      page.tsx          # Location detail page
    page.tsx            # Locations index (updated)

components/
  locations-map-real.tsx    # Real map component
  locations-list.tsx        # List component (updated)
  location-photo-gallery.tsx
  location-filters.tsx
  location-rating.tsx
  location-map-skeleton.tsx
  location-list-skeleton.tsx
  location-error-boundary.tsx

hooks/
  use-geolocation.ts

lib/
  distance.ts
  maps.ts
```

---

## Quick Wins (Do First)

1. ✅ **Install Leaflet** (5 min)
2. ✅ **Replace placeholder map with Leaflet** (2 hours)
3. ✅ **Add geolocation hook** (1 hour)
4. ✅ **Add distance calculation** (1 hour)
5. ✅ **Create one detail page** (2 hours)

**Total: ~6-7 hours for MVP (no API setup needed!)**

---

*Use this checklist alongside the detailed plan in `LOCATIONS_PAGE_UPGRADE_PLAN.md`*
