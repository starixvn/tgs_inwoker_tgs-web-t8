import featureList from "./features";

var wapTemplate = window?.env?.wapTemplate || 8; //3 for T3 ,4 for T4 (based on .xd file)
const config = {
  baseUrl: window?.env ? "/api/" : "https://stg-t1.rpgp.cc/api/",
  client:
    window?.env?.client ||
    "I7nKiimrZQOqnJ6ryjUw74c0Hi64KC6Myunhob4cHh8VOUIuZh4p63czefxyyzbZ",
  currency: window?.env?.currency || "CNY",
  brand: window?.env?.brand || process.env.REACT_APP_BRAND || "GMO",
  brandName: window?.env?.brandName
    ? window?.env?.brandName
    : window?.env?.brand || "M9THB",
  theme: window?.env?.theme || "GMO",
  wapVersion: wapTemplate,
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
