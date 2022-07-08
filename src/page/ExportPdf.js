import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'


const ExportPdf = (element, imageFileName) => {


    const domElement = document.getElementById(element)
    html2canvas(domElement, {
        // onclone: (document) => {
        //     document.getElementById('print-button').style.visibility = 'hidden'
        // }
    })
        .then((canvas) => {
            const img = canvas.toDataURL('image/png')
            const pdf = new jsPdf()
            var imgWidth = 575.28;
            var imgHeight = 575.28 / canvas.width * canvas.height;
            pdf.addImage(img, 'JPEG', 20, 10, imgWidth, imgHeight)
            pdf.save(imageFileName)
        })
}


export default ExportPdf;