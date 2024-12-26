-- On top of the primary key/ foreign key constraints, we also added the following constraints:

ALTER TABLE Patient
ADD CONSTRAINT chk_gender CHECK (gender IN (1,2));

ALTER TABLE Patient
ADD CONSTRAINT chk_age_years CHECK (ageInYears >= 0);

ALTER TABLE Fitness
ADD CONSTRAINT chk_calories CHECK (caloriesBurned >= 0);