# Smoke Test Checklist

## Help modal + app visibility

1. Run `npm run start:dev` and open `http://localhost:3000`.
2. Confirm the Request workspace is visible on load (no full-screen modal overlay).
3. Click **Help** in the header.
4. Confirm the help modal opens and content is visible.
5. Close the modal (X button or overlay click).
6. Confirm the modal fully closes and the app remains interactive.

## Request flow

1. Send `GET http://localhost:3001/demo-api/health`.
2. Send `POST http://localhost:3001/demo-api/users` with body `{"name":"Alice"}`.
3. Confirm response tabs (Pretty/Raw/Headers) are visible and readable.
4. Expand History drawer, restore a request, and clear history.

## Guided steps

1. Switch to **Guided Steps** section.
2. Select a step and click **Run Step**.
3. Confirm checks update and step completion state changes when passing.
