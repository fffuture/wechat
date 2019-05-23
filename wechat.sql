/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : wechat

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2019-05-11 01:54:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `friendlist`
-- ----------------------------
DROP TABLE IF EXISTS `friendlist`;
CREATE TABLE `friendlist` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `weChatId` varchar(50) NOT NULL,
  `friendWeChatId` varchar(50) DEFAULT NULL,
  `remarks` varchar(50) DEFAULT NULL,
  `source` varchar(50) DEFAULT NULL,
  `tag` varchar(50) DEFAULT NULL,
  `descript` varchar(50) DEFAULT NULL,
  `addTime` datetime DEFAULT NULL,
  `addsuccess` double(1,0) DEFAULT NULL,
  `friend` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of friendlist
-- ----------------------------
INSERT INTO `friendlist` VALUES ('81', 'admin1', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('83', 'admin', 'admin1', '陈admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('84', 'admin3', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('85', 'admin', 'admin3', '黑色', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('86', 'admin2', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('87', 'admin', 'admin2', '黑admin2', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('88', 'admin4', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('89', 'admin', 'admin4', '知admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('90', 'admin5', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('91', 'admin', 'admin5', '网admin5', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('92', 'admin6', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('93', 'admin', 'admin6', '白admin6', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('94', 'admin7', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('95', 'admin', 'admin7', '可admin7', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('96', 'admin8', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('97', 'admin', 'admin8', 'admin8', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('98', 'admin9', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('99', 'admin', 'admin9', 'admin9', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('100', 'admin10', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('101', 'admin', 'admin10', '阿dmin10', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('102', 'admin11', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('103', 'admin', 'admin11', '吖min11', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('104', 'admin12', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('105', 'admin', 'admin12', '先admin12', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('106', 'admin13', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('107', 'admin', 'admin13', '局长min13', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('108', 'admin14', 'admin', 'admin', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('110', 'admin', 'admin14', '局长admin14', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('111', 'admin3', 'admin2', 'admin2', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('112', 'admin2', 'admin3', 'admin3', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('113', 'admin5', 'admin3', 'admin3', null, null, null, null, null, 'friend');
INSERT INTO `friendlist` VALUES ('114', 'admin3', 'admin5', 'admin5', null, null, null, null, null, 'friend');

-- ----------------------------
-- Table structure for `group`
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `notice` varchar(100) DEFAULT NULL,
  `creator` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group
-- ----------------------------
INSERT INTO `group` VALUES ('1', '测试讨论组', '测试公告', '123');
INSERT INTO `group` VALUES ('18', '群聊', null, 'adminSat May 11 2019 01:49:32 GMT+0800 (中国标准时间)');
INSERT INTO `group` VALUES ('19', '群聊', null, 'adminSat May 11 2019 01:51:55 GMT+0800 (中国标准时间)');

-- ----------------------------
-- Table structure for `grouplist`
-- ----------------------------
DROP TABLE IF EXISTS `grouplist`;
CREATE TABLE `grouplist` (
  `groupId` int(10) NOT NULL DEFAULT '0',
  `member` varchar(20) NOT NULL DEFAULT '',
  `remarks` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`groupId`,`member`),
  KEY `member` (`member`),
  CONSTRAINT `grouplist_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `group` (`Id`),
  CONSTRAINT `grouplist_ibfk_2` FOREIGN KEY (`member`) REFERENCES `wechatuser` (`weChatId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of grouplist
-- ----------------------------
INSERT INTO `grouplist` VALUES ('1', 'admin', null);
INSERT INTO `grouplist` VALUES ('1', 'admin1', null);
INSERT INTO `grouplist` VALUES ('1', 'admin2', null);
INSERT INTO `grouplist` VALUES ('18', 'admin1', null);
INSERT INTO `grouplist` VALUES ('18', 'admin2', null);
INSERT INTO `grouplist` VALUES ('18', 'admin6', null);
INSERT INTO `grouplist` VALUES ('18', 'admin9', null);
INSERT INTO `grouplist` VALUES ('19', 'admin', null);
INSERT INTO `grouplist` VALUES ('19', 'admin11', null);
INSERT INTO `grouplist` VALUES ('19', 'admin4', null);

-- ----------------------------
-- Table structure for `wechatuser`
-- ----------------------------
DROP TABLE IF EXISTS `wechatuser`;
CREATE TABLE `wechatuser` (
  `weChatId` varchar(50) NOT NULL,
  `weChatName` varchar(50) DEFAULT NULL,
  `imgURL` varchar(255) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `sex` double(1,0) DEFAULT NULL,
  PRIMARY KEY (`weChatId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wechatuser
-- ----------------------------
INSERT INTO `wechatuser` VALUES ('admin', 'admin', 'http://123.207.3.64/wechat/assets/touxiang1.jpg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin1', '我是admin1', 'http://123.207.3.64/wechat/assets/otherImg.jpg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin10', 'admin10', 'http://123.207.3.64/wechat/assets/touxiang2.jpg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin11', 'admin11', 'http://123.207.3.64/wechat/assets/touxiang.jpeg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin12', 'admin12', 'http://123.207.3.64/wechat/assets/touxiang.jpeg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin13', 'admin13', 'http://123.207.3.64/wechat/assets/touxiang1.jpg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin14', 'admin14', 'http://123.207.3.64/wechat/assets/touxiang.jpeg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin2', 'admin2', 'http://123.207.3.64/wechat/assets/touxiang2.jpg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin3', 'admin3', 'http://123.207.3.64/wechat/assets/touxiang.jpeg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin4', 'admin4', 'http://123.207.3.64/wechat/assets/touxiang.jpeg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin5', 'admin5', 'http://123.207.3.64/wechat/assets/touxiang1.jpg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin6', 'admin6', 'http://123.207.3.64/wechat/assets/touxiang.jpeg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin7', 'admin7', 'http://123.207.3.64/wechat/assets/touxiang.jpeg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin8', 'admin8', 'http://123.207.3.64/wechat/assets/touxiang2.jpg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
INSERT INTO `wechatuser` VALUES ('admin9', 'admin9', 'http://123.207.3.64/wechat/assets/touxiang.jpeg', 'C3B39CBF74E996B87F53844FBC46F0DC', null);
