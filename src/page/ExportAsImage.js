import html2canvas from 'html2canvas';
import jsPdf from 'jspdf'

const ExportAsImage = async (element, imageFileName) => {

    //將整個畫面轉化為canvas
    const canvas = await html2canvas(element);

    /**
     * PDF 尺寸設定
     */

    var contentWidth = canvas.width;
    var contentHeight = canvas.height;

    //一頁pdf顯示html頁面生成的canvas高度;
    var pageHeight = contentWidth / 595.28 * 841.89;
    //未生成pdf的html頁面高度
    var leftHeight = contentHeight;
    //pdf頁面偏移
    var positionX = 20;
    var positionY = 30;
    //a4紙的尺寸[595.28,841.89]，html頁面生成的canvas在pdf中圖片的寬高
    var imgWidth = 555.28;
    var imgHeight = 555.28 / contentWidth * contentHeight;


    //返回圖片dataURL，參數：圖片格式和清晰度(0-1)
    const image = canvas.toDataURL("image/JPEG", 1.0);

    //方向默認豎直，尺寸ponits，格式a4[595.28,841.89]
    const pdf = new jsPdf('', 'pt', 'a4');

    //有兩個高度需要區分，一個是html頁面的實際高度，和生成pdf的頁面高度(841.89)
    //當內容未超過pdf一頁顯示的範圍，無需分頁

    //addImage後二個參數控制添加圖片的尺寸，此處將頁面高度按照a4纸寬高比列進行壓縮
    //(inner) addImage(imageData, format, x, y, width, height, alias, compression, rotation)
    if (leftHeight < pageHeight) {
        pdf.addImage(image, 'JPEG', positionX, positionY, imgWidth, imgHeight);
    } else {
        while (leftHeight > 0) {
            pdf.addImage(image, 'JPEG', positionX, positionX, imgWidth, imgHeight)
            leftHeight -= pageHeight;
            positionX -= 841.89;
            //避免新增空白頁
            if (leftHeight > 0) {
                pdf.addPage();
            }
        }
    }

    pdf.save(`${imageFileName}.pdf`);
    //downloadImage(image, imageFileName);

};

const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
};

export default ExportAsImage;