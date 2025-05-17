-- Sequence for user IDs
CREATE SEQUENCE user_id_seq
START WITH 10000
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;

-- User types
CREATE TABLE userTypes (
    userType_id SERIAL PRIMARY KEY,
    userType_name VARCHAR(100) NOT NULL UNIQUE,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_by INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- User data
CREATE TABLE userData (
    user_id INT PRIMARY KEY DEFAULT nextval('user_id_seq'),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    password VARCHAR(255) NOT NULL,
    password_salt VARCHAR(255) NOT NULL,
    phone_no VARCHAR(15) NOT NULL UNIQUE,
    userType_id INT NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    isActive BOOLEAN NOT NULL DEFAULT TRUE,
    qualification VARCHAR(555),
    experience VARCHAR(555),
    service_id INT,
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    FOREIGN KEY (userType_id) REFERENCES userTypes(userType_id),
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);
CREATE INDEX idx_userdata_userType_id ON userData(userType_id);
CREATE INDEX idx_userdata_phone_no ON userData(phone_no);

-- Services
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(555) NOT NULL,
    role_name VARCHAR(555) NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id)
);

-- Generic Master
CREATE TABLE genericMaster (
    id SERIAL PRIMARY KEY,
    name VARCHAR(555) NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id)
);

-- Generic Master Dropdown
CREATE TABLE genericMasterDropdown (
    id SERIAL PRIMARY KEY,
    master_id INT NOT NULL,
    name VARCHAR(555) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP,
    created_by INT,
    updated_by INT,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id),
    FOREIGN KEY (master_id) REFERENCES genericMaster(id)
);
CREATE INDEX idx_gmd_master_dropdown_master_id ON genericMasterDropdown(master_id);

-- Subservices
CREATE TABLE subservices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(555) NOT NULL,
    service_id INT NOT NULL,
    role_name VARCHAR(555) NOT NULL,
    periodId INT NOT NULL,
    documents_required JSONB,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id),
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (periodId) REFERENCES genericMasterDropdown(id)
);
CREATE INDEX idx_subservices_service_id ON subservices(service_id);
CREATE INDEX idx_subservices_periodId ON subservices(periodId);

-- Apply to Job
CREATE TABLE applyToJob (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_no VARCHAR(15) NOT NULL,
    experience VARCHAR(555) NOT NULL,
    current_location VARCHAR(555) NOT NULL,
    user_type INT NOT NULL,
    agreement BOOLEAN NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT now(),
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(255),
    filePath VARCHAR(555) NOT NULL,
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id),
    FOREIGN KEY (user_type) REFERENCES userTypes(userType_id) ON DELETE CASCADE
);
CREATE INDEX idx_applyToJob_user_type ON applyToJob(user_type);

-- Get In Touch
CREATE TABLE getInTouch (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_no VARCHAR(15) NOT NULL,
    required_service INT NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    message VARCHAR(555),
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id),
    FOREIGN KEY (required_service) REFERENCES services(id) ON DELETE CASCADE
);
CREATE INDEX idx_getInTouch_required_service ON getInTouch(required_service);

-- ENUM for status
CREATE TYPE status_enum AS ENUM ('PENDING', 'ASSIGNED', 'ACCEPTED', 'SUBMITTED', 'COMPLETED', 'REJECTED', 'VERIFIED');

-- Sequence for services (if needed separately)
CREATE SEQUENCE service_id_seq
START WITH 100
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;

-- Service Request
CREATE TABLE serviceRequest (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    sub_service_id INT NOT NULL,
    mobileNo VARCHAR(15) NOT NULL,
    mailId VARCHAR(255) NOT NULL,
    periodId INT NOT NULL,
    message VARCHAR(555) NOT NULL,
    fileLink VARCHAR(555) NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    status status_enum NOT NULL DEFAULT 'PENDING',
    created_date TIMESTAMP NOT NULL DEFAULT now(),
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id),
    FOREIGN KEY (user_id) REFERENCES userData(user_id),
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (sub_service_id) REFERENCES subservices(id) ON DELETE CASCADE,
    FOREIGN KEY (periodId) REFERENCES genericMasterDropdown(id)
);
CREATE INDEX idx_serviceRequest_user_id ON serviceRequest(user_id);
CREATE INDEX idx_serviceRequest_service_id ON serviceRequest(service_id);
CREATE INDEX idx_serviceRequest_sub_service_id ON serviceRequest(sub_service_id);
CREATE INDEX idx_serviceRequest_status ON serviceRequest(status);

-- Staff Assigned to Customer Data
CREATE TABLE assignedStaffToCustomerData (
    id SERIAL PRIMARY KEY,
    staff_id INT NOT NULL,
    service_request_id INT NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_date TIMESTAMP NOT NULL DEFAULT now(),
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id),
    FOREIGN KEY (service_request_id) REFERENCES serviceRequest(id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES userData(user_id)
);
CREATE INDEX idx_assigned_staff_service_data_staff_id ON assignedStaffToCustomerData(staff_id);
CREATE INDEX idx_assigned_staff_service_data_service_request_id ON assignedStaffToCustomerData(service_request_id);

-- Staff-Customer Mapping
CREATE TABLE staffCustomerMapping (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    staff_id INT NOT NULL,
    service_id INT NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_date TIMESTAMP NOT NULL DEFAULT now(),
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id),
    FOREIGN KEY (customer_id) REFERENCES userData(user_id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES userData(user_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    UNIQUE (customer_id, service_id, id)
);
CREATE INDEX idx_staffCustomerMapping_customer_id ON staffCustomerMapping(customer_id);
CREATE INDEX idx_staffCustomerMapping_staff_id ON staffCustomerMapping(staff_id);
CREATE INDEX idx_staffCustomerMapping_service_id ON staffCustomerMapping(service_id);

-- Compliance Calendar Timeline
CREATE TABLE ComplianceCalenderTimeline (
    id SERIAL PRIMARY KEY,
    year INT NOT NULL,
    month VARCHAR(255) NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    created_date TIMESTAMP NOT NULL DEFAULT now(),
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id)
);

-- Compliance Calendar Data
CREATE TABLE ComplianceCalenderData (
    id SERIAL PRIMARY KEY,
    compliance_date_id INT NOT NULL,
    date INT NOT NULL,
    complianceName VARCHAR(555) NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_date TIMESTAMP NOT NULL DEFAULT now(),
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    FOREIGN KEY (compliance_date_id) REFERENCES ComplianceCalenderTimeline(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id)
);
CREATE INDEX idx_ComplianceCalenderData_compliance_date_id ON ComplianceCalenderData(compliance_date_id);

-- External Links
CREATE TABLE externalLinks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(555) NOT NULL,
    url VARCHAR(555) NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id)
);

-- News Updates
CREATE TABLE newsUpdateData (
    id SERIAL PRIMARY KEY,
    message VARCHAR(555) NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_date TIMESTAMP NOT NULL DEFAULT now(),
    created_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_by INT,
    updated_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES userData(user_id),
    FOREIGN KEY (updated_by) REFERENCES userData(user_id)
);
