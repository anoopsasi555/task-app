-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Jun 16, 2024 at 11:55 AM
-- Server version: 8.4.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tasks-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Tasks`
--

CREATE TABLE `Tasks` (
  `id` int NOT NULL,
  `heading` varchar(255) NOT NULL,
  `description` text,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `priority` enum('high','medium','low') NOT NULL DEFAULT 'medium',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Tasks`
--

INSERT INTO `Tasks` (`id`, `heading`, `description`, `date`, `time`, `image`, `priority`, `createdAt`, `updatedAt`) VALUES
(24, 'Start Morning Jogging Routine', 'Begin a daily morning jogging routine to improve overall fitness and mental well-being. Start with a 10-minute warm-up, followed by a 20-minute jog around the neighborhood. Track progress with a fitness app and gradually increase the duration and intensity over time', '2024-07-01', '05:45:00', 'uploads/1718534886524-jogging.png', 'medium', '2024-06-16 10:48:06', '2024-06-16 10:48:06'),
(25, 'Complete Pending Work Tasks', 'Dedicate time to address and complete all pending work-related tasks. Prioritize the tasks based on deadlines and importance. Start with the most urgent tasks and work your way down the list. Ensure to update your task manager or project management tool to reflect the completed tasks.', '2024-06-19', '20:00:00', 'uploads/1718535115365-pending.jpeg', 'high', '2024-06-16 10:51:55', '2024-06-16 10:51:55'),
(26, 'Participate in Online Programming Contest', 'Register for an online programming contest such as Codeforces or TopCoder. Prepare by reviewing past contest problems and practicing under timed conditions. During the contest, manage your time effectively and focus on solving as many problems as possible. Analyze the contest solutions afterward to learn new techniques.', '2024-06-22', '21:58:00', 'uploads/1718535233015-solving.png', 'medium', '2024-06-16 10:53:53', '2024-06-16 11:11:14'),
(27, 'Arrange Team Meeting', 'Organize a team meeting to discuss project updates and future plans. Send out calendar invites to all team members and prepare an agenda highlighting key discussion points. Ensure the meeting room is booked or set up the virtual meeting link. Follow up with an email summarizing the meeting minutes and action items.', '2024-06-25', '12:30:00', 'uploads/1718535345018-meeting.jpg', 'low', '2024-06-16 10:55:45', '2024-06-16 10:55:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Tasks`
--
ALTER TABLE `Tasks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tasks_heading` (`heading`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Tasks`
--
ALTER TABLE `Tasks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
