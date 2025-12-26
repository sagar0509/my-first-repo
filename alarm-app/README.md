# Alarm Clock App

A mobile-friendly Progressive Web App (PWA) alarm clock that works on your phone.

## Features

- Set multiple alarms with custom labels
- Sound alerts using Web Audio API
- Vibration support for mobile devices
- Snooze functionality (5 minutes)
- Works offline once installed
- Can be installed to home screen
- Persistent storage (alarms saved locally)
- Mobile-optimized responsive design

## How to Use on Mobile

### Option 1: Access via Local Network

1. Start the server on your computer
2. Find your computer's IP address
3. Access from mobile browser: `http://YOUR_IP:8080`
4. Grant notification and sound permissions when prompted

### Option 2: Install as PWA

1. Open the app in your mobile browser
2. Tap the browser menu
3. Select "Add to Home Screen" or "Install App"
4. The app will work like a native app!

## Setting Alarms

1. Select a time using the time picker
2. Optionally add a label (e.g., "Wake up", "Meeting")
3. Choose sound and vibrate options
4. Tap "Add Alarm"

## Managing Alarms

- Toggle alarms on/off with the switch
- Delete alarms with the trash icon
- Snooze for 5 more minutes when alarm rings
- Dismiss to stop the alarm

## Requirements

- Modern mobile browser (Chrome, Safari, Firefox)
- HTTPS connection or localhost for full PWA features
- Allow notifications for system alerts
- Allow sound for alarm audio

## Tech Stack

- Pure HTML/CSS/JavaScript
- Web Audio API for alarm sound
- Vibration API for haptic feedback
- Service Worker for offline support
- LocalStorage for data persistence
