DELIMITER $$

CREATE TRIGGER notifyDoctorOnCriticalFitness
AFTER INSERT ON Fitness
FOR EACH ROW
BEGIN
    DECLARE criticalCondition BOOLEAN;
    DECLARE assignedDoctorID INT;

    SET criticalCondition = (NEW.caloriesBurned > 5000 OR NEW.steps < 100 OR NEW.sleepDuration < 2);

    SELECT docID INTO assignedDoctorID FROM Doctor ORDER BY RAND() LIMIT 1;

    IF criticalCondition THEN
        UPDATE Doctor
        SET docName = CONCAT(docName, ' - Critical Fitness Alert for Fitness ID ', NEW.fitnessID)
        WHERE docID = assignedDoctorID;
    END IF;
END$$

DELIMITER ;
