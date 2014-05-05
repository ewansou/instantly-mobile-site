-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.12-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for instantly
CREATE DATABASE IF NOT EXISTS `instantly` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `instantly`;


-- Dumping structure for table instantly.image
CREATE TABLE IF NOT EXISTS `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `caption` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `url` varchar(100) COLLATE utf8_bin NOT NULL,
  `created_time` datetime NOT NULL,
  `isShowed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Dumping data for table instantly.image: ~5 rows (approximately)
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` (`id`, `username`, `caption`, `url`, `created_time`, `isShowed`) VALUES
	(30, 'instantly-mobile', 'instantly-mobile', 'http://mobile-instantly.s3-website-ap-southeast-1.amazonaws.com/9196-7fctkj.png', '2014-05-05 17:34:41', 1),
	(31, 'instantly-mobile', 'instantly-mobile', 'http://mobile-instantly.s3-website-ap-southeast-1.amazonaws.com/8708-y5jbgs.png', '2014-05-05 17:42:44', 0),
	(32, 'instantly-mobile', 'instantly-mobile', 'http://mobile-instantly.s3-website-ap-southeast-1.amazonaws.com/8708-15eq7dm.jpg', '2014-05-05 17:44:12', 0),
	(33, 'instantly-mobile', 'instantly-mobile', 'http://mobile-instantly.s3-website-ap-southeast-1.amazonaws.com/8708-10uc1m8.png', '2014-05-05 17:44:35', 0),
	(34, 'instantly-mobile', 'instantly-mobile', 'http://mobile-instantly.s3-website-ap-southeast-1.amazonaws.com/8708-1crxsm2.jpg', '2014-05-05 17:44:49', 1);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
