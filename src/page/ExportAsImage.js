import html2canvas from "html2canvas";
import jsPdf from 'jspdf'

const ExportAsImage = async (element, imageFileName) => {

    // const html = document.getElementsByTagName("html")[0];
    // const body = document.getElementsByTagName("body")[0];
    // let htmlWidth = html.clientWidth;
    // let bodyWidth = body.clientWidth;
    // const newWidth = element.scrollWidth - element.clientWidth;
    // if (newWidth > element.clientWidth) {
    //     htmlWidth += newWidth;
    //     bodyWidth += newWidth;
    // }
    // html.style.width = htmlWidth + "px";
    // body.style.width = bodyWidth + "px";

     //将整个页面转成canvas
    const canvas = await html2canvas(element);
    //返回图片dataURL，参数：图片格式和清晰度(0-1)
    const image = canvas.toDataURL("image/JPEG", 1.0);
    //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
    const pdf = new jsPdf('', 'pt', 'a4');
    //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
    //(inner) addImage(imageData, format, x, y, width, height, alias, compression, rotation)
    pdf.addImage(image, 'JPEG',10, 50, 575.28, 575.28/canvas.width * canvas.height )
    pdf.save(`${imageFileName}.pdf`);
    //downloadImage(image, imageFileName);
    //downloadPdf(image, imageFileName);
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

const downloadPdf = (image, fileName) => {

    const contentWidth = image.width;
    const contentHeight = image.height;
    // 一页pdf显示html页面生成的canvas高度
    const pageHeight = contentWidth / 592.28 * 841.89;
    // 未生成pdf的html页面高度
    const leftHeight = contentHeight;
    // 页面偏移
    const position = 0;
    // a4纸的尺寸[595.28,841.89mm]，html页面生成的canvas在pdf中图片的宽高
    const imgWidth = 565.28;
    const imgHeight = 592.28 / contentWidth * contentHeight;

    const pdf = new jsPdf('', 'pt', 'a4');
    pdf.addImage(image, 'JPEG', 10, 10, imgWidth, imgHeight)
    // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面的高度（841.89）
    // 当内容未超过pdf一页显示的范围，无需分页

    // if (leftHeight < pageHeight) {
    //     pdf.addImage(image, 'JPEG', 0, 0, imgWidth, imgHeight);
    // } else { // 分页
    //     while (leftHeight > 0) {
    //         pdf.addImage(image, 'JPEG', 10, 10, imgWidth, imgHeight)
    //         leftHeight -= pageHeight;
    //         position -= 841.89;
    //         // 避免添加空白页
    //         if (leftHeight > 0) {
    //             pdf.addPage()
    //         }
    //     }
    // }
    pdf.save(`${fileName}.pdf`);

}

export default ExportAsImage;