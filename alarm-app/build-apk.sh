#!/bin/bash

echo "🔨 Building Alarm Clock APK..."
echo ""

# Step 1: Copy files to www
echo "📁 Copying files to www directory..."
cp index.html app.js styles.css manifest.json sw.js www/
echo "✅ Files copied"
echo ""

# Step 2: Sync Capacitor
echo "🔄 Syncing Capacitor..."
npx cap sync android
echo "✅ Sync complete"
echo ""

# Step 3: Build APK
echo "📦 Building APK (this may take a few minutes)..."
cd android && ./gradlew assembleDebug
echo ""

if [ $? -eq 0 ]; then
    echo "✅ APK built successfully!"
    echo ""
    echo "📱 Your APK is located at:"
    echo "   android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "📲 To install on your phone:"
    echo "   1. Transfer the APK file to your phone"
    echo "   2. Enable 'Install from Unknown Sources' in Settings"
    echo "   3. Tap the APK to install"
else
    echo "❌ Build failed"
    echo ""
    echo "💡 Alternative: Use PWABuilder (online, no setup needed)"
    echo "   1. Go to: https://www.pwabuilder.com"
    echo "   2. Enter your app URL"
    echo "   3. Download APK"
    echo ""
    echo "See BUILD_APK.md for more options"
fi
