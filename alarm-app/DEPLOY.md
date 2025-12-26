# How to Deploy Alarm App to Your Mobile

## Method 1: Direct File Access (Easiest)

1. Open your mobile browser
2. Type in address bar: `file:///home/user/my-first-repo/alarm-app/index.html`
3. Allow notifications when prompted

## Method 2: Using Termux (Android)

If you have Termux installed:

```bash
cd /home/user/my-first-repo/alarm-app
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

## Method 3: Deploy to Netlify (Access from Any Device)

1. **Install Netlify CLI** (if not already):
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy the app**:
   ```bash
   cd /home/user/my-first-repo/alarm-app
   netlify deploy --prod
   ```

3. **Follow prompts**:
   - Authenticate with Netlify
   - Create new site
   - Deploy directory: `.` (current directory)

4. **Access your app** at the provided URL (e.g., `https://your-alarm-app.netlify.app`)

## Method 4: Deploy to GitHub Pages

1. **Enable GitHub Pages** in your repository:
   - Go to: https://github.com/sagar0509/my-first-repo/settings/pages
   - Source: Deploy from a branch
   - Branch: `claude/mobile-app-deployment-SOa6o`
   - Folder: `/alarm-app`
   - Click Save

2. **Access your app** at:
   ```
   https://sagar0509.github.io/my-first-repo/alarm-app/
   ```
   (Wait 2-3 minutes for deployment)

## Method 5: Using Any Web Server

If you have any web server running on your mobile:
- Copy the contents of `/home/user/my-first-repo/alarm-app/` to your web root
- Access via your server's URL

## Troubleshooting

- **"Site can't be reached"**: Try `localhost` instead of IP address
- **No sound**: Make sure to allow audio permissions in browser
- **No vibration**: Check browser permissions for vibration
- **Offline not working**: HTTPS or localhost required for service worker

## Quick Test

To verify the server is running:
```bash
curl http://localhost:8080
```

You should see HTML output.
