import featureList from "./features";

var wapTemplate = window?.env?.wapTemplate || 8; //3 for T3 ,4 for T4 (based on .xd file)
const config = {
  baseUrl: window.env?.apiUrl || (window?.env ? "/api/" : "https://dev-t1.rpgp.cc/api/"),
  client:
    window?.env?.client ||
    "yorAqGm7MHug45YZ0B6umuTaQnYJdawIQQjEUgsDAQeidDl8j4t0uUi",
  currency: window?.env?.currency || "HKD",
  brand: window?.env?.brand || process.env.REACT_APP_BRAND || "xxxx",
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
