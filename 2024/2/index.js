const readline = require("node:readline");
const fs = require("node:fs");

let rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  crlfDelay: Infinity,
});

const reports = [];

function isReportSafe(report) {
    let lastChange;
    for (let i = 0; i < report.length - 1; i++) {
      // compare adjacents
      const dx = report[i] - report[i + 1];
      if (dx === 0) {
        return "unsafe";
      }
      if (Math.abs(dx) > 3) {
        return "unsafe";
      }
      let change;
      if (dx > 0) {
        change = "increase";
      } else {
        change = "decrease";
      }
      if (lastChange && change !== lastChange) {
        return "unsafe";
      }
      lastChange = change;
    }
    return "safe";
}

rl.on("line", (line) => {
  const levels = line.split(" ").map((level) => parseInt(level));
  reports.push(levels);
}).on("close", () => {
  // part 1 - safe/unsafe
  let safeReports = 0;
  for (const report of reports) {
    if (isReportSafe(report) === "safe") {
      safeReports++;
    }
  }

  console.log("Safe reports: ", safeReports);

  // part 2 - problem dampener
  safeReports = 0;

  for (const report of reports) {
    if (isReportSafe(report) === "safe") {
      safeReports++;
    } else {
      for (let i = 0; i < report.length; i++) {
        const modifiedReport = report.filter((_, index) => index !== i);
        if (isReportSafe(modifiedReport) === "safe") {
          safeReports++;
          break;
        }
      }
    }
  }
  
  console.log("Safe reports: ", safeReports);
});
