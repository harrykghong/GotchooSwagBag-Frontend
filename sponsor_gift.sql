-- 创建 sponsors 表
-- create database Sponsor_info; 
USE Sponsor_info;
drop table if exists gifts;
drop table if exists sponsors;
#drop table if exists gifts;

CREATE TABLE sponsors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    logo VARCHAR(255) -- 可以存放logo的链接或路径
);

-- 插入几个示例数据
INSERT INTO sponsors (name, logo)
VALUES ('Google', 'path/to/google/logo.png'),
       ('Amazon', 'path/to/amazon/logo.png'),
       ('Meta', 'path/to/meta/logo.png'),
       ('Netflix', 'path/to/netflix/logo.png');

-- 创建 gifts 表
CREATE TABLE gifts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sponsor_id INT,
    gift_name VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (sponsor_id) REFERENCES sponsors(id)
);

-- 插入几个示例数据
INSERT INTO gifts (sponsor_id, gift_name, description)
VALUES (1, 'Mug', 'A Google-branded mug'),
       (1, 'Backpack', 'A Google-branded backpack'),
       (2, 'Amazon Prime Membership', '3 months of Amazon Prime for Students'),
       (2, 'Book', 'A best-seller from Amazon'),
       (3, 'Meta VR Headset', 'A VR headset from Meta'),
       (4, 'Netflix Membership', '6 months of free Netflix subscription');

/*
SELECT gift_name, description
FROM gifts
WHERE sponsor_id = (SELECT id FROM sponsors WHERE name = 'Google');

*/