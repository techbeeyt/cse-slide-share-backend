const drive = require('../config/DriveApiConnection');

const Router = require('express').Router();

Router.get("/", async (req, res) => {
  res.send({ message: "Hello world" })
});

Router.get("/folder/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // trashed = false to see only the visible files
    const q = `'${id}' in parents and trashed = false`;
    const response = await drive.files.list({
      q,
      fields: 'nextPageToken, files(id, name, mimeType)',
    });
    console.log(response.data.files)
    res.send(response.data.files);
  } catch(error) {
    console.log(error);
  }
});

Router.get("/file/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // trashed = false to see only the visible files
    // const q = `'${id}' in parents and trashed = false`;
    const response = await drive.files.get(
      {
        fileId: id,
        fields: 'webViewLink',
      })
    res.send(response.data);
  } catch(error) {
    console.log(error);
  }
});

module.exports = Router;