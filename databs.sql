CREATE DATABASE IF NOT EXISTS `fashion_db`
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

USE `fashion_db`;

CREATE TABLE companies (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  account_type VARCHAR(50) DEFAULT 'business',
  role VARCHAR(100),
  international_key VARCHAR(10),
  phone VARCHAR(32),
  email VARCHAR(191),
  avatar_url VARCHAR(512),
  banner_url VARCHAR(512),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  industry VARCHAR(100),
  address VARCHAR(191),
  documented BOOLEAN DEFAULT FALSE,
  owner_user_id BIGINT,
  UNIQUE KEY ux_companies_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  account_type VARCHAR(50),
  role VARCHAR(100),
  gender VARCHAR(20),
  international_key VARCHAR(10),
  phone VARCHAR(32),
  email VARCHAR(191),
  password_hash VARCHAR(255),
  avatar_url VARCHAR(512),
  banner_url VARCHAR(512),
  bio TEXT,
  industry VARCHAR(100),
  address VARCHAR(191),
  age INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  company_id_belongs BIGINT NULL,
  UNIQUE KEY ux_users_email (email),
  INDEX idx_users_company (company_id_belongs),
  FOREIGN KEY (company_id_belongs) REFERENCES companies(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE skills (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN DEFAULT TRUE,
  UNIQUE KEY ux_skills_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE user_skills (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  skill_id BIGINT NOT NULL,
  years_experience INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
  INDEX idx_user_skills_user (user_id),
  INDEX idx_user_skills_skill (skill_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE posts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  user_type VARCHAR(50) DEFAULT 'user',
  title VARCHAR(255),
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FULLTEXT KEY ft_posts_title_content (title, content),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE projects (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  user_type VARCHAR(50),
  title VARCHAR(255),
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE attachments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  parent_type VARCHAR(50) NOT NULL,
  parent_id BIGINT NOT NULL,
  url VARCHAR(1024) NOT NULL,
  mime_type VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_attachments_parent (parent_type, parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE followers (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  user_type VARCHAR(50),
  target_type VARCHAR(50) NOT NULL,
  target_id BIGINT NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_follow_target (target_type, target_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE likes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  target_type VARCHAR(50) NOT NULL,
  target_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  user_type VARCHAR(50),
  value TINYINT DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_likes_target (target_type, target_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  user_type VARCHAR(50),
  parent_type VARCHAR(50) NOT NULL,
  parent_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_comments_parent (parent_type, parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE company_employees (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  company_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  position VARCHAR(100),
  salary DECIMAL(12,2) DEFAULT 0.00,
  hired_at DATETIME,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_emp_company (company_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE company_partners (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  company_id BIGINT NOT NULL,
  partner_type VARCHAR(50) NOT NULL,
  partner_id BIGINT NOT NULL,
  partnership_type VARCHAR(200),
  start_date DATETIME,
  status VARCHAR(50) DEFAULT 'active',
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_partners_company (company_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE jobs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  company_id BIGINT NOT NULL,
  title VARCHAR(255),
  description TEXT,
  publish_date DATETIME,
  updated_date DATETIME,
  status VARCHAR(50) DEFAULT 'active',
  job_type VARCHAR(50),
  work_mode VARCHAR(50),
  salary DECIMAL(12,2) DEFAULT 0.00,
  currency VARCHAR(10) DEFAULT 'SAR',
  hours_per_week INT DEFAULT 0,
  country VARCHAR(100),
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_jobs_company (company_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE job_skills (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  job_id BIGINT NOT NULL,
  skill_id BIGINT NOT NULL,
  required_level VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
  INDEX idx_job_skills_job (job_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE job_applications (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  job_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'applied',
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_app_job (job_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  company_id BIGINT NOT NULL,
  supplier_name VARCHAR(191),
  title VARCHAR(255),
  description TEXT,
  sku VARCHAR(100),
  cost_price DECIMAL(12,2) DEFAULT 0.00,
  market_price DECIMAL(12,2) DEFAULT 0.00,
  selling_price DECIMAL(12,2) DEFAULT 0.00,
  profit_amount DECIMAL(12,2) AS (selling_price - cost_price) STORED,
  profit_percent DECIMAL(5,2) AS (CASE WHEN cost_price>0 THEN ((selling_price-cost_price)/cost_price*100) ELSE NULL END) STORED,
  currency VARCHAR(10) DEFAULT 'SAR',
  available_sizes VARCHAR(191),
  stock INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_products_company (company_id),
  INDEX idx_products_sku (sku)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
