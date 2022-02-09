//const config = require("./config." + process.env.REACT_APP_CUSTOM_NODE_ENV);
import { isMobileOnly } from "react-device-detect";
import featureList from "./features";

var template = 4; //2 for T2, 3 for T3 (based on .xd file)

const config = {
  baseUrl: window?.env ? "/api/" : "https://dev-t1.rpgp.cc/api/",
  client:
    window?.env?.client ||
    "I7nKiimrZQOqnJ6ryjUw74c0Hi64KC6Myunhob4cHh8VOUIuZh4p63czefxyyzbZ",
  currency: window?.env?.currency || "CNY",
  brand: window?.env?.brand || process.env.REACT_APP_BRAND || "28BET",
  brandName: window?.env?.brandName
    ? window?.env?.brandName
    : window?.env?.brand || "HKJP",
  wapVersion: template,
  theme: window?.env?.theme || (isMobileOnly ? `wapT${template}` : "wapT5"),
  sourceUrl: window?.env?.sourceUrl || "https://images.srvptt.com/",
  defaultLanguage: window?.env?.defaultLanguage
    ? window?.env?.defaultLanguage === ""
      ? "zh-CN"
      : window?.env?.defaultLanguage
    : "zh-CN",
  affiliateId: window?.env?.affiliateId || "",
  features: featureList["default"],
};

export default config;
