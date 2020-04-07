const got = require('got');
const fs = require('fs');
const $ = require('cheerio');
const path = require('path');

// Icon Urls
// const url = 'https://www.iconfinder.com/iconsets/famous-characters-add-on-vol-2-flat';
// const url = 'https://www.iconfinder.com/iconsets/famous-character-vol-2-flat';


const getIconDataUrls = async () => {
  const imgsData = []
  try {
    const response = await got(url);
    const html = response.body;
    const imgsItems = $('.icon-preview-img > img', html);
    imgsItems.each((i, item) => {
      const url256 = item.attribs.src.replace('128.png', '512.png');
      const alt = item.attribs.alt
      imgsData.push({url256, alt});
    });
  } catch (error) {
    console.log(error.response.body);
  }
  return imgsData;
}

const downloadImage = async (imgData) => {
  const { url256, alt } = imgData;
  const fileName = `${alt.split(',')[0]}.png`
  try {
    const response = await got(url256, {responseType: 'buffer'});
    fs.writeFileSync(`icons/${fileName}`, response.body);
  } catch (error) {
    console.log(error);
  }
}

function genImagesDataJson() {
  const iconDir = './icons'
  const imagesFileNames = fs.readdirSync(iconDir).map(fileName => {
    return path.join(fileName);
  });
  const imagesData = imagesFileNames
    .filter((fileName) => !fileName.startsWith('.'))
    .map((imageName) => {
    return {
      name: imageName.replace('.png', ''),
      path: `${iconDir}/${imageName}`
    }
  });
  console.log(imagesData)
  fs.writeFileSync('images.json', JSON.stringify(imagesData));
}
