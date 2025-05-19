-- Drop the table if it already exists (optional, for a clean start)
DROP TABLE IF EXISTS products;

-- Create the products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,          -- Auto-incrementing integer ID
    name VARCHAR(255) NOT NULL,     -- Product name, cannot be null
    description TEXT,               -- Product description
    price DECIMAL(10, 2) NOT NULL,  -- Price with 2 decimal places, cannot be null
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp of creation
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  -- Timestamp of last update
);

-- Optional: Create a trigger to automatically update `updated_at`
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data
INSERT INTO products (name, description, price) VALUES
('Laptop Pro', 'High-performance laptop for professionals.', 1299.99),
('Wireless Mouse', 'Ergonomic wireless mouse with long battery life.', 25.50),
('Mechanical Keyboard', 'RGB backlit mechanical keyboard for gaming.', 79.00),
('4K Monitor', '27-inch 4K UHD monitor with vibrant colors.', 349.95),
('Webcam HD', '1080p HD webcam for video conferencing.', 45.00);

-- Verify insertion
SELECT * FROM products;