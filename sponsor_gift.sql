-- 创建 sponsors 表
-- create database Sponsor_info;
USE Sponsor_info;
drop table if exists physical_gifts;
drop table if exists digital_gifts;
drop table if exists gifts;
drop table if exists sponsors;
drop table if exists host;
drop table if exists shipping_information;
drop table if exists attendee;

CREATE TABLE sponsors (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL UNIQUE,
   logo VARCHAR(255) -- 可以存放logo的链接或路径
);

-- 父表 gifts
CREATE TABLE gifts (
   id INT AUTO_INCREMENT PRIMARY KEY,
   sponsor_id INT,
   gift_name VARCHAR(255) NOT NULL,
   description TEXT,
   logo VARCHAR(255),
   gift_type ENUM('physical', 'digital') NOT NULL,  -- 新增字段区分礼物类型
   redeem_link TEXT,
   FOREIGN KEY (sponsor_id) REFERENCES sponsors(id)
);


create table host(
   host_id INT AUTO_INCREMENT PRIMARY KEY,
   conference_name VARCHAR(255) not null,
   picture_link VARCHAR(255)
);


-- 创建 attendee 表
CREATE TABLE attendee (
   attendee_id INT AUTO_INCREMENT PRIMARY KEY,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL,
   phone_number VARCHAR(20),
   email_address VARCHAR(255) UNIQUE NOT NULL
);


-- 创建 shipping_information 表
CREATE TABLE shipping_information (
   attendee_id INT,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL,
   address1 VARCHAR(255) NOT NULL,
   address2 VARCHAR(255),
   city VARCHAR(255) NOT NULL,
   which_state VARCHAR(255) NOT NULL,
   zip VARCHAR(5) NOT NULL,
   country VARCHAR(255) DEFAULT 'US',
   FOREIGN KEY (attendee_id) REFERENCES attendee(attendee_id)
);


-- 插入几个示例数据
INSERT INTO sponsors (name, logo)
VALUES ('Google', 'https://drive.google.com/uc?export=view&id=1dI1gqRqHotIqHopn8tSCC13iYDurvM-C'),
      ('Amazon', 'https://drive.google.com/uc?export=view&id=10QuuPkUU3-yTN7L6PI7bMX9znNtKaRY4'),
      ('Apple', 'https://drive.google.com/uc?export=view&id=16F9D--V8w1dHZLwEUGRJYpeaFq-EpH10'),
      ('Meta', 'https://drive.google.com/uc?export=view&id=1WBRA3Nr-3oL9pABb6CTTljNWn2oD1GZK'),
      ('Netflix', 'https://drive.google.com/uc?export=view&id=1WGs5hUOICkDZgfLAiPxe4ceRrIGCTGJL');
    

-- 插入几个示例数据
INSERT INTO gifts (sponsor_id, gift_name, description, logo, gift_type)
VALUES (1, 'Wireless Charger', 'FREE Google PowerCore 10K Portable Charger', 'https://drive.google.com/uc?export=view&id=1hMuSnBi07pSsJgmn0wj_ISoHCCgxzUT3', 'physical'),
      (2, 'Meta Quest 3', 'Free Quest 3', 'https://drive.google.com/uc?export=view&id=12M8XD8DfzoA5z7XyRdW5-Ad9zollXgm5','physical'),
      (4, 'JanSport Backpack', '50% OFF your JanSport Backpack Provided by Meta', 'https://drive.google.com/uc?export=view&id=1OaLdFc95hzt4T_e1u8LuQJUZ1aNAiUIB','physical');


INSERT INTO gifts (sponsor_id, gift_name, description, logo, redeem_link, gift_type)
VALUES (2, 'Amazon Prime', '3 months of Amazon Prime for Students', 'https://drive.google.com/uc?export=view&id=1H3O9ZRS3jn5ysGC-8hhSKUI_blSK0xb6', 'https://www.amazon.com/amazonprime?tag=googhydr-20&hvadid=550213431242&hvpos=&hvexid=&hvnetw=g&hvrand=14802087175486172389&hvpone=&hvptwo=&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9031531&hvtargid=kwd-3151046130&ref=pd_sl_34qfrygf2i_e', 'digital'),
		(5, 'Netflix Membership', '1 month free membership on Netflix', 'https://drive.google.com/uc?export=view&id=1iSAgGxC-OxVU7ZGAMbSvgf_2RpzsbxER', 'https://www.netflix.com/signup', 'digital'),
		(3, 'Apple Music Membership', '12 month free membership on Apple music', 'https://drive.google.com/uc?export=view&id=1MBfRLR0DQrI0HhIfCAD_Iu3Lf1dwkhXt', 'https://www.apple.com/apple-music/', 'digital');

INSERT INTO host (conference_name, picture_link)
VALUES ('UCI ICS Conference','https://drive.google.com/uc?export=view&id=1WVgNCp2oKAeoiH7Fl7mt9cJHYYOYMcjn');


-- -- 插入一个物理礼物示例数据
-- INSERT INTO gifts (sponsor_id, gift_name, description, logo, gift_type)
-- VALUES (1, 'Wireless Charger', 'FREE Google PowerCore 10K Portable Charger', 'https://drive.google.com/uc?export=view&id=1hMuSnBi07pSsJgmn0wj_ISoHCCgxzUT3', 'physical');


-- -- 获取刚插入的gift ID
-- SET @last_gift_id = LAST_INSERT_ID();


-- -- 插入物理礼物的特定信息
-- INSERT INTO physical_gifts (gift_id, shipping_details, weight)
-- VALUES (@last_gift_id, 'Ships in 3-5 business days.', 0.5);


-- -- 插入一个数字礼物示例数据
-- INSERT INTO gifts (sponsor_id, gift_name, description, logo, gift_type)
-- VALUES (2, 'Amazon Prime for Students', '3 months of Amazon Prime for Students', 'https://drive.google.com/uc?export=view&id=1H3O9ZRS3jn5ysGC-8hhSKUI_blSK0xb6', 'digital');


-- -- 获取刚插入的gift ID
-- SET @last_gift_id = LAST_INSERT_ID();


-- -- 插入数字礼物的特定信息
-- INSERT INTO digital_gifts (gift_id, download_link, expiration_date)
-- VALUES (@last_gift_id, 'https://www.amazon.com/prime', '2024-01-01');


-- 插入 attendee 示例数据
-- INSERT INTO attendee (first_name, last_name, phone_number, email_address)
-- VALUES ('John', 'Doe', '123-456-7890', 'john.doe@example.com'),
   --    ('Jane', 'Smith', '987-654-3210', 'jane.smith@example.com'),
   --    ('Alice', 'Johnson', '555-777-8888', 'alice.johnson@example.com');


-- 插入 shipping_information 示例数据
-- INSERT INTO shipping_information (attendee_id, address_line_1, address_line_2, city, state, zip, country)
-- VALUES (1, '123 Main St', 'Apt 4B', 'Anytown', 'NY', '12345', 'US'),
--        (2, '456 Elm St', 'Suite 12A', 'Somewhere', 'CA', '98765', 'US'),
--        (3, '789 Oak St', '', 'Nowhere', 'TX', '55555', 'US');


-- select * from gifts where gift_type = "digital";
-- SELECT host.conference_name, host.picture_link
-- From host
-- SELECT gift_name, description
-- FROM gifts
-- WHERE sponsor_id = (SELECT id FROM sponsors WHERE name = 'Google');


-- SELECT gifts.logo, gifts.id, gifts.gift_name, gifts.description, sponsors.name as sponsor_name, sponsors.logo as sponsor_logo
-- FROM gifts
-- JOIN sponsors ON gifts.sponsor_id = sponsors.id where gifts.gift_type = 'physical'
