CREATE TABLE answers (
    answer_id      SERIAL NOT NULL,
    scale_response INTEGER,
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

INSERT INTO Categories (category_id, category_name, notes)
VALUES (1, 'Overall Satisfaction', 'Use these questions for a high-level indicator of satsifactions.');
INSERT INTO Categories (category_id, category_name, notes)
VALUES (2, 'Efficiency, Focus Time', 'Answers to these questions can be about daily work being interrupted (lots of bugs or fires to put out) or about projects being paused and switched out too often.');
INSERT INTO Categories (category_id, category_name, notes)
VALUES (3, 'Production, Monitoring', 'If your team isn''t responsible for supporting production workloads, you can leave these questions out.');
INSERT INTO Categories (category_id, category_name, notes)
VALUES (4, 'Deployments and Releases', 'These questions tend to open up the most interesting discussions, because they touch on confidence in your automated tooling, and following best practices when it comes to CI/CD. Developers usually have strong opinions here, or want to replicate something that worked well for them on a previous team.
The last question about release freuquency might need some coaching about "deployments vs. releases" if your team doesn''t decouple them, or doesn''t have that mental model.');
INSERT INTO Categories (category_id, category_name, notes)
VALUES (5, 'Collaboration and Knowledge', 'If your team is releatively new, consider adding a question about onboarding here. Onboarding highlights all the pain when information isn''t easily accessible by your team.');
INSERT INTO Categories (category_id, category_name, notes)
VALUES (6, 'Codebase Health', 'Look out for connections between these answers and the ones from the Deployments and Releases category. There is usually some correlation.');
INSERT INTO Categories (category_id, category_name, notes)
VALUES (7, 'Project Planning, Team Processes', 'If you suspect some dissastisfaction when it comes to sprint ceremonies or your planning processes, add more specific questions to help diagnose a root cause. These questions can be answered by your cross-functional team (product management/design/data/etc) if applicable.');
INSERT INTO Categories (category_id, category_name, notes)
VALUES (8, 'Tradeoffs', 'The answers here are often related to the Project Planning category above.');
INSERT INTO Categories (category_id, category_name, notes)
VALUES (9, 'Perceived Productivity', 'I recommend categorising responses to these open-ended questions and looking for patterns (for example, Answer A mentioned e2e testing and sprint planning, Answer B mentioned e2e testing, CI/CD, and project planning).');
INSERT INTO Categories (category_id, category_name, notes)
VALUES (10, 'Follow-up', 'Include the 2nd and every subsequent survey.');

INSERT INTO Questions (question_id, category_id, content)
VALUES (1, 1, 'I''m satisfied with the development tools and practices at our company.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (2, 1, 'I''m happy with our tech stack.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (3, 1, 'I believe we follow development best practices.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (4, 2, 'I get enough focus time.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (5, 2, 'My normal work is rarely interrupted.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (6, 2, 'I feel like a lot of my time is used properly.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (7, 3, 'When there is an outage, I feel confident that we can repair it quickly.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (8, 3, 'I have a good understanding of what''s going on in production.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (9, 3, 'I have confidence in our alerting, monitoring, and telemetry tools.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (10, 4, 'I''m satisfied with the number of tests.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (11, 4, 'I''m satisfied with the quality of tests.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (12, 4, 'It''s easy to deploy software.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (13, 4, 'I''m satisfied with the speed and reliability of our CI/CD tooling.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (14, 4, 'I''m satisfied with how frequently we release software.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (15, 5, 'Our team spends enough time learning from our mistakes.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (16, 5, 'I can unblock myself if I get stuck.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (17, 5, 'Our code review process helps us release better code.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (18, 6, 'We spend enough time refactoring code.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (19, 6, 'Our codebase is easy to contribute to.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (20, 6, 'We have a reasonable amount of technical debt.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (21, 7, 'My projects are well-scoped with clear goals.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (22, 7, 'I understand how all of my projects will be used by our customers.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (23, 7, 'Our team processes are efficient.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (24, 7, 'Our meetings are effective and useful.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (25, 8, 'I can often keep the quality even when hitting deadlines.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (26, 8, 'Our team is spread enough, given everything we are responsible for.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (27, 8, 'We make adequate number of tradeoffs.');
INSERT INTO Questions (question_id, category_id, content)
VALUES (28, 9, 'How productive do you feel on an average day\?');
INSERT INTO Questions (question_id, category_id, content)
VALUES (29, 9, 'What would reduce friction in your day-to-day work\?');
INSERT INTO Questions (question_id, category_id, content)
VALUES (30, 9, 'Anything else you want to share\?');
INSERT INTO Questions (question_id, category_id, content)
VALUES (31, 10, 'I''ve noticed changes based on the feedback from the last survey.');