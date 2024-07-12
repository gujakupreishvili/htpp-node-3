const http = require("http");
const url = require("url");
const fs = require("fs/promises");
// const server = http.createServer( (req, res) => {
//   const parsedUrl = url.parse(req.url);
//   if (parsedUrl.pathname === "/html") {
//     res.setHeader("Content-Type", "text/html");
//     res.write(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Simple HTML Table</title>
//         <style>
//           table {
//             width: 50%;
//             border-collapse: collapse;
//           }
//           th, td {
//             border: 1px solid black;
//             padding: 8px;
//             text-align: left;
//           }
//           th {
//             background-color: #f2f2f2;
//           }
//         </style>
//       </head>
//       <body>
//         <h1>Simple HTML Table</h1>
//         <table>
//           <tr>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Is Teenager</th>
//           </tr>
//           <tr>
//             <td>Luka</td>
//             <td>20</td>
//             <td>No</td>
//           </tr>
//           <tr>
//             <td>Olegi</td>
//             <td>5</td>
//             <td>No</td>
//           </tr>
//           <tr>
//             <td>Aleksi</td>
//             <td>14</td>
//             <td>Yes</td>
//           </tr>
//         </table>
//       </body>
//       </html>
//     `);
//     return res.end();
//   } else if (parsedUrl.pathname === "/animals") {
//     const data = [
//       { name: "Lion", age: 5 },
//       { name: "Tiger", age: 3 },
//       { name: "Elephant", age: 10 },
//     ];
//     res.setHeader("content-type", "application/json");
//     res.write(JSON.stringify(data));
//     return res.end();
//   } else if (parsedUrl.pathname === "/time") {
//     res.setHeader("content-type", "application/json");
//     res.write(JSON.stringify(new Date().toISOString()));
//     return res.end();
//   } else {
//     res.setHeader("content-type", "application/json");
//     res.write(JSON.stringify("404 not found"));
//     return res.end();
//   }
// });

// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url);
  if (parsedUrl.pathname === "/movies") {
    try {
      const rawData = await fs.readFile("data.json", "utf-8");
      const data = JSON.parse(rawData);
      const movies = data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(movies[randomIndex]));
      return res.end();
    } catch (error) {
      res.setHeader("Content-Type", "text/plain");
      res.write("Internal Server Error");
      return res.end();
    }
  } else if (parsedUrl.pathname === "/jackpot") {
    res.setHeader("Content-Type", "text/plain");
    const randomNum = Math.floor(Math.random() * 1000);
    const jackpotNumbers = [111, 222, 333, 444, 555, 666, 777, 888, 999];
    if (jackpotNumbers.includes(randomNum)) {
      res.end(`You win the jackpot with number ${randomNum}!`);
    } else {
      res.end(`Your number is ${randomNum}. Better luck next time!`);
    }
  } else {
    res.setHeader("Content-Type", "text/plain");
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
