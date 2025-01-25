
INSERT INTO services (name, role_name) VALUES
('Business Registration and Incorporation Services', 'business_registration_and_incorporation_services'),
('Finance & Accounting Outsourcing Services', 'finance_and_accounting_outsourcing_services'),
('Income Tax', 'income_tax'),
('Goods & Services Tax', 'goods_and_services_tax'),
('TDS & TCS', 'tds_and_tcs'),
('Company Secretary & ROC Compliance Services', 'company_secretary_and_roc_compliance_services'),
('HR Payroll Outsourcing and Labour Compliances', 'hr_payroll_outsourcing_and_labour_compliances'),
('Other Services', 'other_services');


-- Insert subservices for "Business Registration and Incorporation Services"
INSERT INTO subservices (name, service_id, role_name) VALUES
('Sole Proprietorship', 1, 'sole_proprietorship'),
('Partnership Firm', 1, 'partnership_firm'),
('One Person Company', 1, 'one_person_company'),
('Private Limited Company', 1, 'private_limited_company'),
('Limited Liability Partnership', 1, 'limited_liability_partnership'),
('Producer Company', 1, 'producer_company'),
('Trust Registration', 1, 'trust_registration'),
('Nidhi Company', 1, 'nidhi_company'),
('Startup India Registration', 1, 'startup_india_registration');

-- Insert subservices for "Finance & Accounting Outsourcing Services"
INSERT INTO subservices (name, service_id, role_name) VALUES
('Accounts Payable', 2, 'accounts_payable'),
('Accounts Receivable', 2, 'accounts_receivable'),
('Cash, Bank Entry and BRS', 2, 'cash_bank_entry_and_brs'),
('Inventory Reports', 2, 'inventory_reports'),
('Company Budgets', 2, 'company_budgets'),
('Financial Reporting and MIS', 2, 'financial_reporting_and_mis');

-- Insert subservices for "Income Tax"
INSERT INTO subservices (name, service_id, role_name) VALUES
('PAN Registration and Amendment', 3, 'pan_registration_and_amendment'),
('ITR Filing – Individual', 3, 'itr_filing_individual'),
('ITR Filing – Non Individual', 3, 'itr_filing_non_individual'),
('Business Tax Filing-Tax Audit Filing', 3, 'business_tax_filing_tax_audit_filing'),
('Preparation of Assessment Documentation', 3, 'preparation_of_assessment_documentation'),
('Income Tax Notice Handling', 3, 'income_tax_notice_handling');

-- Insert subservices for "Goods & Services Tax"
INSERT INTO subservices (name, service_id, role_name) VALUES
('GST Registration', 4, 'gst_registration'),
('GST Amendment', 4, 'gst_amendment'),
('Revocation of GST Registration Cancellation', 4, 'revocation_of_gst_registration_cancellation'),
('Filing of Regular Returns', 4, 'filing_of_regular_returns'),
('GST Reconciliation', 4, 'gst_reconciliation'),
('Filing of Annual Returns', 4, 'filing_of_annual_returns'),
('Refunds', 4, 'refunds'),
('Handling of Notices', 4, 'handling_of_notices'),
('Preparation of Assessment Documents', 4, 'preparation_of_assessment_documents');

-- Insert subservices for "TDS & TCS"
INSERT INTO subservices (name, service_id, role_name) VALUES
('TAN Registration and Amendment', 5, 'tan_registration_and_amendment'),
('Filing of TDS Return', 5, 'filing_of_tds_return'),
('Filing of TCS Returns', 5, 'filing_of_tcs_returns'),
('Revision/Correction of TDS/TCS Returns', 5, 'revision_correction_of_tds_tcs_returns');

-- Insert subservices for "Company Secretary & ROC Compliance Services"
INSERT INTO subservices (name, service_id, role_name) VALUES
('Digital Signature Certificate (DSC)', 6, 'digital_signature_certificate_dsc'),
('DIN Number', 6, 'din_number'),
('Board Report', 6, 'board_report'),
('Maintain Minutes of Meeting', 6, 'maintain_minutes_of_meeting'),
('Investment Related Compliances', 6, 'investment_related_compliances'),
('Director Compliances', 6, 'director_compliances'),
('Drafting Notices', 6, 'drafting_notices'),
('Annual ROC Filing', 6, 'annual_roc_filing');

-- Insert subservices for "HR Payroll Outsourcing and Labour Compliances"
INSERT INTO subservices (name, service_id, role_name) VALUES
('HR & Payroll', 7, 'hr_and_payroll'),
('Payslips & Form 16', 7, 'payslips_and_form_16'),
('PF Registration', 7, 'pf_registration'),
('ESI Registration', 7, 'esi_registration'),
('Professional Tax Registration', 7, 'professional_tax_registration'),
('PF Return Filing', 7, 'pf_return_filing'),
('ESI Return Filing', 7, 'esi_return_filing'),
('Professional Tax Return Filing', 7, 'professional_tax_return_filing');

-- Insert subservices for "Other Services"
INSERT INTO subservices (name, service_id, role_name) VALUES
('Certification Services', 8, 'certification_services'),
('Preparing Project Reports', 8, 'preparing_project_reports'),
('Assistance in Obtaining Export Benefits', 8, 'assistance_in_obtaining_export_benefits');

