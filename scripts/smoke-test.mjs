const BASE_URL = 'http://localhost:3001/demo-api';

async function run() {
  const health = await fetch(`${BASE_URL}/health`);
  console.log('GET /health =>', health.status, await health.text());

  const created = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Smoke User' })
  });
  const createdBody = await created.json();
  console.log('POST /users =>', created.status, createdBody);

  const list = await fetch(`${BASE_URL}/users`);
  console.log('GET /users =>', list.status, await list.text());

  const updated = await fetch(`${BASE_URL}/users/${createdBody.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Updated Smoke User' })
  });
  console.log('PATCH /users/:id =>', updated.status, await updated.text());

  const removed = await fetch(`${BASE_URL}/users/${createdBody.id}`, { method: 'DELETE' });
  console.log('DELETE /users/:id =>', removed.status, await removed.text());
}

run().catch((error) => {
  console.error('Smoke test failed:', error);
  process.exitCode = 1;
});
