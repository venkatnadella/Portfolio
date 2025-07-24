document.getElementById('downloadPdfBtn').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    html2canvas(document.body).then(function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        // Set PDF to A4 size in mm
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Calculate the ratio to fit the image inside the page (no cropping)
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

        const finalImgWidth = imgWidth * ratio;
        const finalImgHeight = imgHeight * ratio;

        // Center the image on the page
        const x = (pageWidth - finalImgWidth) / 2;
        const y = (pageHeight - finalImgHeight) / 2;

        pdf.addImage(imgData, 'PNG', x, y, finalImgWidth, finalImgHeight);
        pdf.save('venkata_sai_nadella_Resume.pdf');
    });
});