-- MySQL dump 10.17  Distrib 10.3.16-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: answeritem
-- ------------------------------------------------------
-- Server version	10.3.16-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `addid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(6) DEFAULT NULL,
  `addre` varchar(100) DEFAULT NULL,
  `addiphone` varchar(20) DEFAULT NULL,
  `addsex` varchar(50) DEFAULT NULL,
  `addname` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`addid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,1,'北京市朝阳区朝外大街1号123','15313880375','男生','lietu'),(2,1,'北京市朝阳区东三环中路7号财富中心123','15313880375','男生','123');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answeritemshop`
--

DROP TABLE IF EXISTS `answeritemshop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answeritemshop` (
  `shopid` int(6) NOT NULL AUTO_INCREMENT,
  `shopname` varchar(10) DEFAULT NULL,
  `shoptype` int(8) DEFAULT NULL,
  `shopprice` varchar(10) DEFAULT NULL,
  `shoptory` int(8) DEFAULT NULL,
  `shoppics` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`shopid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answeritemshop`
--

LOCK TABLES `answeritemshop` WRITE;
/*!40000 ALTER TABLE `answeritemshop` DISABLE KEYS */;
INSERT INTO `answeritemshop` VALUES (7,'lietu',2,'29.9',999,'1563172468621owl.png'),(8,'rongshao',2,'30',999,'1563237256052下载.jpeg'),(9,'LIETU',2,'30',999,'1563256825448下载.jpeg'),(10,'RONGSHAO',2,'999',999,'1563256842608下载.jpeg'),(11,'999',2,'999',999,'1563256857233下载.jpeg'),(12,'123545',2,'6',9999,'1563548134695userlogin.png');
/*!40000 ALTER TABLE `answeritemshop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answeritemtype`
--

DROP TABLE IF EXISTS `answeritemtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answeritemtype` (
  `typeid` int(11) NOT NULL AUTO_INCREMENT,
  `typename` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`typeid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answeritemtype`
--

LOCK TABLES `answeritemtype` WRITE;
/*!40000 ALTER TABLE `answeritemtype` DISABLE KEYS */;
INSERT INTO `answeritemtype` VALUES (2,'锁鲜装[大盒]'),(3,'锁鲜装[小盒]'),(4,'真空小包装'),(5,'礼盒'),(6,'风味酱'),(7,'夏日解暑饮品'),(8,'超开心套装');
/*!40000 ALTER TABLE `answeritemtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `ordid` int(11) NOT NULL AUTO_INCREMENT,
  `addressid` int(20) DEFAULT NULL,
  `ordersize` int(20) DEFAULT NULL,
  `shoplist` varchar(20) DEFAULT NULL,
  `orderprice` varchar(60) DEFAULT NULL,
  `userid` int(20) DEFAULT NULL,
  `status` int(6) DEFAULT NULL,
  `stores` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ordid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,7,'1563737520','209.8',1,3,'周黑鸭(关东店)'),(2,1,5,'1563771812','149.8',1,3,'周黑鸭(北京石景山区山姆店)'),(3,1,2,'1563778209','59.8',1,2,'周黑鸭(桥头大街店)');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordershaop`
--

DROP TABLE IF EXISTS `ordershaop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ordershaop` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `sname` varchar(60) DEFAULT NULL,
  `snum` int(10) DEFAULT NULL,
  `sprice` varchar(20) DEFAULT NULL,
  `shoplist` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordershaop`
--

LOCK TABLES `ordershaop` WRITE;
/*!40000 ALTER TABLE `ordershaop` DISABLE KEYS */;
INSERT INTO `ordershaop` VALUES (1,'lietu',2,'59.8','1563737520'),(2,'lietu',2,'59.8','1563737520'),(3,'lietu',2,'59.8','1563737520'),(4,'lietu',2,'59.8','1563771812'),(5,'lietu',2,'59.8','1563771812'),(6,'lietu',2,'59.8','1563771812'),(7,'lietu',2,'59.8','1563778209');
/*!40000 ALTER TABLE `ordershaop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlogin`
--

DROP TABLE IF EXISTS `userlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userlogin` (
  `useid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `useriphone` varchar(50) DEFAULT NULL,
  `userpwd` varchar(50) DEFAULT NULL,
  `sex` varchar(20) DEFAULT NULL,
  `userimage` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`useid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlogin`
--

LOCK TABLES `userlogin` WRITE;
/*!40000 ALTER TABLE `userlogin` DISABLE KEYS */;
INSERT INTO `userlogin` VALUES (1,'lietu','15313880375','rongshao','男生','1563548134695userlogin.png'),(3,'15532073925','15532073925','1234','男生','1563548134695userlogin.png');
/*!40000 ALTER TABLE `userlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vuelogin`
--

DROP TABLE IF EXISTS `vuelogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vuelogin` (
  `lid` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(20) DEFAULT NULL,
  `pwd` varchar(20) DEFAULT NULL,
  `jurisdiction` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`lid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vuelogin`
--

LOCK TABLES `vuelogin` WRITE;
/*!40000 ALTER TABLE `vuelogin` DISABLE KEYS */;
INSERT INTO `vuelogin` VALUES (1,'lietu','rongshao','admin');
/*!40000 ALTER TABLE `vuelogin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-23 15:00:41
