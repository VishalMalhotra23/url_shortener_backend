const URL = require("../models/url");
const shortid = require("shortid");

exports.shortenURL = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortUrl = shortid();
    const userId = req.auth._id;

    const url = new URL({
      originalUrl,
      shortUrl,
      userId,
    });

    await url.save();
    res.json({ shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.redirectURL = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await URL.findOne({ shortUrl });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    url.clicks++;
    await url.save();

    res.status(200).json({ originalUrl: url.originalUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllUrls = async (req, res) => {
  try {
    const userId = req.auth._id;
    const urls = await URL.find({ userId });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.auth._id;
    await URL.findOneAndDelete({ _id: id, userId });
    res.json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { originalUrl, customShortUrl } = req.body;
    const userId = req.auth._id;

    const url = await URL.findOne({ _id: id, userId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    if (originalUrl) {
      url.originalUrl = originalUrl;
    }

    if (customShortUrl && url.shortUrl !== customShortUrl) {
      const existingURL = await URL.findOne({ shortUrl: customShortUrl });

      if (existingURL && existingURL._id.toString() !== id) {
        return res
          .status(400)
          .json({ message: "Custom short URL already in use" });
      }
      url.shortUrl = customShortUrl;
    }

    await url.save();

    res.json({ message: "URL updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.auth._id;

    const url = await URL.findOne({ _id: id, userId });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json({ clicks: url.clicks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
