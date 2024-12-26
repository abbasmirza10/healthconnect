DELIMITER $$

CREATE PROCEDURE `updateFitnessAndNotifyDoctor`(
    IN patientIDParam INT,
    IN newCaloriesBurned REAL,
    IN newSteps INT,
    IN newSleepDuration REAL
)
BEGIN
    DECLARE assignedDoctorID INT;
    DECLARE criticalCondition BOOLEAN;
    DECLARE recurringIssuesDoctorID INT;
    DECLARE targetFitnessID INT;

    START TRANSACTION;
    
    -- First, get the fitness ID in a separate statement
    SELECT fitnessID INTO targetFitnessID 
    FROM Fitness 
    WHERE patientID = patientIDParam 
    ORDER BY date DESC 
    LIMIT 1;

    -- Then use it in the UPDATE statement
    UPDATE Fitness
    SET caloriesBurned = newCaloriesBurned,
        steps = newSteps,
        sleepDuration = newSleepDuration,
        date = CURDATE()
    WHERE fitnessID = targetFitnessID;

    SET criticalCondition = (newCaloriesBurned > 5000 OR newSteps < 100 OR newSleepDuration < 2);

    IF criticalCondition THEN
        -- Get the doctor with the least number of patients
        SELECT d.docID INTO assignedDoctorID
        FROM Doctor d
        JOIN Patient p ON d.docID = p.patientID
        GROUP BY d.docID
        ORDER BY COUNT(p.patientID) ASC
        LIMIT 1;

        -- Update first doctor's name with critical alert
        UPDATE Doctor
        SET docName = CONCAT(docName, ' - Critical Alert for Patient ID ', patientIDParam)
        WHERE docID = assignedDoctorID;

        -- Get the doctor with most recurring issues
        SELECT d.docID INTO recurringIssuesDoctorID
        FROM Doctor d
        JOIN Patient p ON d.docID = p.patientID
        JOIN Fitness f ON p.patientID = f.patientID
        WHERE f.caloriesBurned > 5000 OR f.steps < 100 OR f.sleepDuration < 2
        GROUP BY d.docID
        ORDER BY COUNT(f.fitnessID) DESC
        LIMIT 1;

        -- Update second doctor's name with recurring issues alert
        UPDATE Doctor
        SET docName = CONCAT(docName, ' - Recurring Critical Fitness Issues Alert for Patient ID ', patientIDParam)
        WHERE docID = recurringIssuesDoctorID;
    END IF;

    COMMIT;
END $$

DELIMITER ;


DELIMITER $$

DELIMITER $$

CREATE PROCEDURE updateFitnessAndReleaseDoctor(
    IN patientIDParam INT,
    IN newCaloriesBurned REAL,
    IN newSteps INT,
    IN newSleepDuration REAL
)
BEGIN
    DECLARE assignedDoctorID INT;
    DECLARE improvementCondition BOOLEAN;

    START TRANSACTION;

    UPDATE Fitness
    SET caloriesBurned = newCaloriesBurned,
        steps = newSteps,
        sleepDuration = newSleepDuration,
        date = CURDATE()
    WHERE fitnessID = (
        SELECT fitnessID FROM Fitness WHERE patientID = patientIDParam ORDER BY date DESC LIMIT 1
    );

    SET improvementCondition = (newCaloriesBurned < 2000 AND newSteps > 5000 AND newSleepDuration > 7);

    IF improvementCondition THEN
        -- Select the doctor associated with the patient
        SELECT d.docID INTO assignedDoctorID
        FROM Doctor d
        JOIN Patient p ON d.docID = p.patientID
        WHERE p.patientID = patientIDParam
        LIMIT 1;

        UPDATE Doctor
        SET docName = CONCAT(docName, ' - Patient ID ', patientIDParam, ' No Longer Critical')
        WHERE docID = assignedDoctorID;
    END IF;

    COMMIT;

END$$

DELIMITER ;


