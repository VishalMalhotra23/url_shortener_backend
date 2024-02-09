var express = require("express");
var router = express.Router();
const { isSignedIn } = require("../controllers/auth");
const {
  shortenURL,
  redirectURL,
  updateUrl,
  deleteUrl,
  getAllUrls,
  getAnalytics,
} = require("../controllers/url");

router.get("/url", isSignedIn, getAllUrls);

router.post("/url/shorten", isSignedIn, shortenURL);

router.get("/url/:shortUrl", isSignedIn, redirectURL);

router.delete("/url/:id", isSignedIn, deleteUrl);

router.put("/url/:id", isSignedIn, updateUrl);

router.get("/url/:id/analytics", isSignedIn, getAnalytics);

module.exports = router;
