UPDATE compliancecalender
SET isDeleted = TRUE
WHERE year = EXTRACT(YEAR FROM (CURRENT_DATE - INTERVAL '1 month'))
  AND UPPER(month) = TO_CHAR((CURRENT_DATE - INTERVAL '1 month'), 'MON');