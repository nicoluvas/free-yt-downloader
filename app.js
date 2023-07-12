const express = require('express');
const ytdl = require("ytdl-core");
const fs = require('fs');
const app = express();

app.get('/download/video', async function (req, res) {
    const videoUrl = req.query.url;
    const videoInfo = await ytdl.getInfo(videoUrl);
    const videoTitle = videoInfo.videoDetails.title;
    const fileName = `${videoTitle}.mp4`;
  
    ytdl(videoUrl, { filter: 'audioandvideo' })
      .pipe(fs.createWriteStream(fileName));
  
    res.attachment(fileName);
    res.send('Download do vídeo iniciado!');
  });
  
  app.get('/download/audio', async function (req, res) {
    const videoUrl = req.query.url;
    const videoInfo = await ytdl.getInfo(videoUrl);
    const videoTitle = videoInfo.videoDetails.title;
    const fileName = `${videoTitle}.mp3`;
  
    ytdl(videoUrl, { filter: 'audioonly' })
      .pipe(fs.createWriteStream(fileName));
  
    res.attachment(fileName);
    res.send('Download do áudio iniciado!');
  });

app.listen(3000);

//localhost:3000/?url=https://www.youtube.com/watch?v=2F1zi6MDy6k
/*     const {url} = req.query;
    res.header('Content-Disposition', 'attachmentt; filename="video.mp4"');
    return ytdl(url).pipe(res); */