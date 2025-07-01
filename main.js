import express from 'express';
import puppeteer from 'puppeteer';
import bodyparser from 'body-parser';
import cors from 'cors'
import nunjucks from 'nunjucks'
import {fileURLToPath} from 'url'
import { dirname, join } from 'path';

const app = express();
const port = 10000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (_, res) => {
    res.send("Hello world");
})

app.use(cors("*"));
app.use(bodyparser.json());

nunjucks.configure(join(__dirname, "templates"), {
    autoescape : true,
    express : app
})

app.post('/generate-pdf', async(req, res) => {
    const {title = "My Resume", content = ""} = req.body;

    try{
        const html = nunjucks.render('resume.html', {
            title,
            content
        })
      const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox", 
        "--disable-setuid-sandbox",
        "--single-process",
        "--no-zygote",
      ],
    });

     const page = await browser.newPage();
     await page.setContent(html, {waitUntil: "networkidle0"});

     const pdf = await page.pdf({
        format : "A4",
        printBackground : true,
     })
   

     await browser.close();
     console.log("PDF generated successfully");


      res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=MyResume.pdf",
    });

     res.send(pdf)
     

    }catch(e){
          console.log("Pdf generation failed", e);
          res.status(500).send("PDF generation failed")
    }
})

app.listen(port, () => {
  console.log(`📄 PDF microservice live at http://localhost:${port}`);
});