import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkgfazoyyggbskzotulx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZ2Zhem95eWdnYnNrem90dWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3Nzg3OTMsImV4cCI6MjA4OTM1NDc5M30.yKRSqKqoTpJuBLKtJ9sV-5mgVrx1eFtGbfyhDjW4MlE';

async function test() {
  console.log('Testing connection with provide Anon Key...');
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const { data, error, status } = await supabase.from('leads').select('*').limit(1);
  console.log('Status Code:', status);
  
  if (error) {
    console.error('Supabase error:', error);
  } else {
    console.log('Success! Data fetched from table "leads":', data);
  }

  const { data: products, error: prodError } = await supabase.from('products').select('*').limit(1);
  if (prodError) {
    console.error('Products fetch error:', prodError);
  } else {
    console.log('Success! Data fetched from table "products":', products);
  }
}

test();
