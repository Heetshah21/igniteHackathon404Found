import { createClient } from '@supabase/supabase-js';
import { careers } from '../src/data/careers';
import { roadmaps } from '../src/data/roadmaps';
import { resources } from '../src/data/resources';
import { scholarships } from '../src/data/scholarships';
import { opportunities } from '../src/data/opportunities';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY/SERVICE_ROLE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log('🌱 Starting CAREERMitra Supabase Data Import...');

  // 1. Seed Careers
  console.log(`Importing ${careers.length} careers...`);
  const { error: careersErr } = await supabase
    .from('careers')
    .upsert(careers, { onConflict: 'id' });
  if (careersErr) console.error('Error importing careers:', careersErr);
  else console.log('✅ Careers imported successfully.');

  // 2. Seed Roadmaps
  console.log(`Importing ${roadmaps.length} roadmaps...`);
  const { error: roadmapsErr } = await supabase
    .from('roadmaps')
    .upsert(roadmaps, { onConflict: 'id' });
  if (roadmapsErr) console.error('Error importing roadmaps:', roadmapsErr);
  else console.log('✅ Roadmaps imported successfully.');

  // 3. Seed Resources
  console.log(`Importing ${resources.length} resources...`);
  const { error: resourcesErr } = await supabase
    .from('resources')
    .upsert(resources, { onConflict: 'id' });
  if (resourcesErr) console.error('Error importing resources:', resourcesErr);
  else console.log('✅ Resources imported successfully.');

  // 4. Seed Scholarships
  console.log(`Importing ${scholarships.length} scholarships...`);
  const { error: scholarshipsErr } = await supabase
    .from('scholarships')
    .upsert(scholarships, { onConflict: 'id' });
  if (scholarshipsErr) console.error('Error importing scholarships:', scholarshipsErr);
  else console.log('✅ Scholarships imported successfully.');

  // 5. Seed Opportunities
  console.log(`Importing ${opportunities.length} opportunities...`);
  const { error: opportunitiesErr } = await supabase
    .from('opportunities')
    .upsert(opportunities, { onConflict: 'id' });
  if (opportunitiesErr) console.error('Error importing opportunities:', opportunitiesErr);
  else console.log('✅ Opportunities imported successfully.');

  console.log('🎉 Data Import Completed!');
}

seedData().catch(console.error);
