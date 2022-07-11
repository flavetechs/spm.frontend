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
        document.head.removeChild(link);
        downloadLink.click();
    }

}