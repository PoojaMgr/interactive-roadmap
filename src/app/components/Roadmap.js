"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "motion/react"; // Import Motion One
import "react-toastify/dist/ReactToastify.css";
import { default as styles } from "../styles/Roadmap.module.css";

const Roadmap = () => {
  const [progress, setProgress] = useState(0);
  const [neonLines, setNeonLines] = useState(new Set()); // Initialize neonLines state as a Set to track clicked lines

  // Handle lesson click (Toast + Progress Update)
  const handleLessonClick = (lessonIndex) => {
    toast.info(`Navigating to Lesson ${lessonIndex + 1}`, {
      position: "top-center",
    });
    setProgress(lessonIndex + 1); // update progress when a lesson is clicked
    localStorage.setItem("lessonProgress", lessonIndex + 1); // store progress in localStorage
  };

  useEffect(() => {
    // Retrieve progress from localStorage when the component mounts
    const savedProgress = localStorage.getItem("lessonProgress");
    if (savedProgress) {
      setProgress(parseInt(savedProgress));
    }
  }, []);

  const lessons = [
    { id: 1, title: "Lesson 1" },
    { id: 2, title: "Lesson 2" },
    { id: 3, title: "Lesson 3" },
    { id: 4, title: "Lesson 4" },
    { id: 5, title: "Lesson 5" },
    { id: 6, title: "Lesson 6" },
  ];

  // Circle positions based on the updated inverted path
  const circlePositions = [
    { cx: 50, cy: 500 },
    { cx: 150, cy: 550 },
    { cx: 250, cy: 450 },
    { cx: 150, cy: 350 },
    { cx: 250, cy: 250 },
    { cx: 150, cy: 150 },
  ];

  return (
    <div className={styles.roadmapContainer}>
      <ToastContainer />
      <div className={styles.roadmap}>
        <svg
          width="300"
          height="600"
          viewBox="0 0 300 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="neonGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FF416C" />
              <stop offset="50%" stopColor="#7E51FF" />
              <stop offset="100%" stopColor="#2B65F9" />
            </linearGradient>

            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="5"
                floodColor="#FF416C"
              />
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="10"
                floodColor="#7E51FF"
              />
            </filter>
          </defs>

          {/* Neon Zigzag Path rotated 180 degrees */}
          <motion.path
            d="M50 500 L150 550 L250 450 L150 350 L250 250 L150 150"
            stroke="url(#neonGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            filter={neonLines.size > 0 ? "url(#neonGlow)" : "none"} // Apply glow if any line clicked
            initial={{ strokeDasharray: 0, strokeDashoffset: 50 }}
            animate={{
              strokeDasharray: progress > 0 ? "0, 0" : "0, 50",
              strokeDashoffset: progress > 0 ? 0 : 50,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Roadmap Circles (Nodes) */}
          {lessons.map((lesson, index) => (
            <g key={lesson.id}>
              <motion.circle
                cx={circlePositions[index].cx}
                cy={circlePositions[index].cy}
                r="20"
                fill={index < progress ? "#7E51FF" : "#FF416C"}
                stroke="white"
                strokeWidth="3"
                onClick={() => handleLessonClick(index)}
                aria-label={`Go to ${lesson.title}`}
                initial={{ scale: 1 }}
                animate={{ scale: index < progress ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.text
                x={circlePositions[index].cx}
                y={circlePositions[index].cy + 20} // Positioning the text below the circle
                fontSize="14"
                fill="white"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {lesson.title}
              </motion.text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Roadmap;
