-- Pre-populate all 721 Ghana Free SHS schools
INSERT INTO public.schools (name, slug, region, district, gender_type, residency_type, contact_email, is_active) VALUES
-- AHAFO REGION (16 Schools)
('Mim Senior High School', 'mim-senior-high-school', 'Ahafo', 'Mim', 'mixed', 'day/boarding', 'info@mimshs.edu.gh', true),
('Ahafoman Senior High/Tech School', 'ahafoman-senior-high-tech-school', 'Ahafo', 'Goaso', 'mixed', 'day/boarding', 'info@ahafomanshs.edu.gh', true),
('Kukuom Agric Senior High School', 'kukuom-agric-senior-high-school', 'Ahafo', 'Kukuom', 'mixed', 'day/boarding', 'info@kukuomagricshs.edu.gh', true),
('Sankore Senior High School', 'sankore-senior-high-school', 'Ahafo', 'Sankore', 'mixed', 'day/boarding', 'info@sankoreshs.edu.gh', true),
('Gyamfi Kumanini Senior High/Tech School', 'gyamfi-kumanini-senior-high-tech-school', 'Ahafo', 'Wamahinso', 'mixed', 'day/boarding', 'info@gyamfikumaninishs.edu.gh', true),
('Ola Girls Senior High School', 'ola-girls-senior-high-school', 'Ahafo', 'Kenyasi', 'female', 'day/boarding', 'info@olagirlsshs.edu.gh', true),
('Acherensua Senior High School', 'acherensua-senior-high-school', 'Ahafo', 'Acherensua', 'mixed', 'day/boarding', 'info@acherensuashs.edu.gh', true),
('Hwidiem Senior High School', 'hwidiem-senior-high-school', 'Ahafo', 'Hwidiem', 'mixed', 'day/boarding', 'info@hwidiemshs.edu.gh', true),
('Terchire Senior High School', 'terchire-senior-high-school', 'Ahafo', 'Terchire', 'mixed', 'day', 'info@terchireshs.edu.gh', true),
('Yamfo Anglican Senior High School', 'yamfo-anglican-senior-high-school', 'Ahafo', 'Yamfo', 'mixed', 'day/boarding', 'info@yamfoanglicanshs.edu.gh', true),
('Serwaa Kesse Girls Senior High School', 'serwaa-kesse-girls-senior-high-school', 'Ahafo', 'Duayaw Nkwanta', 'female', 'day/boarding', 'info@serwaakessegirlsshs.edu.gh', true),
('Boakye Tromo Senior High/Tech School', 'boakye-tromo-senior-high-tech-school', 'Ahafo', 'Duayaw Nkwanta', 'mixed', 'day/boarding', 'info@boakyetromoshs.edu.gh', true),
('Bomaa Comm. Senior High School', 'bomaa-comm-senior-high-school', 'Ahafo', 'Bomaa', 'mixed', 'day/boarding', 'info@bomaashs.edu.gh', true),
('Derma Comm. Day Senior High School', 'derma-comm-day-senior-high-school', 'Ahafo', 'Derma', 'mixed', 'day', 'info@dermashs.edu.gh', true),
('Samuel Otu Presby Senior High School', 'samuel-otu-presby-senior-high-school', 'Ahafo', 'Techimantia', 'mixed', 'day/boarding', 'info@samuelotushs.edu.gh', true),
('Bechem Presby Senior High School', 'bechem-presby-senior-high-school', 'Ahafo', 'Bechem', 'mixed', 'day/boarding', 'info@bechempresbyshs.edu.gh', true)

ON CONFLICT (slug) DO NOTHING;