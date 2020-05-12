DROP TABLE IF EXISTS Medalists;
DROP TABLE IF EXISTS AthleteStats;
DROP TABLE IF EXISTS Athletes;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Games;
DROP TABLE IF EXISTS Countries;

CREATE TABLE Countries (
  NOC           VARCHAR(3) NOT NULL,
  countryName   VARCHAR(32) NOT NULL,
  year          INT(4) NOT NULL,
  PRIMARY KEY(NOC, year)
);

CREATE TABLE Games (
  year        INT(4) NOT NULL,
  season      VARCHAR(1) NOT NULL,
  city        VARCHAR(32) NOT NULL,
  NOC         VARCHAR(32) NOT NULL,
  numSports   INT(4) NOT NULL,
  PRIMARY KEY(year, season)
);

CREATE TABLE Events (
  eventID         INT(4) NOT NULL,
  sport           VARCHAR(64),
  event           VARCHAR(128),
  yearIntroduced  INT(4) NOT NULL,
  latestYear      INT(4) NOT NULL,
  season          VARCHAR(1) NOT NULL,
  PRIMARY KEY(eventID),
  FOREIGN KEY(yearIntroduced) REFERENCES Games(year),
  FOREIGN KEY(latestYear) REFERENCES Games(year)
);

CREATE TABLE Athletes (
  athleteID     INT(6) NOT NULL,
  athleteName   VARCHAR(128) NOT NULL,
  NOC           VARCHAR(3) NOT NULL,
  year          INT(4) NOT NULL,
  eventID       INT(4) NOT NULL,
  PRIMARY KEY(athleteID),
  FOREIGN KEY(NOC) REFERENCES Countries(NOC),
  FOREIGN KEY(year) REFERENCES Games(year),
  FOREIGN KEY(eventID) REFERENCES Events(eventID)
);

CREATE TABLE AthleteStats (
  athleteID   INT(6) NOT NULL,
  age         INT(3),
  sex         VARCHAR(1),
  height      INT(4),
  weight      INT(4),
  PRIMARY KEY(athleteID),
  FOREIGN KEY(athleteID) REFERENCES Athletes(athleteID)
);

CREATE TABLE Medalists (
  athleteID INT(6) NOT NULL,
  eventID   INT(4) NOT NULL,
  medal     VARCHAR(6) NOT NULL,
  PRIMARY KEY(athleteID, eventID),
  FOREIGN KEY(athleteID) REFERENCES Athletes(athleteID),
  FOREIGN KEY(eventID) REFERENCES Events(eventID)     
);

LOAD DATA LOCAL INFILE 'clean_data/Countries.txt'
INTO TABLE Countries
CHARACTER SET UTF8
FIELDS TERMINATED BY ','
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE 'clean_data/Games.txt'
INTO TABLE Games
CHARACTER SET UTF8
FIELDS TERMINATED BY ','
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE 'clean_data/Events.txt'
INTO TABLE Events
CHARACTER SET UTF8
FIELDS TERMINATED BY ','
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE 'clean_data/Athletes.txt'
INTO TABLE Athletes
CHARACTER SET UTF8
FIELDS TERMINATED BY ','
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE 'clean_data/AthleteStats.txt'
INTO TABLE AthleteStats
CHARACTER SET UTF8
FIELDS TERMINATED BY ','
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE 'clean_data/Medalists.txt'
INTO TABLE Medalists
CHARACTER SET UTF8
FIELDS TERMINATED BY ','
IGNORE 1 LINES;

DROP VIEW IF EXISTS MedalCount;

CREATE VIEW MedalCount AS (
  SELECT
    medalwinners.athleteName,
    MAX(CASE WHEN (medal = 'Gold') THEN medal_count ELSE 0 END) AS Gold,
    MAX(CASE WHEN (medal = 'Silver') THEN medal_count ELSE 0 END) AS Silver,
    MAX(CASE WHEN (medal = 'Bronze') THEN medal_count ELSE 0 END) AS Bronze
  FROM
    (
    SELECT Athletes.athleteName, Medalists.medal, COUNT(Medalists.medal) AS medal_count
    FROM Athletes
    INNER JOIN Medalists
    ON Medalists.athleteID = Athletes.athleteID
    GROUP BY Athletes.athleteName, Medalists.medal
    ) medalwinners
  GROUP BY medalwinners.athleteName
  ORDER BY medalwinners.athleteName
);

DROP VIEW IF EXISTS country_totals;

CREATE VIEW country_totals AS (
  SELECT COUNT(Athletes.athleteID) AS total, Athletes.NOC, A.sex
  FROM Athletes 
  INNER JOIN(
    SELECT athleteID, sex FROM AthleteStats
  ) A 
  ON Athletes.athleteID = A.athleteID
  GROUP BY Athletes.NOC, A.sex 
);

DROP VIEW IF EXISTS country_singles;

CREATE VIEW country_singles AS (
  SELECT COUNT(B.NOC) AS one_timers, B.NOC, B.sex
  FROM (
    SELECT A.athleteName, A.NOC, AthleteStats.sex
    FROM AthleteStats
    INNER JOIN (
      SELECT athleteID, athleteName, year, NOC 
      FROM Athletes 
      GROUP BY athleteName, year, NOC
    ) A
    ON A.athleteID = AthleteStats.athleteID
    GROUP BY A.athleteName
    HAVING COUNT(*) = 1
  ) B
  GROUP BY B.NOC, B.sex
);

DROP VIEW IF EXISTS sport_totals;

CREATE VIEW sport_totals AS(
  SELECT COUNT(Athletes.athleteID) AS total, Athletes.eventID, A.sex
  FROM Athletes 
  INNER JOIN(
    SELECT athleteID, sex FROM AthleteStats
  ) A 
  ON A.athleteID = Athletes.athleteID
  GROUP BY Athletes.eventID
);

DROP VIEW IF EXISTS sport_singles;

CREATE VIEW sport_singles AS(
  SELECT COUNT(B.eventID) AS one_timers, B.eventID, B.sex
  FROM (
    SELECT A.AthleteName, COUNT(A.athleteName), A.eventID, A.sex 
    FROM (
      SELECT athleteName, year, eventID, sex 
      FROM Athletes 
      INNER JOIN (
      SELECT athleteID, sex FROM AthleteStats
      ) Z
      ON Z.athleteID = Athletes.athleteID
      GROUP BY athleteName, year, eventID, sex 
    ) A
    GROUP BY AthleteName
    HAVING COUNT(*) = 1
  ) B
  GROUP BY B.eventID
);

DROP VIEW IF EXISTS ages;

CREATE VIEW ages AS (
  SELECT Countries.countryName, B.athleteName, B.age, B.year, B.eventID
  FROM Countries
  INNER JOIN(
    SELECT DISTINCT(Athletes.athleteName) AS athleteName, Athletes.NOC, A.age, Athletes.year, Athletes.eventID
    FROM Athletes
    INNER JOIN(
      SELECT athleteID, age FROM AthleteStats
    ) A
    ON A.athleteID = Athletes.athleteID
  ) B
  ON Countries.NOC = B.NOC
  GROUP BY Countries.countryName, B.athleteName
  ORDER BY B.age DESC
);

DROP VIEW IF EXISTS weights;

CREATE VIEW weights AS(
  SELECT Events.sport, Events.event, B.athleteName, B.weight, B.NOC
  FROM Events
  INNER JOIN(
    SELECT DISTINCT(Athletes.athleteName) AS athleteName, Athletes.NOC, A.weight, Athletes.eventID
    FROM Athletes
    INNER JOIN(
      SELECT athleteID, weight FROM AthleteStats
      WHERE weight <> 0
    ) A
    ON A.athleteID = Athletes.athleteID
  ) B
  ON Events.eventID = B.eventID
  GROUP BY Events.sport, Events.event, B.athleteName
  ORDER BY B.weight DESC
);

delimiter //

DROP PROCEDURE IF EXISTS Q1 //
CREATE PROCEDURE Q1(IN base_year INT(4), cname VARCHAR(32), seas VARCHAR(1))
BEGIN
SELECT year, COUNT(athleteID) AS medal_count
FROM Athletes
WHERE year BETWEEN base_year - 4 AND base_year + 4
AND NOC in (SELECT NOC FROM Countries WHERE countryName = cname)
AND eventID IN (SELECT eventID FROM Events WHERE season = seas)
GROUP BY year;
END;
//

DROP PROCEDURE IF EXISTS Q2 //
CREATE PROCEDURE Q2(spo VARCHAR(64))
BEGIN
SELECT Countries.countryName, C.avg_num_games
FROM Countries
INNER JOIN (
  SELECT B.NOC, AVG(B.num_games) AS avg_num_games
  FROM (
    SELECT A.athleteName, COUNT(A.athleteName) AS num_games, A.NOC 
    FROM (
      SELECT athleteName, year, COUNT(athleteID), NOC 
      FROM Athletes 
      WHERE eventID IN (SELECT eventID FROM Events WHERE sport = spo)
      GROUP BY athleteName, year, NOC
      ) A
      GROUP BY A.athleteName, A.NOC
  ) B
  GROUP BY B.NOC
  ORDER BY avg_num_games DESC
  LIMIT 10
) C
ON Countries.NOC = C.NOC
GROUP BY Countries.countryName
ORDER BY avg_num_games DESC;
END;
//

DROP PROCEDURE IF EXISTS Q3 //
CREATE PROCEDURE Q3(IN s VARCHAR(1), seas VARCHAR(1))
BEGIN
SELECT Events.sport, Events.event, C.avg_num_games 
FROM Events 
INNER JOIN( 
  SELECT B.eventID, AVG(B.num_games) AS avg_num_games 
  FROM ( 
    SELECT A.athleteName, COUNT(A.athleteName) as num_games, A.eventID 
    FROM ( 
      SELECT athleteName, year, COUNT(athleteID), eventID 
      FROM Athletes 
      WHERE athleteID IN (SELECT athleteID FROM AthleteStats WHERE sex = s) 
      AND eventID IN (SELECT eventID FROM Events WHERE season = seas) 
      GROUP BY athleteName, year, eventID
    ) A 
    GROUP BY A.athleteName, A.eventID
  ) B 
  GROUP BY B.eventID 
) C 
ON Events.eventID = C.eventID 
GROUP BY Events.sport, Events.event 
ORDER BY C.avg_num_games DESC 
LIMIT 10;
END;
//

DROP PROCEDURE IF EXISTS Q4 //
CREATE PROCEDURE Q4(IN spo VARCHAR(32), cname VARCHAR(32))
BEGIN
SELECT B.sex, AVG(B.num_games) AS avg_num_games
FROM (
  SELECT COUNT(A.athleteID) as num_games, A.athleteName, AthleteStats.sex 
  FROM AthleteStats
  INNER JOIN (
    SELECT athleteID, athleteName, year 
    FROM Athletes 
    WHERE eventID IN (
      SELECT eventID FROM Events WHERE sport = spo) 
    AND NOC IN (
      SELECT NOC FROM Countries WHERE countryName = cname) 
    GROUP BY athleteName, year
  ) A
  ON A.athleteID = AthleteStats.athleteID
  GROUP BY A.athleteName
) B
GROUP BY B.sex;
END;
//

DROP PROCEDURE IF EXISTS Q5 //
CREATE PROCEDURE Q5(IN spo VARCHAR(32), eve VARCHAR(128))
BEGIN
SELECT AVG(age) FROM AthleteStats
WHERE athleteID IN (
  SELECT athleteID
  FROM Athletes
  WHERE eventID IN (SELECT eventID FROM Events WHERE sport = spo AND event = eve)
);
END;
//


DROP PROCEDURE IF EXISTS Q6 //
CREATE PROCEDURE Q6(IN s VARCHAR(1), w INT(4), h INT(4))
BEGIN
SELECT * FROM (
  SELECT Events.sport, Events.event, eventStats.avg_height, eventStats.avg_weight
  FROM Events
  INNER JOIN (
    SELECT Athletes.eventID, AVG(NULLIF(AthleteStats.height, 0)) as avg_height, AVG(NULLIF(AthleteStats.weight,0)) as avg_weight
    FROM AthleteStats
    INNER JOIN (
      SELECT athleteID, eventID from Athletes
      WHERE athleteID IN(SELECT athleteID FROM AthleteStats WHERE sex = s)
      GROUP BY eventID
    ) Athletes
    ON Athletes.athleteID = AthleteStats.athleteID
    GROUP BY eventID
  ) eventStats 
  ON eventStats.eventID = Events.eventID
  ) sportsStats
ORDER BY (ABS(w - avg_weight) ^ 2) + ((ABS (h - avg_height) * 100) ^ 2) DESC
LIMIT 3;
END;
//

DROP PROCEDURE IF EXISTS Q7 //
CREATE PROCEDURE Q7(IN y INT(4))
BEGIN
IF (y = 1984) THEN
  SELECT year, COUNT(athleteID)
  FROM Athletes
  WHERE year IN (1984, 1988)
  AND NOC = 'USA'
  AND eventID IN (SELECT eventID FROM Events WHERE season = 'S')
  GROUP BY year;
ELSE
  SELECT year, COUNT(athleteID)
  FROM Athletes
  WHERE year IN (1980, 1976)
  AND NOC IN ('RUS', 'BUL', 'FRG', 'MGL', 'VIE', 'TCH', 'AFG', 'HUN', 'POL', 'CUB', 'PRK', 'ETH')
  AND eventID IN (SELECT eventID FROM Events WHERE season = 'S')
  GROUP BY year;
END IF;
END;
//

DROP PROCEDURE IF EXISTS Q8 //
CREATE PROCEDURE Q8(IN w VARCHAR(4))
BEGIN
IF (w = 'WWI') THEN
  SELECT B.year, B.countryName, B.num_medalists 
  FROM (
    SELECT A.year, Countries.countryName, A.num_medalists
    FROM Countries
    INNER JOIN (
      SELECT year, COUNT(athleteID) AS num_medalists, NOC 
      FROM Athletes 
      WHERE year IN (1912, 1920) 
      GROUP BY year, NOC
    ) A
    ON Countries.NOC = A.NOC
    GROUP BY Countries.countryName, A.year
  ) B
  GROUP BY countryName
  HAVING COUNT(*) = 1
  ORDER BY B.year;
ELSE
  SELECT B.year, B.countryName, B.num_medalists 
  FROM (
    SELECT A.year, Countries.countryName, A.num_medalists
    FROM Countries
    INNER JOIN (
      SELECT year, COUNT(athleteID) AS num_medalists, NOC 
      FROM Athletes 
      WHERE year IN (1936, 1948) 
      GROUP BY year, NOC
    ) A
    ON Countries.NOC = A.NOC
    GROUP BY Countries.countryName, A.year
  ) B
  GROUP BY countryName
  HAVING COUNT(*) = 1
  ORDER BY B.year;
END IF;
END;
//

DROP PROCEDURE IF EXISTS Q9 //
CREATE PROCEDURE Q9(IN y1 INT(4), y2 INT(4))
BEGIN
SELECT Events.season, COUNT(DISTINCT(A.NOC)) AS num_distinct_countries
FROM Events
INNER JOIN (
  SELECT NOC, eventID
  FROM Athletes
  WHERE year BETWEEN y1 AND y2
) A
ON Events.eventID = A.eventID
GROUP BY Events.season;
END;
//

DROP PROCEDURE IF EXISTS Q10 //
CREATE PROCEDURE Q10(IN s VARCHAR(1), spo VARCHAR(64), cname VARCHAR(32))
BEGIN
SELECT A.athleteName, A.Total, MedalCount.Gold, MedalCount.Silver, MedalCount.Bronze
FROM MedalCount
INNER JOIN(
  SELECT athleteName, COUNT(athleteID) AS Total
  FROM Athletes
  WHERE athleteID IN (SELECT athleteID FROM AthleteStats WHERE sex = s)
  AND eventID IN (SELECT eventID FROM Events WHERE sport = spo)
  AND NOC IN (SELECT NOC FROM Countries WHERE countryName = cname)
  GROUP BY athleteName
) A
ON A.athleteName = MedalCount.athleteName
ORDER BY A.Total DESC
LIMIT 10;
END;
//

DROP PROCEDURE IF EXISTS Q11 //
CREATE PROCEDURE Q11(IN s VARCHAR(1))
BEGIN
SELECT Countries.countryName, (A.one_timers / A.total) * 100 AS percent_one_timers
FROM Countries
INNER JOIN(
  SELECT country_singles.one_timers, totals.total, totals.NOC, totals.sex
  FROM country_singles
  INNER JOIN (
    SELECT * FROM country_totals
    WHERE sex = s
  ) totals
  ON country_singles.NOC = totals.NOC AND country_singles.sex = totals.sex
) A
ON A.NOC = Countries.NOC
GROUP BY countryName
ORDER BY percent_one_timers DESC;
END;
//

DROP PROCEDURE IF EXISTS Q12 //
CREATE PROCEDURE Q12(IN s VARCHAR(1))
BEGIN
SELECT Events.sport, Events.event, (A.one_timers / A.total) * 100 AS percent_one_timers
FROM Events
INNER JOIN(
  SELECT sport_singles.one_timers, totals.total, totals.eventID, totals.sex
  FROM sport_singles
  INNER JOIN(
    SELECT * FROM sport_totals
    WHERE sex = s
  ) totals
  ON sport_singles.eventID = totals.eventID AND sport_singles.sex = totals.sex
) A
ON A.eventID = Events.eventID
GROUP BY sport, event
ORDER BY percent_one_timers DESC;
END;
//

DROP PROCEDURE IF EXISTS Q13 //
CREATE PROCEDURE Q13(IN s VARCHAR(1), seas VARCHAR(1), spo VARCHAR(64))
BEGIN
SELECT A.countryName, A.athleteName, A.age, A.year, Events.sport, Events.event
FROM Events
INNER JOIN(
  SELECT countryName, athleteName, age, eventID, year
  FROM ages
  WHERE athleteName IN (
    SELECT athleteName 
    FROM Athletes 
    WHERE athleteID IN (SELECT athleteID FROM AthleteStats WHERE sex = s) 
    AND eventID IN (SELECT eventID FROM Events WHERE season = seas AND sport = spo)
  )
) A
ON Events.eventID = A.eventID
ORDER BY A.age DESC
LIMIT 10;
END;
//

DROP PROCEDURE IF EXISTS Q14 //
CREATE PROCEDURE Q14(IN s VARCHAR(1), cname VARCHAR(32))
BEGIN
SELECT event, athleteName, weight
FROM weights
WHERE athleteName IN (
  SELECT athleteName 
  FROM Athletes 
  WHERE athleteID IN (SELECT athleteID FROM AthleteStats WHERE sex = s) 
  AND NOC IN (SELECT NOC FROM Countries WHERE countryName = cname)
)
GROUP BY athleteName
ORDER BY weight DESC
LIMIT 10;
END;
//

DROP PROCEDURE IF EXISTS Q15 //
CREATE PROCEDURE Q15(IN spo VARCHAR(65), eve VARCHAR(128), cname VARCHAR(32))
BEGIN
SELECT medal, COUNT(medal) AS num_medals
FROM Medalists
WHERE athleteID IN (
  SELECT athleteID 
  FROM Athletes 
  WHERE NOC IN (SELECT NOC FROM Countries WHERE countryName = cname)
)
AND eventID IN (
  SELECT eventID 
  FROM Events 
  WHERE event = eve
  AND sport = spo
)
GROUP BY medal
ORDER BY CASE medal 
    WHEN 'Gold' THEN 1 
    WHEN 'Silver' THEN 2 
    WHEN 'Bronze' THEN 3 
    END 
;
END;
//