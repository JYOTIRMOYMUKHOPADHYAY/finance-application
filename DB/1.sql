-- Create the user_id_seq
CREATE SEQUENCE user_id_seq
START WITH 10000
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;

-- Create the services table
CREATE TABLE genericMaster (
    id SERIAL PRIMARY KEY,       -- Auto-incrementing primary key
    name VARCHAR(555) NOT NULL,  -- Name of the service
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE genericMasterDropdown (
    id SERIAL PRIMARY KEY,      -- Auto-incrementing primary key
    master_id INT NOT NULL,  
    name VARCHAR(555) NOT NULL,  -- Name of the service
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (master_id) REFERENCES genericMaster(id)
);


-- Create the services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,       -- Auto-incrementing primary key
    name VARCHAR(555) NOT NULL,  -- Name of the service
    role_name VARCHAR(555) NOT NULL -- Role name for the service
);

-- Alter the userdata table to use the user_id_seq
ALTER TABLE userdata ALTER COLUMN user_id SET DEFAULT nextval('user_id_seq');


-- Create the subservices table
CREATE TABLE subservices (
    id SERIAL PRIMARY KEY,       -- Auto-incrementing primary key
    name VARCHAR(555) NOT NULL,  -- Name of the subservice
    service_id INT NOT NULL,     -- Foreign key referencing the services table
    role_name VARCHAR(555) NOT NULL, -- Role name for the subservice
    CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE
);

ALTER TABLE subservices
ADD COLUMN periodId INT,
ADD CONSTRAINT fk_period FOREIGN KEY (periodId) REFERENCES genericMasterDropdown(id) ON DELETE SET NULL;

ALTER TABLE subservices
ADD COLUMN documents_required INT;


-- Create the userTypes table
CREATE TABLE userTypes (
    userType_id SERIAL PRIMARY KEY,
    userType_name VARCHAR(100) NOT NULL UNIQUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by INT NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the userData table
CREATE TABLE userData (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    password VARCHAR(255) NOT NULL,
    password_salt VARCHAR(255) NOT NULL,
    phone_no VARCHAR(15) NOT NULL UNIQUE,
    userType_id INT NOT NULL,
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userType_id) REFERENCES userTypes(userType_id)
);
ALTER TABLE "userData"
ADD COLUMN "isDeleted" BOOLEAN DEFAULT FALSE,
ADD COLUMN "isActive" BOOLEAN DEFAULT TRUE;

-- Create the applyToJob table
CREATE TABLE  applyToJob(
    id SERIAL PRIMARY KEY,
    name Varchar(255) NOT NULL,
    email Varchar(255) NOT NULL,
    phone_no Varchar(255) NOT NULL,
    experience Varchar(555) NOT NULL,
    current_location Varchar(555) NOT NULL,
    user_type INT NOT NULL,
    agreement Boolean NOT NULL, -- Ensures agreement is always true
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status Varchar(255) NULL, -- Nullable status field,
	filePath Varchar(555) NOT NULL,
    FOREIGN KEY (user_type) REFERENCES usertypes(usertype_id) ON DELETE CASCADE
);

-- Create the getInTouch table
CREATE TABLE  getInTouch(
    id SERIAL PRIMARY KEY,
    name Varchar(255) NOT NULL,
    email Varchar(255) NOT NULL,
    phone_no Varchar(255) NOT NULL,
    required_service INT NOT NULL,
	message Varchar(255) NULL, -- Nullable status field,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (required_service) REFERENCES subservices(id) ON DELETE CASCADE
);


-- Business Registration and Incorporation Services
-- Insert sole proprietorship
-- Step 1: Create ENUM type for status
-- CREATE TYPE status_enum AS ENUM ('APPROVED', 'REJECTED', 'PENDING' , 'COMPLETED', 'ASSIGNED');
CREATE TYPE status_enum AS ENUM ('PENDING', 'ASSIGNED', 'ACCEPTED' , 'SUBMITTED', 'COMPLETED', 'REJECTED');

-- 1. INTIAL STATE 'PENDING'
-- 2. ADMIN SEND THIS TO STAFF STATUS CHANGED TO 'ASSIGNED'
-- 3. STAFF ACCEPT STATUS CHANGED TO 'ACCEPTED'
-- 4. STAFF REJECT STATUS CHANGED TO 'PENDING'
-- 5. STAFF DO THE WORK SEND THIS TO ADMIN STATUS CHANGED TO 'SUBMITTED'
-- 6. ADMIN ACCEPT STATUS CHANGED TO 'COMPLETED'
-- 7. ADMIN REJECT STATUS CHANGED TO 'REJECTED'

CREATE SEQUENCE service_id_seq
START WITH 100
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;

CREATE TABLE assigned_staff_service_data (
    id SERIAL PRIMARY KEY,
    staff_id INT NOT NULL,
    sole_proprietorship_id INT NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by INT ,
    updated_date TIMESTAMP,
    FOREIGN KEY (sole_proprietorship_id) REFERENCES BRIS_sole_proprietorship(id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES userdata(user_id),
    FOREIGN KEY (updated_by) REFERENCES userdata(user_id)
)
CREATE TABLE BRIS_sole_proprietorship (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,   
    service_id INT NOT NULL, 
    sub_service_id INT NOT NULL, 
    mobileNo VARCHAR(15) NOT NULL,
    mailId VARCHAR(255) NOT NULL,
    periodId VARCHAR(255) NOT NULL,
    message VARCHAR(555) NOT NULL,
    fileLink VARCHAR(555) NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    status status_enum NOT NULL DEFAULT 'PENDING', -- Use ENUM type
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (sub_service_id) REFERENCES subservices(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES userdata(user_id),
    FOREIGN KEY (periodId) REFERENCES genericMasterDropdown(id)
);

-- CREATE TABLE BRIS_parternership_form (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,   
--     sub_service_id INT NOT NULL, 
--     firm_name VARCHAR(255) NOT NULL,
--     business_type VARCHAR(255) NOT NULL,
--     data_of_establishment DATE NOT NULL,
--     place_of_business VARCHAR(255) NOT NULL,
--     partnership_form VARCHAR(555) NOT NULL,
--     partnership_deed VARCHAR(555) NOT NULL,
--     affidavit_confirming_copy VARCHAR(555) NOT NULL,
--     partner_pan_card VARCHAR(555) NOT NULL,
--     partner_address_proof VARCHAR(555) NOT NULL,
--     ownership_type VARCHAR(555) NOT NULL,
--     ownership_document VARCHAR(555) NOT NULL,
--     business_address_proof VARCHAR(555) NOT NULL,
--     isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
--     status status_enum NOT NULL DEFAULT 'PENDING', -- Use ENUM type
--     created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (sub_service_id) REFERENCES subservices(id) ON DELETE CASCADE,
--     FOREIGN KEY (user_id) REFERENCES userdata(user_id)
-- );

-- CREATE TABLE BRIS_opc_registration (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,   
--     sub_service_id INT NOT NULL, 
--     address_proof VARCHAR(255) NOT NULL,
--     businidentity_proofess_type VARCHAR(255) NOT NULL,
--     noc VARCHAR(255) NOT NULL,
--     registered_office_proof VARCHAR(255) NOT NULL,
--     photograph VARCHAR(255) NOT NULL,
--     aoa VARCHAR(255) NOT NULL,
--     moa VARCHAR(255) NOT NULL,
--     director_pan_card VARCHAR(255) NOT NULL,
--     isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
--     status status_enum NOT NULL DEFAULT 'PENDING', -- Use ENUM type
--     created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (sub_service_id) REFERENCES subservices(id) ON DELETE CASCADE,
--     FOREIGN KEY (user_id) REFERENCES userdata(user_id)
-- );

CREATE TABLE mapStaffCustomer(
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    staff_id INT NOT NULL,
    service_id INT NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES userData(user_id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES userData(user_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    UNIQUE (customer_id, service_id)  -- Ensures one staff per customer per service
);


CREATE TABLE ComplianceCalender (
    id SERIAL PRIMARY KEY,
    year INT NOT NULL,
    month Varchar(255) NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
)
CREATE TABLE ComplianceCalenderData (
    id SERIAL PRIMARY KEY,
    compliance_date_id INT NOT NULL,
    date INT NOT NULL,
    complianceName VARCHAR(555) NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (compliance_date_id) REFERENCES ComplianceCalender(id) ON DELETE CASCADE,
)

-- Create the Links table
CREATE TABLE externalLinks (
    id SERIAL PRIMARY KEY,       -- Auto-incrementing primary key
    name VARCHAR(555) NOT NULL,  -- Name of the External Links
    url VARCHAR(555) NOT NULL -- URL of the External Links
);


-- Create the News Update table
CREATE TABLE newsUpdateData (
    id SERIAL PRIMARY KEY,       -- Auto-incrementing primary key
    message VARCHAR(555) NOT NULL,  -- Message Update
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE, -- 
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NOT NULL,
    updated_by INT,
    updated_date TIMESTAMP 
);