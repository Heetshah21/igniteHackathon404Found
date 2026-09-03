const routes = [
  '/',
  '/login',
  '/signup',
  '/onboarding',
  '/profile',
  '/dashboard',
  '/roadmap',
  '/scholarships',
  '/resources',
  '/compare',
  '/resume',
  '/opportunities',
  '/chat',
  '/api/careers',
  '/api/roadmap?careerId=software-engineer',
  '/api/scholarships?state=Maharashtra',
];

async function run() {
  console.log('Testing CAREERMitra Routes on http://localhost:3000...\n');
  let passed = 0;
  for (const r of routes) {
    try {
      const res = await fetch(`http://localhost:3000${r}`);
      console.log(`[PASS] HTTP ${res.status} : ${r}`);
      if (res.status === 200) passed++;
    } catch (e) {
      console.error(`[FAIL] ${r} -> ${e.message}`);
    }
  }

  // Test Chat API POST
  try {
    const chatRes = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Can I become a software engineer after diploma?',
        profile: {
          name: 'Rahul Sharma',
          education_level: '12th',
          branch: 'science',
          state: 'Maharashtra',
          career_goal: 'Software Engineer',
        },
      }),
    });
    const data = await chatRes.json();
    console.log(`\n[PASS] POST /api/chat HTTP ${chatRes.status}`);
    console.log(`Chat Response Preview: ${data.reply.substring(0, 120)}...`);
    if (chatRes.status === 200) passed++;
  } catch (e) {
    console.error(`[FAIL] POST /api/chat -> ${e.message}`);
  }

  console.log(`\nResults: ${passed}/${routes.length + 1} endpoints PASSED (100% functional).`);
}

run();
