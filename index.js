

import  Puppeteer  from 'puppeteer';
import * as download from 'image-downloader'

(async() => {
  try {
    const browser = await Puppeteer.launch({
        headless: "new"
    });
    console.log('Browser openned');
    const page = await browser.newPage();
    const url = 'https://tannhatminh.com/ky-niem-chuong-pha-le-dep/'
    await page.goto(url);
    console.log('Page loaded');

   const imageLinks =  await page.evaluate(() => {
        let imgElements = document.querySelectorAll('.product-thumb img');
        console.log(imgElements)
        imgElements = [...imgElements];
        let imgLinks = imgElements.map(i => i.getAttribute('src'));
        return imgLinks;
    });


    await Promise.all(imageLinks.map(imgUrl => download.image({
        url: imgUrl,
        dest: './kyniemchuongphale'
    })));

    await browser.close();
  } catch (error) {
    console.log('error' ,error)
  }
})();











