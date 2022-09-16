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
    var mywindow = window.open("", "PRINT", "height=400,width=600");
    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write(document.getElementById(elementId).innerHTML);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

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