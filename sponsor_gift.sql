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
VALUES ('Google', 'https://drive.google.com/uc?export=view&id=10U2mJOoSpF0IbkxPTlZ9y_Mhox52I6t1'),
       ('Amazon', 'https://drive.google.com/uc?export=view&id=10QuuPkUU3-yTN7L6PI7bMX9znNtKaRY4'),
       ('AWS', 'https://drive.google.com/uc?export=view&id=1WkTwsPva-BwsHaqM9_Gf0GS-jkvaHqwL'),
       ('Meta', 'https://drive.google.com/uc?export=view&id=1WBRA3Nr-3oL9pABb6CTTljNWn2oD1GZK'),
       ('Netflix', 'https://drive.google.com/uc?export=view&id=1WGs5hUOICkDZgfLAiPxe4ceRrIGCTGJL');

-- 创建 gifts 表
CREATE TABLE gifts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sponsor_id INT,
    gift_name VARCHAR(255) NOT NULL,
    description TEXT,
    logo VARCHAR(255),
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