CREATE TABLE answers (
    answer_id      SERIAL NOT NULL,
    scale_response INTEGER NOT NULL,
    long_response  VARCHAR(1000),
    question_id    SERIAL NOT NULL,
    "comment"      VARCHAR(2000),
    survey_id      SERIAL NOT NULL
);
CREATE TABLE categories (
    category_id   SERIAL NOT NULL,
    category_name VARCHAR(50) NOT NULL,
    notes         VARCHAR(1000) NOT NULL
);

CREATE TABLE questions (
    question_id SERIAL NOT NULL,
    content     VARCHAR(1000) NOT NULL,
    category_id SERIAL NOT NULL
);

CREATE TABLE surveys (
    survey_id SERIAL NOT NULL,
    "date"    DATE NOT NULL,
    team_id   VARCHAR(50)
);

CREATE TABLE teams (
    team_id   VARCHAR(50) NOT NULL,
    team_name VARCHAR(50) NOT NULL
);

ALTER TABLE answers ADD CONSTRAINT answers_pk PRIMARY KEY ( answer_id );

ALTER TABLE categories ADD CONSTRAINT categories_pk PRIMARY KEY ( category_id );

ALTER TABLE questions ADD CONSTRAINT questions_pk PRIMARY KEY ( question_id );

ALTER TABLE surveys ADD CONSTRAINT surveys_pk PRIMARY KEY ( survey_id );


ALTER TABLE teams ADD CONSTRAINT teams_pk PRIMARY KEY ( team_id );

ALTER TABLE answers
    ADD CONSTRAINT answers_questions_fk FOREIGN KEY ( question_id )
        REFERENCES questions ( question_id );

ALTER TABLE answers
    ADD CONSTRAINT answers_surveys_fk FOREIGN KEY ( survey_id )
        REFERENCES surveys ( survey_id );

ALTER TABLE questions
    ADD CONSTRAINT questions_categories_fk FOREIGN KEY ( category_id )
        REFERENCES categories ( category_id );

ALTER TABLE surveys
    ADD CONSTRAINT surveys_teams_fk FOREIGN KEY ( team_id )
        REFERENCES teams ( team_id );


