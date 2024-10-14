-- question 1.1
INSERT INTO patients (FirstName, SecondName, DateOfBirth, Gender, Language)
VALUES ('John', 'Doe', '1980-11-15', 'Male', 'English');
-- question 2.1
UPDATE patients
SET language = 'Spanish'
WHERE first_name = 'John'
AND second_name = 'Doe'
AND date_of_birth = '1980-11-15';
-- question 3.1
DELETE FROM patients
WHERE patient_id = 10;
-- question 4.1
SELECT name,
		COALESCE(email, 'N/A') AS email
FROM providers;
-- question 4.2
SELECT name
		COALESCE(phone, 'Missing details') AS phone,
        COALESCE(email, 'Missing details') AS email
FROM providers;
-- bonus question
SELECT name, specialty, phone, email
FROM providers
WHERE speciality = 'pediatrics'
AND (phone IS NULL OR email is NULL);