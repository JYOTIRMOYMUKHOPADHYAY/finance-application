-- Create the user_id_seq
CREATE SEQUENCE user_id_seq
START WITH 10000
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


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
CREATE TYPE status_enum AS ENUM ('APPROVED', 'REJECTED', 'PENDING');

-- Step 2: Create table using the ENUM type
CREATE TABLE BRIS_sole_proprietorship (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,   
    sub_service_id INT NOT NULL, 
    aadhar_card VARCHAR(255) NOT NULL,
    pan_card VARCHAR(255) NOT NULL,
    id_card VARCHAR(255) NOT NULL,
    bank_passbook_page VARCHAR(255) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    ifsc_code VARCHAR(20) NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    address_proof VARCHAR(255) NOT NULL,
    rental_agreement VARCHAR(255),
    noc VARCHAR(255),
    bills VARCHAR(255),
    trade_license VARCHAR(255),
    gst_number VARCHAR(50) NOT NULL,
    gst_certificate VARCHAR(255) NOT NULL,
    status status_enum NOT NULL DEFAULT 'PENDING', -- Use ENUM type
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sub_service_id) REFERENCES subservices(id) ON DELETE CASCADE
    FOREIGN KEY (user_id) REFERENCES userdata(user_id)
);

-- Step 2: Create table using the ENUM type
CREATE TABLE BRIS_parternership_form (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,   
    sub_service_id INT NOT NULL, 
    firm_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(255) NOT NULL,
    data_of_establishment DATE NOT NULL,
    place_of_business VARCHAR(255) NOT NULL,
    partnership_form VARCHAR(555) NOT NULL,
    partnership_deed VARCHAR(555) NOT NULL,
    affidavit_confirming_copy VARCHAR(555) NOT NULL,
    partner_pan_card VARCHAR(555) NOT NULL,
    partner_address_proof VARCHAR(555) NOT NULL,
    ownership_type VARCHAR(555) NOT NULL,
    ownership_document VARCHAR(555) NOT NULL,
    business_address_proof VARCHAR(555) NOT NULL,
    status status_enum NOT NULL DEFAULT 'PENDING', -- Use ENUM type
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sub_service_id) REFERENCES subservices(id) ON DELETE CASCADE
    FOREIGN KEY (user_id) REFERENCES userdata(user_id)
);