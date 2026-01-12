-- Better Than Bare - Product Setup
-- Run this in your Supabase SQL Editor

-- First, clear existing products
DELETE FROM product_variations;
DELETE FROM products;

-- Clear and recreate categories (using proper UUID format)
DELETE FROM categories;

INSERT INTO categories (id, name, icon, sort_order, active) VALUES
(gen_random_uuid(), 'All Products', 'Grid', 0, true),
(gen_random_uuid(), 'Weight Management', 'Scale', 1, true),
(gen_random_uuid(), 'Beauty & Anti-Aging', 'Sparkles', 2, true),
(gen_random_uuid(), 'Wellness & Vitality', 'Heart', 3, true),
(gen_random_uuid(), 'Cognitive', 'Brain', 4, true),
(gen_random_uuid(), 'Performance', 'Zap', 5, true);

-- Insert Better Than Bare Products
-- First get the category IDs
DO $$
DECLARE
    weight_cat UUID;
    skin_cat UUID;
    wellness_cat UUID;
    cognitive_cat UUID;
    performance_cat UUID;
BEGIN
    SELECT id INTO weight_cat FROM categories WHERE name = 'Weight Management';
    SELECT id INTO skin_cat FROM categories WHERE name = 'Beauty & Anti-Aging';
    SELECT id INTO wellness_cat FROM categories WHERE name = 'Wellness & Vitality';
    SELECT id INTO cognitive_cat FROM categories WHERE name = 'Cognitive';
    SELECT id INTO performance_cat FROM categories WHERE name = 'Performance';

    -- Tirzepatide Products (Weight Management)
    INSERT INTO products (name, description, category, base_price, purity_percentage, featured, available, stock_quantity) VALUES
    ('Tirz 15', 'Tirzepatide 15mg - Premium weight management peptide with dual GIP/GLP-1 action for effective results.', weight_cat, 3500.00, 99.5, true, true, 50),
    ('Tirz 20', 'Tirzepatide 20mg - Enhanced dosage for continued weight management support.', weight_cat, 4500.00, 99.5, true, true, 50),
    ('Tirz 30', 'Tirzepatide 30mg - Maximum strength formulation for optimal results.', weight_cat, 6000.00, 99.5, true, true, 50);

    -- Skin & Beauty
    INSERT INTO products (name, description, category, base_price, purity_percentage, featured, available, stock_quantity) VALUES
    ('GHK-CU 50', 'GHK-Cu 50mg - Copper peptide complex for skin rejuvenation, collagen synthesis, and anti-aging benefits.', skin_cat, 2800.00, 99.0, true, true, 40),
    ('KPV 10', 'KPV 10mg - Anti-inflammatory peptide supporting skin health and reducing redness.', skin_cat, 2200.00, 99.0, false, true, 35),
    ('GLOW', 'GLOW Complex - Premium beauty blend for radiant, healthy-looking skin.', skin_cat, 3000.00, 99.0, true, true, 45);

    -- Wellness & Vitality
    INSERT INTO products (name, description, category, base_price, purity_percentage, featured, available, stock_quantity) VALUES
    ('5-Amino 5mg', '5-Amino-1MQ 5mg - Metabolic support peptide for enhanced energy and wellness.', wellness_cat, 1800.00, 98.5, false, true, 60),
    ('MOTS-C 40mg', 'MOTS-C 40mg - Mitochondrial peptide for metabolic optimization and cellular health.', wellness_cat, 4200.00, 99.0, true, true, 30),
    ('NAD+ 500', 'NAD+ 500mg - Cellular energy and longevity support for overall vitality.', wellness_cat, 5500.00, 99.0, true, true, 25);

    -- Cognitive
    INSERT INTO products (name, description, category, base_price, purity_percentage, featured, available, stock_quantity) VALUES
    ('Semax 10mg', 'Semax 10mg - Nootropic peptide for enhanced cognitive function, focus, and mental clarity.', cognitive_cat, 1600.00, 99.0, false, true, 40),
    ('Selank 10mg', 'Selank 10mg - Anxiolytic nootropic for stress relief, mood enhancement, and mental calm.', cognitive_cat, 1600.00, 99.0, false, true, 40);

    -- Performance
    INSERT INTO products (name, description, category, base_price, purity_percentage, featured, available, stock_quantity) VALUES
    ('Cagri 5mg', 'Cagrilintide 5mg - Next-generation peptide for appetite regulation and metabolic support.', performance_cat, 3800.00, 99.0, false, true, 30),
    ('PT-141', 'PT-141 (Bremelanotide) - Melanocortin receptor agonist for enhanced performance and vitality.', performance_cat, 2000.00, 98.5, false, true, 35);
END $$;

-- Verify products were inserted
SELECT name, category, base_price, available FROM products ORDER BY name;
