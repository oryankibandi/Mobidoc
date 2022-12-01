import users from "../assets/svg/content-white/users.svg"
import helped from "../assets/svg/content-white/hands-helping.svg";
import analytics from "../assets/svg/content-white/analytics.svg";
import monitor from "../assets/svg/content-white/monitor-heart-rate.svg";
export const stats = [
  {
    text: "Total Patients",
    svg: users,
    alt_text: "users",
    number: "12345",
    color: "#7A6EFE",
  },
  {
    text: "Currently Monitoring",
    svg: monitor,
    number: "12345",
    alt_text: "monitor",
    color: "#FF5363",
  },
  {
    text: "Recently Added",
    svg: analytics,
    alt_text: "analysis",
    number: "12345",
    color: "#FFA901",
  },
  {
    text: "Previously Assisted",
    svg: helped,
    alt_text: "helped",
    number: "12345",
    color: "#24A8FA",
  },
];