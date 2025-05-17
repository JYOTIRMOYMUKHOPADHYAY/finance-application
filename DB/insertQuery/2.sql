INSERT INTO public.usertypes (userType_id, userType_name, isDeleted, created_by, updated_by)
VALUES
  (1, 'Customer', FALSE, 1, 1),
  (2, 'Staff', FALSE, 1, 1),
  (3, 'Admin', FALSE, 1, 1),
  (4, 'Reviewer', FALSE, 1, 1);

    INSERT INTO userData (
    name,
    email,
    password,
    password_salt,
    phone_no,
    userType_id,
    isDeleted,
    isActive,
    created_by,
    created_at,
    updated_by,
    updated_at
) VALUES (
    'Default Admin',                          -- name
    'admin@example.com',                      -- email
    'f5270304858feca9a36542a36e29e8a782d775e4fd1c09c41a668a7d57ef9d9c6e43c9f42fc61cc290a75f2ba228c5285b4995d516426715eab093220ef69497',                   -- password (hashed)
    '82deb6fb1b89c63402b7ccad8197d911',                     -- password salt
    '+917797336556',                           -- phone_no (unique)
    3,                                       -- userType_id for Admin (based on your userTypes table)
    FALSE,                                   -- isDeleted (active user)
    TRUE,                                    -- isActive (active user)
    NULL,                                    -- created_by (null for initial user)
    NOW(),                                   -- created_at
    NULL,                                    -- updated_by
    NOW()                                    -- updated_at
);

select * from userData

INSERT INTO genericMaster (name, isDeleted, created_by, created_at, updated_by, updated_at)
VALUES ('periodId', FALSE, 10000, now(), 10000, now());
SELECT * FROM public.genericmaster
ORDER BY id ASC 


INSERT INTO genericMasterDropdown (id, master_id, name, created_at, updated_at, created_by, updated_by, isDeleted) VALUES
(1, 1, 'Onetime', now(), now(), 10000, 10000, FALSE),
(2, 1, 'Monthly/Quarterly', now(), now(), 10000, 10000, FALSE),
(3, 1, 'Quarterly/Yearly', now(), now(), 10000, 10000, FALSE),
(6, 1, 'Monthly', now(), now(), 10000, 10000, FALSE),
(7, 1, 'Yearly', now(), now(), 10000, 10000, FALSE),
(8, 1, 'Quarterly', now(), now(), 10000, 10000, FALSE);
SELECT * FROM public.genericMasterDropdown
ORDER BY id ASC 


SELECT * FROM public.subservices
ORDER BY id ASC 

ALTER TABLE public.subservices
ALTER COLUMN documents_required TYPE jsonb
USING to_jsonb(documents_required);

INSERT INTO subservices (name, service_id, role_name, periodId) VALUES
('Sole Proprietorship', 1, 'sole_proprietorship', 1),
('Partnership Firm', 1, 'partnership_firm', 1),
('One Person Company', 1, 'one_person_company', 1),
('Private Limited Company', 1, 'private_limited_company', 1),
('Limited Liability Partnership', 1, 'limited_liability_partnership', 1),
('Producer Company', 1, 'producer_company', 1),
('Trust Registration', 1, 'trust_registration', 1),
('Nidhi Company', 1, 'nidhi_company', 1),
('Startup India Registration', 1, 'startup_india_registration', 1),
('Accounts Payable', 2, 'accounts_payable', 6),
('Accounts Receivable', 2, 'accounts_receivable', 6),
('Cash, Bank Entry and BRS', 2, 'cash_bank_entry_and_brs', 6),
('Inventory Reports', 2, 'inventory_reports', 2),
('Company Budgets', 2, 'company_budgets', 3),
('Financial Reporting and MIS', 2, 'financial_reporting_and_mis', 3),
('PAN Registration and Amendment', 3, 'pan_registration_and_amendment', 1),
('ITR Filing – Individual', 3, 'itr_filing_individual', 7),
('ITR Filing – Non Individual', 3, 'itr_filing_non_individual', 7),
('Business Tax Filing-Tax Audit Filing', 3, 'business_tax_filing_tax_audit_filing', 7),
('Preparation of Assessment Documentation', 3, 'preparation_of_assessment_documentation', 1),
('Income Tax Notice Handling', 3, 'income_tax_notice_handling', 1),
('GST Registration', 4, 'gst_registration', 1),
('GST Amendment', 4, 'gst_amendment', 1),
('Revocation of GST Registration Cancellation', 4, 'revocation_of_gst_registration_cancellation', 1),
('Filing of Regular Returns', 4, 'filing_of_regular_returns', 2),
('GST Reconciliation', 4, 'gst_reconciliation', 7),
('Filing of Annual Returns', 4, 'filing_of_annual_returns', 7),
('Refunds', 4, 'refunds', 1),
('Handling of Notices', 4, 'handling_of_notices', 1),
('Preparation of Assessment Documents', 4, 'preparation_of_assessment_documents', 1),
('TAN Registration and Amendment', 5, 'tan_registration_and_amendment', 1),
('Filing of TDS Return', 5, 'filing_of_tds_return', 8),
('Filing of TCS Returns', 5, 'filing_of_tcs_returns', 8),
('Revision/Correction of TDS/TCS Returns', 5, 'revision_correction_of_tds_tcs_returns', 8),
('Digital Signature Certificate (DSC)', 6, 'digital_signature_certificate_dsc', 1),
('DIN Number', 6, 'din_number', 1),
('Board Report', 6, 'board_report', 8),
('Maintain Minutes of Meeting', 6, 'maintain_minutes_of_meeting', 8),
('Investment Related Compliances', 6, 'investment_related_compliances', 8),
('Director Compliances', 6, 'director_compliances', 8),
('Drafting Notices', 6, 'drafting_notices', 1),
('Annual ROC Filing', 6, 'annual_roc_filing', 1),
('HR & Payroll', 7, 'hr_and_payroll', 6),
('Payslips & Form 16', 7, 'payslips_and_form_16', 6),
('PF Registration', 7, 'pf_registration', 1),
('ESI Registration', 7, 'esi_registration', 1),
('Professional Tax Registration', 7, 'professional_tax_registration', 1),
('PF Return Filing', 7, 'pf_return_filing', 6),
('ESI Return Filing', 7, 'esi_return_filing', 6),
('Professional Tax Return Filing', 7, 'professional_tax_return_filing', 6),
('Certification Services', 8, 'certification_services', 1),
('Preparing Project Reports', 8, 'preparing_project_reports', 1),
('Assistance in Obtaining Export Benefits', 8, 'assistance_in_obtaining_export_benefits', 1);


INSERT INTO ComplianceCalenderTimeline (id, year, month, isDeleted) VALUES
(1, 2025, 'APR', false),
(2, 2025, 'MAY', false),
(3, 2025, 'JUNE', false),
(4, 2025, 'JULY', false),
(5, 2025, 'AUG', false),
(6, 2025, 'SEP', false),
(7, 2025, 'OCT', false),
(8, 2025, 'NOV', false),
(9, 2025, 'DEC', false);

SELECT * FROM ComplianceCalenderTimeline

SELECT * FROM ComplianceCalenderData

INSERT INTO ComplianceCalenderData (
    id, compliance_date_id, date, complianceName
) VALUES
(33, 2, 31, 'Due date for furnishing of statement u/s 285BA For FY 2024-25 (For Banks etc.)'),
(34, 2, 31, 'TDS Return in Form 24Q, 26Q, and 27Q for Jan-Mar 2025'),
(35, 2, 30, 'Issue of TCS Certificates in Form 27D for Jan to March 2025'),
(36, 2, 30, 'TDS Payment in Form 26QB (Property), 26QC (Rent), 26QD (Contractor Payments), 26QE (Crypto Assets) for Apr 2025'),
(37, 2, 30, 'Form 11 for FY 2024-25 for LLP''s'),
(38, 2, 25, 'GST Challan Payment if no sufficient ITC for Apr 2025 (for all Quarterly Filers) (refer GST Update)'),
(39, 2, 20, 'GSTR 3B for April 2025 (Monthly) (refer GST Update)'),
(40, 2, 15, 'Provident Fund (PF) & ESI Returns Payment for April 2025'),
(41, 2, 15, 'TCS Return in Form 27EQ for Jan-Mar 2025 Quarter'),
(42, 2, 13, 'GSTR 1 IFF (Optional) (Apr 2025) for QRMP'),
(43, 2, 11, 'GSTR 1 (Monthly) for April 2025'),
(44, 2, 10, 'Professional Tax (PT) on Salaries for April 2025. Professional Tax Due Date Varies from State to State. Kindly Contact eztax.in for Expert help.'),
(45, 2, 7, 'TDS / TCS Payment for April 2025'),
(46, 2, 31, 'Due date for filing Form 61A i.e., SFT Filing'),

(47, 3, 30, 'IEC Code Renewal'),
(48, 3, 30, 'TDS Payment in Form 26QB (Property), 26QC (Rent), 26QD (Contractor Payments), 26QE (Crypto Assets) for May 2025'),
(49, 3, 30, 'Form DPT 3 for FY 2024-25 for Companies'),
(50, 3, 25, 'GST Challan Payment if no sufficient ITC for May 2025(for all Quarterly Filers)'),
(51, 3, 20, 'GSTR 3B for May 2025(Monthly)'),
(52, 3, 15, 'Issuance of TDS Certificates Form 16/16A for Jan to March 2025'),
(53, 3, 15, 'Provident Fund (PF) & ESI Returns Payment for May 2025'),
(54, 3, 15, 'Advance tax Payment for April to June 2025 (1st Installment)'),
(55, 3, 13, 'GSTR 1 IFF (Optional) (May 2025) for QRMP'),
(56, 3, 11, 'GSTR 1 (Monthly) for May 2025'),
(57, 3, 10, 'Professional Tax (PT) on Salaries for May 2025. Professional Tax Due Date Varies from State to State. Kindly Contact eztax.in for Expert help.'),
(58, 3, 7, 'TDS / TCS Payment for May 2025');