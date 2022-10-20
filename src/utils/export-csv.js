export function ExportCSV(tableId, fileName = '') {

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  var downloadLink;
  var dataType = 'application/vnd.ms.excel';
  var tableSelect = document.getElementById(tableId);
  var tableHtml = tableSelect.outerHTML.replace(/ /g, '%20');

  fileName = fileName ? fileName + '.xls' : 'excel_data.xls';

  downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(['\ufeff', tableHtml], {
      type: dataType
    });
    navigator.msSaveOrOpenBlob(blob, fileName)
  } else {

    downloadLink.href = 'data:' + dataType + ', ' + tableHtml;

    downloadLink.download = fileName;
    downloadLink.click();
  }

}

export function PrintCSV(elementId) {
  var mywindow = window.open("", "PRINT", "height=1000,width=1300");
  if (mywindow) {
    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write(document.getElementById(elementId).innerHTML);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
  }


  return true;
}

export const openFullscreen = (id) => {
  var elementId = document.getElementById(id);
  if (elementId.requestFullscreen) {
    elementId.requestFullscreen();
  } else if (elementId.webkitRequestFullscreen) {
    /* Safari */
    elementId.webkitRequestFullscreen();
  } else if (elementId.msRequestFullscreen) {
    /* IE11 */
    elementId.msRequestFullscreen();
  }
};

export const closeFullscreen = (id) => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

export function PrintTable() {
  var printWindow = window.open('', '', 'height=1000,width=1300');
  printWindow.document.write('<html><head><title>Table Contents</title>');

  //Print the Table CSS.
  var table_style = document.getElementById("table_style").innerHTML;
  printWindow.document.write('<style type = "text/css">');
  printWindow.document.write(table_style);
  printWindow.document.write('</style>');
  printWindow.document.write('</head>');

  //Print the DIV contents i.e. the HTML Table.
  printWindow.document.write('<body>');
  var divContents = document.getElementById("dvContents").innerHTML;
  printWindow.document.write(divContents);
  printWindow.document.write('</body>');

  printWindow.document.write('</html>');
  printWindow.document.close();
  printWindow.print();
}