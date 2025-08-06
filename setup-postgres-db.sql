-- HandyMate PostgreSQL Database Setup for Neon DB

-- Create users table
CREATE TABLE IF NOT EXISTS uporabniki (
    id SERIAL PRIMARY KEY,
    ime VARCHAR(100) NOT NULL,
    priimek VARCHAR(100) NOT NULL,
    gsm VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    geslo VARCHAR(255) NOT NULL,
    tip_racuna VARCHAR(20) CHECK (tip_racuna IN ('uporabnik', 'mojster')) NOT NULL,
    strokovnosti JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create problems table
CREATE TABLE IF NOT EXISTS tezave (
    id SERIAL PRIMARY KEY,
    opis TEXT NOT NULL,
    kategorija VARCHAR(100) NOT NULL,
    cena DECIMAL(10,2) NOT NULL,
    uporabnik_id INTEGER REFERENCES uporabniki(id),
    datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO uporabniki (ime, priimek, email, geslo, tip_racuna, strokovnosti) 
VALUES 
    ('Test', 'User', 'test@test.com', 'password', 'uporabnik', NULL),
    ('Test', 'Mojster', 'mojster@test.com', 'password', 'mojster', '["Vodovodar", "Električar"]'::jsonb)
ON CONFLICT (email) DO NOTHING;

-- Insert sample problems
INSERT INTO tezave (opis, kategorija, cena, uporabnik_id)
VALUES 
    ('Popravilo pipe', 'Vodovodne storitve', 50.00, 1),
    ('Električna napeljava', 'Električne storitve', 120.00, 1)
ON CONFLICT DO NOTHING;