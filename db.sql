CREATE TABLE entries
(
    id SERIAL PRIMARY KEY ,
    uniqueid TEXT,
    studentName TEXT,
    studentAge INTEGER,
    grade TEXT,
    parentName TEXT,
    email TEXT,
    phoneNumber TEXT,
    school TEXT,
    region TEXT,
    city TEXT,
    address TEXT,
    pincode INTEGER,
    payment TEXT,
    filename TEXT UNIQUE,
    filepath TEXT ,
    mimetype TEXT ,
    size BIGINT ,
    mark1 INTEGER,
    mark2 INTEGER,
    signedby TEXT,
    remark TEXT,
    status Boolean,
    paymentstatus Boolean,
    ageGroup TEXT
);

CREATE TABLE users
(
    username VARCHAR(15),
    password VARCHAR(15),
    role VARCHAR(15)
);

INSERT INTO users
    (username, password, role)
VALUES
    ('admin', 'admin@rcme', 'rcme');


INSERT INTO users
    (username, password, role)
VALUES
    ('architect', 'architect', 'student');

INSERT INTO entries
    (studentName,studentAge,grade,parentName,school,email,phoneNumber,region,city,address,pincode,status)
VALUES
    ('Nishanth', 21, '8', 'ABC', 'ABC School', 'nish@gmail.com', 97845, 'Assam', 'Tiruvannamalai', '3rd abc st', 606707, false)