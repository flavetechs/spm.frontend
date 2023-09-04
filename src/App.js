//router
import IndexRouters from "./router/index"

//scss
import "./assets/scss/hope-ui.scss"
import "./assets/scss/dark.scss"
import "./assets/scss/rtl.scss"
import "./assets/scss/custom.scss"
import "./assets/scss/customizer.scss"
import io from 'socket.io-client';


export const socket = io("http://localhost:3200")
function App() {
  socket.on('connect', () => {
    console.log('Connected to the server');

    //socket.emit("login", "HELLO WORLD");

    // socket.on("Announcement", function(message) {
    //   console.log(message);
    // });
  });
  
  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
  return (
    <div className="App">
      <IndexRouters />
    </div>
  );
}

export default App;
