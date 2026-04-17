const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://bhcudpdbicbmubiixcno.supabase.co', 'sb_publishable_6zJtZ4H-DkKu7XqSLNE22g_yhiUhQvv');
async function run() {
  const { data, error } = await supabase.from('controls').select('*').limit(3);
  console.log("Controls:", JSON.stringify(data, null, 2));
}
run();
