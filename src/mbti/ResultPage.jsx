// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";
// import "./MbtiPage.css";

// // Chart.js 등록
// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale
// );

// const ResultPage = ({ result, dogName, answers }) => {
//   const handleExit = () => {
//     window.location.href = "https://www.example.com";
//   };

//   // MBTI 데이터 계산
//   const totalAnswers = answers.length;
//   const mbtiCounts = {
//     I: answers.filter((answer) => answer === "I").length,
//     E: answers.filter((answer) => answer === "E").length,
//     S: answers.filter((answer) => answer === "S").length,
//     N: answers.filter((answer) => answer === "N").length,
//     T: answers.filter((answer) => answer === "T").length,
//     F: answers.filter((answer) => answer === "F").length,
//     J: answers.filter((answer) => answer === "J").length,
//     P: answers.filter((answer) => answer === "P").length,
//   };

//   const percentage = (count) =>
//     totalAnswers === 0 ? 0 : (count / totalAnswers) * 100;

//   // 막대 그래프 데이터 준비
//   const data = {
//     labels: ["I vs E", "S vs N", "F vs T", "P vs J"],
//     datasets: [
//       {
//         label: "MBTI Result",
//         data: [
//           percentage(mbtiCounts.I) - percentage(mbtiCounts.E),
//           percentage(mbtiCounts.S) - percentage(mbtiCounts.N),
//           percentage(mbtiCounts.F) - percentage(mbtiCounts.T),
//           percentage(mbtiCounts.P) - percentage(mbtiCounts.J),
//         ],
//         backgroundColor: ["#FFCE56", "#FF6384", "#36A2EB", "#4BC0C0"],
//         borderColor: ["#F1C40F", "#F06292", "#36A2EB", "#4BC0C0"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // 막대 그래프 옵션
//   const options = {
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: (context) => {
//             const label = context.label || "";
//             const value = context.raw.toFixed(2);
//             return `${label}: ${value}%`;
//           },
//         },
//       },
//       legend: {
//         position: "bottom",
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="mbtiBody">
//       <div className="ResultOutBox">
//         <div className="ResultInBox">
//           <div className="ResultTitle">
//             <h1>우리 집 강아지 {dogName}는!</h1>
//           </div>
//           <div className="ResultPic"></div>
//           <div className="ResultMbti">
//             <p>{result}</p>
//           </div>
//           <div style={{ width: "800px", height: "400px" }}>
//             <Bar data={data} options={options} />
//           </div>
//           <button className="ResultButton" onClick={handleExit}>
//             종료하기
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultPage;
