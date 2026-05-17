# Car Condition Learning App Plan

## 1. Product Summary

Build a mobile-first app that teaches drivers how to monitor a car's condition through guided checks, practical explanations, and simple maintenance tracking. The app should help users learn what to inspect, why it matters, how to inspect it safely, and when to escalate to a workshop.

The app should support two languages from day one:

- Bahasa Indonesia
- English

The app should be localized for Indonesian car ownership and driving conditions, not just translated word-for-word.

## 2. Core Goal

Help users become confident in checking the basic condition of their car without needing advanced mechanical knowledge.

Success means a user can:

- understand the main parts of a regular car health check
- follow step-by-step instructions safely
- identify common warning signs
- know whether the issue is low, medium, or high urgency
- decide whether they can continue driving or should visit a bengkel

## 3. Target Users

- First-time car owners in Indonesia
- New drivers who want basic maintenance confidence
- Family car owners using MPV, hatchback, LCGC, sedan, or SUV vehicles
- Ride-hailing or frequent-commute drivers who need routine checks
- Users buying used cars and wanting a simple checklist

## 4. Localization For Indonesian Cars

The content should reflect common Indonesian driving and ownership realities:

- Right-hand-drive vehicles
- Common body types: MPV, LCGC, hatchback, SUV, pickup
- Heavy rain and flood-prone areas
- Hot, humid climate
- Stop-and-go city traffic in Jakarta and other dense cities
- Long holiday road trips (mudik)
- Rough roads, potholes, and speed bumps affecting suspension and tires
- Fuel terminology familiar to local users: Pertalite, Pertamax, Pertamax Turbo, Solar, Dexlite, Pertamina Dex
- Distance and service reminders primarily in kilometers
- Pressure shown in PSI and bar where useful
- Service decisions explained with local terms such as bengkel resmi and bengkel umum

Content should avoid assumptions that only fit Western markets, such as left-hand-drive layouts or fuel options uncommon in Indonesia.

## 5. MVP Feature Set

### A. Guided Car Check Learning

Main feature: teach users how to check each major part of the car condition.

Each check module should include:

- What this check is for
- When to check it
- Tools needed
- Safety preparation
- Step-by-step instructions
- What "normal" looks like
- Warning signs
- What to do next
- When to go to a workshop immediately

Suggested MVP check modules:

- Engine oil
- Coolant
- Brake fluid
- Battery
- Tire pressure and tread
- Spare tire and tools
- Wiper blades and washer fluid
- Exterior lights
- Cabin AC basics
- Dashboard warning lights
- Brake feel
- Flood exposure check
- Pre-trip inspection

### B. Instruction Mode

Add a dedicated "How to Check" mode for every car condition item.

Instruction mode should use:

- short step-by-step screens
- simple illustrations or photos
- safety notes before risky actions
- beginner-friendly explanations
- optional audio narration later

Example lesson structure:

1. Prepare the car safely
2. Open the correct area
3. Locate the part
4. Check fluid level, wear, or condition
5. Compare against normal vs warning examples
6. Log the result
7. Get next-step advice

### C. Condition Logging

Let users record simple inspection outcomes:

- OK
- Monitor
- Needs service soon
- Urgent

Users can log:

- date
- odometer
- notes
- optional photo

### D. Maintenance Reminders

Users can set reminders based on:

- time interval
- kilometer interval
- event-based reminders before long trips
- rainy season / post-flood reminders

### E. Bilingual UI

Language toggle should be available in onboarding and settings:

- Bahasa Indonesia
- English

The app should store the user's preference and keep terminology consistent across lessons, labels, and reminders.

## 6. Teaching Content Design

Each check should be built as a reusable content template.

Recommended content schema:

- `id`
- `title_id`
- `title_en`
- `category`
- `difficulty`
- `estimated_minutes`
- `why_it_matters`
- `when_to_check`
- `tools_needed`
- `safety_steps`
- `step_list`
- `normal_signs`
- `warning_signs`
- `common_mistakes`
- `local_indonesia_notes`
- `cta_low`
- `cta_medium`
- `cta_high`

Example modules with localized notes:

### Engine Oil

- Teach how to park on level ground and wait before checking
- Show how to read the dipstick clearly
- Explain color and level basics without oversimplifying
- Add Indonesian note: frequent stop-and-go traffic and high heat can make timely oil checks more important

### Tires

- Teach pressure checks when tires are cold
- Explain sidewall damage, uneven wear, and tread depth
- Add Indonesian note: potholes, rough roads, and long mudik trips can increase tire stress

### Flood Exposure Check

- Teach what to inspect after driving through floodwater
- Include brakes, carpets, smells, electrical issues, and engine warning signs
- Add a high-risk warning for suspected water ingress into the engine

### Battery

- Teach visual inspection for corrosion, loose terminals, and weak starting symptoms
- Add Indonesian note: heat can shorten battery life, especially in daily urban traffic

## 7. Recommended User Flow

### New User Flow

1. Choose language: Bahasa Indonesia or English
2. Select car type and fuel type
3. Add basic vehicle profile:
   - brand
   - model
   - year
   - odometer
4. Choose goal:
   - Learn basic checks
   - Start a full inspection
   - Prepare for a trip
   - Monitor maintenance reminders

### Inspection Flow

1. Pick a check module
2. Read safety prep
3. Follow guided steps
4. Mark result
5. Receive advice and urgency level
6. Save record to history

## 8. Suggested Information Architecture

- Home
- Learn Checks
- Inspection Checklist
- Vehicle Garage
- History
- Reminders
- Settings

Within "Learn Checks", group by category:

- Fluids
- Tires and wheels
- Electrical
- Safety
- Trip prep
- Weather and flood checks

## 9. UX Principles

- Mobile-first and easy to use with one hand
- Plain language for beginners
- Avoid mechanic jargon unless explained
- Use color carefully with text labels, not color alone
- Emphasize safety before opening the hood or touching components
- Allow users to finish a lesson in under 3 minutes for routine checks
- Support offline viewing for check instructions

## 10. Technical Recommendation

Suggested v1 stack:

- Frontend: React or Next.js as a mobile-first web app / PWA
- Content: structured JSON or CMS-backed learning modules
- Persistence: Supabase or Firebase for user profiles, logs, reminders
- Notifications: browser push first, native later if app expands
- i18n: message-key based localization with Indonesian as a first-class language

Why this approach:

- Fast to launch
- Easy bilingual content management
- Good fit for step-based learning flows
- PWA can work well for users who do not want to install a full native app immediately

## 11. Data Model Outline

Main entities:

- User
- Vehicle
- CheckModule
- CheckSession
- CheckResult
- Reminder
- LocalizedContent

Key fields for `Vehicle`:

- make
- model
- year
- transmission
- fuel_type
- odometer_km
- last_service_date

Key fields for `CheckResult`:

- module_id
- vehicle_id
- status
- notes
- photo_url
- odometer_km
- checked_at
- language_used

## 12. MVP Content Backlog

Phase 1 lessons:

- Daily / weekly checks
- Before long trip checklist
- Post-flood quick check
- Dashboard warning lights basics

Phase 2 lessons:

- Brake pad warning signs
- Suspension symptoms
- Used car pre-purchase checks
- AC cooling performance basics
- Engine bay visual inspection

## 13. Release Roadmap

### Phase 1: MVP

- Bilingual onboarding
- 10 to 12 guided check modules
- Condition logging
- Reminder engine
- Indonesian-localized safety and maintenance advice

### Phase 2: Smarter Guidance

- Vehicle-specific recommendations by type
- Photo-based issue examples
- Seasonal and trip-based checklists
- Workshop finder integration

### Phase 3: Advanced Utility

- OBD scanner integration
- Predictive maintenance insights
- AI assistant for symptom explanation
- Community FAQ for Indonesian ownership issues

## 14. Risks And Decisions

Key product risks:

- Users may over-trust the app and skip professional inspection
- Advice can become too generic if vehicle-specific detail is missing
- Translation quality can feel unnatural if content is translated instead of written natively

Important product decisions:

- Treat the app as educational guidance, not professional diagnosis
- Show clear "stop driving / go to bengkel" warnings for high-risk conditions
- Write Indonesian content natively first, then produce English parity
- Keep lessons concise and practical before adding advanced diagnostics

## 15. Implementation Priorities

Recommended build order:

1. Define bilingual content schema
2. Build onboarding with language selection
3. Build Learn Checks section with 3 pilot modules:
   - engine oil
   - tires
   - battery
4. Add logging and reminder basics
5. Add Indonesian-specific modules:
   - pre-mudik check
   - post-flood check
6. Expand to the full MVP lesson set

## 16. Definition Of Done For MVP

The MVP is ready when:

- users can switch between Indonesian and English
- users can complete guided checks for at least 10 core car condition topics
- each check has clear instructions, warning signs, and urgency guidance
- users can save inspection history per vehicle
- reminders work in kilometer and time formats
- Indonesian-specific guidance is visible in relevant lessons

## 17. Recommended Next Step

Turn this plan into a product requirements document and then scaffold a mobile-first PWA with:

- bilingual routing and content structure
- sample vehicle profile flow
- guided instruction UI for one check module
- inspection logging
- reminder setup
