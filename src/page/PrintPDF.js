import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'

const PrintPDF = (printStatus) => {
    const domElement = document.getElementById('demo');
    // html2canvas(domElement, {
    //     onclone: (document) => {
    //         document.getElementById('print-button').style.visibility = 'hidden'
    //     }
    // })

    // html2canvas(domElement, {
    //     allowTaint: true,
    //     scale: 2,// 提升画面质量，但是会增加文件大小
    // })
    html2canvas(domElement, {
        // onclone: (document) => {
        //     document.getElementById('itemFooter').style.visibility = 'hidden'
        // },
        allowTaint: true,
        scale: 2,
        useCORS: true
    })
        .then(canvas => {
            const contentWidth = canvas.width;
            const contentHeight = canvas.height;
            // 一页pdf显示html页面生成的canvas高度
            const pageHeight = contentWidth / 592.28 * 841.89;
            // 未生成pdf的html页面高度
            const leftHeight = contentHeight;
            // 页面偏移
            const position = 0;
            // a4纸的尺寸[595.28,841.89mm]，html页面生成的canvas在pdf中图片的宽高
            const imgWidth = 565.28;
            const imgHeight = 592.28 / contentWidth * contentHeight;

     
            const pageDate = canvas.toDataURL('image/jpeg', 1.0);

            const pdf = new jsPdf('', 'pt', 'a4');
            // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面的高度（841.89）
            // 当内容未超过pdf一页显示的范围，无需分页

            if (leftHeight < pageHeight) {
                pdf.addImage(pageDate, 'JPEG', 0, position, imgWidth, imgHeight);
            } else { // 分页
                while (leftHeight > 0) {
                    pdf.addImage(pageDate, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    // 避免添加空白页
                    if (leftHeight > 0) {
                        pdf.addPage()
                    }
                }
            }
            pdf.save('施工抽查照片.pdf');
            printStatus.current = false;
        })
}

export default PrintPDF;