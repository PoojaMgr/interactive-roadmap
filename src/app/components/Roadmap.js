"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "motion/react"; // Import Motion One
import "react-toastify/dist/ReactToastify.css";
import { default as styles } from "../styles/Roadmap.module.css";

const Roadmap = () => {
  const [progress, setProgress] = useState(0);

  const handleLessonClick = (lessonIndex, lesson) => {
    toast.info(`Navigating to ${lesson.title}`, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setProgress(lessonIndex + 1);
    localStorage.setItem("lessonProgress", lessonIndex + 1);
  };

  useEffect(() => {
    const savedProgress = localStorage.getItem("lessonProgress");
    if (savedProgress) {
      setProgress(parseInt(savedProgress));
    }
  }, []);

  const lessons = [
    { id: 1, title: "Introduction to Python" },
    { id: 2, title: "Installing Python" },
    { id: 3, title: "Data Types in Python" },
    { id: 4, title: "Operators in Python" },
    { id: 5, title: "Input and Output" },
    { id: 6, title: "Python Control Statements" },
  ];

  const circlePositions = [
    { cx: 150, cy: 150 },
    { cx: 250, cy: 250 },
    { cx: 150, cy: 350 },
    { cx: 250, cy: 450 },
    { cx: 150, cy: 550 },
    { cx: 50, cy: 500 },
  ];

  return (
    <div className={styles.roadmapContainer}>
      <ToastContainer />
      <div className={styles.roadmap}>
        <svg
          width="300"
          height="700"
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

          <motion.path
            d="M50 500 L150 550 L250 450 L150 350 L250 250 L150 150"
            stroke="#383338"
            strokeWidth="2"
            fill="none"
            // strokeLinecap="round"
            initial={{ strokeDasharray: 0, strokeDashoffset: 50 }}
            animate={{
              strokeDasharray: progress > 0 ? "0, 0" : "0, 50",
              strokeDashoffset: progress > 0 ? 0 : 50,
            }}
            transition={{ duration: 0.5 }}
          />

          {lessons.map((lesson, index) => (
            <g key={lesson.id}>
              <motion.circle
                cx={circlePositions[index].cx}
                cy={circlePositions[index].cy}
                r="20"
                fill={index < progress ? "#7E51FF" : "#232328"}
                stroke={index < progress ? "white" : "#3c373c"}
                strokeWidth="4"
                onClick={() => handleLessonClick(index, lesson)}
                aria-label={`Go to ${lesson.title}`}
                initial={{ scale: 1 }}
                animate={{ scale: index < progress ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.text
                x={circlePositions[index].cx}
                y={circlePositions[index].cy + 40}
                fontSize="14"
                fill="white"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {lesson.title.split(" ").map((word, i) => (
                  <tspan
                    key={i}
                    x={circlePositions[index].cx}
                    dy={i === 0 ? 0 : 16}
                  >
                    {word}
                  </tspan>
                ))}
              </motion.text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Roadmap;
