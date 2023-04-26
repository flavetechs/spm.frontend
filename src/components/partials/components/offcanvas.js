// .fwsbody{
//     border: 1px solid blue;
// }


window.onload = function() {
    console.log('Page loaded');
    setTimeout(() => {
        const docsIframe = document.getElementById('docsIframe'); 
    
        console.log('docsIframe', docsIframe);
        docsIframe.addEventListener('load', function() {
            console.log('Iframe is ready');
            // Do something with the iframe content here
          });
        
    }, 10000)
  }

// const fwsbody = document.getElementById('fwsbody');
// console.log('fwsbody', fwsbody);