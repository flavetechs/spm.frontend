export function saveAsFile(name,baseCode) {
    var mediaType = "data:application/octet-stream;base64,";
    var userInp = baseCode;
    var a = document.createElement('a');
    a.href = mediaType + userInp;
    a.download = name;
    a.click();
    a.textContent = 'Download file!';
    document.body.appendChild(a);
 }
