// Quick script to check product prices in Supabase
// Run with: node check-prices.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dirvsgwsfnmjjdnhwknf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpcnZzZ3dzZm5tampkbmh3a25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MzAxMzMsImV4cCI6MjA3ODUwNjEzM30.feSuisTQn5240t6W6WtxAjmqizZXoD91d5N5SYIl9fY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkPrices() {
    console.log('🔍 Checking Tirzepatide prices in database...\n');

    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .ilike('name', '%tirzepatide%');

        if (error) throw error;

        if (products.length === 0) {
            console.log('❌ No Tirzepatide products found!');
            return;
        }

        console.log(`✅ Found ${products.length} Tirzepatide product(s):\n`);

        products.forEach(product => {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`📦 Product: ${product.name}`);
            console.log(`💰 Base Price: ₱${product.base_price?.toLocaleString('en-PH')}`);
            if (product.discount_active && product.discount_price) {
                console.log(`🏷️  Discount Price: ₱${product.discount_price.toLocaleString('en-PH')} (ACTIVE)`);
            }
            console.log(`📊 Stock: ${product.stock_quantity}`);
            console.log(`✅ Available: ${product.available ? 'Yes' : 'No'}`);
            console.log(`⭐ Featured: ${product.featured ? 'Yes' : 'No'}`);
            console.log(`🔬 Purity: ${product.purity_percentage}%`);
            console.log(`🆔 ID: ${product.id}`);
            console.log('');
        });

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('💡 If these prices don\'t match what you see on the website,');
        console.log('   try refreshing the browser or checking the console for errors.');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkPrices();


