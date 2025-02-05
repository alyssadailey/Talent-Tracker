\c tracker;

INSERT INTO department(id, name)
VALUES  (1, 'IT'),
        (2, 'Shipping'),
        (3, 'Manufacturing'),
        (4, 'Sales'),
        (5, 'Legal');

INSERT INTO role (title, salary, department_id)
VALUES  ('Software Engineer', 80000, 1),
('Product Manager', 90000, 2),
('Data Analyst', 70000, 3),
('UX Designer', 75000, 2),
('DevOps Engineer', 85000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),        -- John has no manager (top-level employee)
('Jane', 'Smith', 2, 1),         -- Jane reports to John
('Emily', 'Johnson', 1, 1),      -- Emily also reports to John
('Michael', 'Brown', 3, 2),      -- Michael reports to Jane
('Sarah', 'Davis', 4, 2);        --Sarah reports to Jane
        
        