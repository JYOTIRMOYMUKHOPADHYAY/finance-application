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

-- Create the forgoPassword table
CREATE TABLE forgoPassword (
    id SERIAL PRIMARY KEY,
    phone_no VARCHAR(15) NOT NULL,
    old_password VARCHAR(255) NOT NULL,
    old_password_salt VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    otp VARCHAR(6) NOT NULL,
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expired_at TIMESTAMP NOT NULL,
    updated_by INT,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userType_id) REFERENCES userTypes(userType_id)
);

-- Create the services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,       -- Auto-incrementing primary key
    name VARCHAR(555) NOT NULL,  -- Name of the service
    role_name VARCHAR(555) NOT NULL -- Role name for the service
);

-- Create the subservices table
CREATE TABLE subservices (
    id SERIAL PRIMARY KEY,       -- Auto-incrementing primary key
    name VARCHAR(555) NOT NULL,  -- Name of the subservice
    service_id INT NOT NULL,     -- Foreign key referencing the services table
    role_name VARCHAR(555) NOT NULL, -- Role name for the subservice
    CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE
);