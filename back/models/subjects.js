const db = require("./db");

const createSubjectsTables = async () => {
  try {
    await db.query(`BEGIN;`);
    await db.query(
      `DO $$ BEGIN CREATE TYPE allSubjects AS ENUM ('Python','Docker','Java','Javascript','Mongo','SQL','React'); EXCEPTION WHEN duplicate_object THEN RAISE NOTICE 'allSubjects type already exists.'; END $$;`
    );
    await db.query(
      `DO $$ BEGIN CREATE TYPE allLevels AS ENUM ('easy','medium','hard'); EXCEPTION WHEN duplicate_object THEN RAISE NOTICE 'allLevels type already exists.'; END $$;`
    );
    await db.query(
      `DO $$ BEGIN CREATE TYPE allRatings AS ENUM ('1','2','3','4','5'); EXCEPTION WHEN duplicate_object THEN RAISE NOTICE 'allRatings type already exists.'; END $$;`
    );
    await db.query(
      `CREATE TABLE IF NOT EXISTS "subjects"( subject_id SERIAL PRIMARY KEY, subject allSubjects, rating allRatings, level allLevels);`
    );
    await db.query(`COMMIT;`);
    console.log("subjects table created");
  } catch (error) {
    console.log(error);
  }
};

module.exports = createSubjectsTables;





