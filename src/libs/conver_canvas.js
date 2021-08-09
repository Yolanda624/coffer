/**
* ? convertBase64ToCanvas方法：将base64转成canvas
* ? 返回值Promise，resolve(), reject({ param: '出错的参数', msg: '错误说明' })
* * imgBase64 图片base64
* * canvasDom 想要渲染的canvasDOM
* * width 二维码宽度，默认300
* * height 二维码高度，默认300
* * text 下方显示的文字
* * textSize [Number]文字大小，默认12(即12px)
* * logoImg 中间显示的小图片
* * logoWidth 中间小图片的宽度, 默认40
* * logoHeight 中间小图片的高度，默认40
*/
export const convertImgToCanvas = ({ imgBase64, canvasDom, width = 300, height = 300, text, textSize = 12, logoImg, logoWidth = 40, logoHeight = 40 }) => {
  let canvasCtx = canvasDom.getContext('2d');
  let imgDom = document.createElement('img');
  return new Promise((resolve, reject) => {
   if (!imgBase64) reject({
      param: 'imgBase64',
      msg: 'base64数据为空'
    });
    if(!canvasCtx) reject({
      param: 'canvasCtx',
      msg: 'canvasDOM为空'
    });

    imgDom.src = imgBase64;
    imgDom.onerror = () => {
      imgDom.src = imgBase64;
      imgDom.onerror = () => {
        reject({
          param: 'imgDom',
          msg: '原图片加载失败，请查看图片的base64数据是否正确'
        });
      };
    };
    imgDom.onload = () => {
      canvasDom.width = width;
      canvasDom.height = height;
      canvasCtx.drawImage(imgDom, 0, 0, width, height);
    }
     setTimeout(() => {
       if (text) {
         canvasCtx.font = 'bold ' + textSize + 'px Microsoft YaHei';
         // 规定内边距
         let fpadd = 10;
         // 文字真是宽度
         let tw = canvasCtx.measureText(text).width;
         // 根据字体大小计算文字top
         let ftop = height - textSize - 5;
         // 根据字体大小计算文字left
         let fleft = (width - tw) / 2;
         // 字体边距为字体大小的一半(可以自由设置)
         let tp = textSize / 2;
         canvasCtx.fillStyle = '#fff';
         canvasCtx.fillRect(fleft - tp / 2, ftop - tp / 2, tw + tp, textSize + tp);
         // 设置绘制文本时的文本基线
         canvasCtx.textBaseline = 'top';
         canvasCtx.fillStyle = '#666';
         canvasCtx.fillText(text, fleft, ftop);
       }
       if (logoImg) {
         let logoImgDom = document.createElement('img');
         logoImgDom.src = logoImg;

         canvasCtx.fillStyle = '#fff';
         canvasCtx.beginPath();
         // logo相对二维码居中
         let logoPosX = (width - logoWidth) / 2;
         let logoPosY = (height - logoHeight) / 2;
         // // 圆角宽 6为基数(logo四周白色背景为6/2)
         // let w = logoWidth + 6;
         // // 圆角高 6为基数(logo四周白色背景为6/2)
         // let h = logoHeight + 6;
         // let x = logoPosX - 3;
         // let y = logoPosY - 3;
         let w = logoWidth;
         // 圆角高 6为基数(logo四周白色背景为6/2)
         let h = logoHeight;
         let x = logoPosX;
         let y = logoPosY;
         // 圆角半径3
         // let r = 3;
         let r = 1;
         canvasCtx.moveTo(x + r, y);
         canvasCtx.arcTo(x + w, y, x + w, y + h, r);
         canvasCtx.arcTo(x + w, y+ h, x, y + h, r);
         canvasCtx.arcTo(x, y + h, x, y, r);
         canvasCtx.arcTo(x, y, x + w, y, r);
         canvasCtx.closePath();
         canvasCtx.fill();
         logoImgDom.onload = () => {
           canvasCtx.drawImage(logoImgDom, logoPosX, logoPosY, logoWidth, logoHeight);
         }
       }
     }, 0);
      resolve();
  });
 }
