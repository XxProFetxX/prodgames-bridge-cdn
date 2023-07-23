const customStyles = `
/* [Object] Modal
 * =============================== */
 .modal {
    opacity: 0;
    visibility: hidden;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: left;
    background: rgba(0,0,0, .6);
    transition: opacity .25s ease;
    
  }
  
  .modal__bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    pointer-events: none;
  }
  
  .modal-state {
    display: none;
  }
  
  .modal-state:checked + .modal {
    opacity: 1;
    visibility: visible;
  }
  
  .modal-state:checked + .modal .modal__inner {
    top: 0;
  }
  
  .modal__inner {
    width: 365px; height: 775px;
    transition: top .25s ease;
    position: absolute;
    top: -20%;
    right: 0;
    bottom: 0;
    left: 0;
    /* width: 50%; */
    margin: auto;
    overflow: auto;
    background: transparent;
    border-radius: 5px;
    /* padding: 1em 2em; */
    /* height: 50%; */
  }
  
  .modal__close {
    position: fixed;
    right: 1em;
    top: 1em;
    width: 1.1em;
    height: 1.1em;
    cursor: pointer;
  }
  
  .modal__close:after,
  .modal__close:before {
    content: '';
    position: absolute;
    width: 2px;
    height: 1.5em;
    background: white;
    display: block;
    transform: rotate(45deg);
    left: 50%;
    margin: -3px 0 0 -1px;
    top: 0;
  }
  
  .modal__close:hover:after,
  .modal__close:hover:before {
    background: #aaa;
  }
  
  .modal__close:before {
    transform: rotate(-45deg);
  }

  .container-iframe{
    webkit-box-shadow: 0 0 0 transparent; box-shadow: 0 0 0 transparent; background-color: transparent; border: 0; padding: 0;
  }

  .custom-iframe{
    border: 0; border-radius: 7.5px; overflow: none;
  }
  
  @media screen and (max-width: 768px) {
      
    .modal__inner {
        width: 365px; height: 775px;
        box-sizing: border-box;
    }
  }
  
  
  /* Other
   * =============================== */
  body {
    padding: 1%;
    font: 1/1.5em sans-serif;
    text-align: center;
  }
  
  .btn {
    cursor: pointer;
    background: #27ae60;
    display: inline-block;
    padding: .5em 1em;
    color: #fff;
    border-radius: 3px;
  }
  
  .btn:hover,
  .btn:focus {
    background: #2ecc71;
  }
  
  .btn:active {
    background: #27ae60;
    box-shadow: 0 1px 2px rgba(0,0,0, .2) inset;
  }
  
  .btn--blue {
    background: #2980b9;
  }
  
  .btn--blue:hover,
  .btn--blue:focus {
    background: #3498db;
  }
  
  .btn--blue:active {
    background: #2980b9;
  }
  
  p img {
    max-width: 200px;
    height: auto;
    float: left;
    margin: 0 1em 1em 0;
  }

  .hidden{
    visibility: hidden;
  }
`;

function loadCSS() {
  // Elimina esta línea para cargar el archivo CSS desde el CDN
  // link.href = "https://cdn.jsdelivr.net/gh/XxProFetxX/prodgames-bridge-cdn/style.css";

  // Agrega los estilos personalizados directamente desde la variable customStyles
  var style =
    document.createElement("style");
  style.type = "text/css";
  style.appendChild(
    document.createTextNode(
      customStyles
    )
  );
  document.head.appendChild(style);
}

// Crea una funcion para cargar el juego en un iframe
function injectModal() {
  const random = Math.random();
  var modal = `
            <label id="btn-open-modal" class="btn hidden" for="modal-1">Show Modal</label>
            <input class="modal-state" id="modal-1" type="checkbox" />
            <div class="modal">
                <label class="modal__bg" for="modal-1"></label>
                <div class="modal__inner">
                    <label id="close" class="modal__close" for="modal-1"></label>
                    <div id="yourcontainer" class="container-iframe">
                        <iframe class="custom-iframe" scrolling="no" id="youriframe" onload="adjustIframeSize()"
                        src="http://192.168.18.66:8081/?v=${random}&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJmaW5hbmNpZXJhLmNvbXBhcnRhbW9zQGdtYWlsLmNvbSIsInJvbGVzIjoiQyIsImlhdCI6MTY3NjIzNjczMiwiZXhwIjoxNjc2MjQwMzMyfQ.9QJsqvepVoqdwZd4ezkhlwEMGkQGfSaiyMNk0l-Zu_Q&idPlayer=1&idClient=2&idGame=1"
                        width="360" height="740"></iframe>
                    </div>
                </div>
            </div>`;
  document.body.innerHTML = modal;
  // En el JavaScript del padre
  window.addEventListener(
    "message",
    function (event) {
      console.log(
        "Mensaje recibido desde el iframe:",
        event.data
      );
      if (event.data === "close") {
        closeModal();
      }
    }
  );
}

function openModal() {
  document
    .getElementById("btn-open-modal")
    .click();
}

function closeModal() {
  document
    .getElementById("close")
    .click();
}

function adjustIframeSize() {
  var container =
    document.getElementById(
      "yourcontainer"
    );
  var iframe = document.getElementById(
    "youriframe"
  );
  iframe.height =
    container.offsetHeight;
  iframe.width = container.offsetWidth;
}

// Crea una funci車n para desactivar el juego
function uninjectModal() {
  // Obtiene el iframe
  var iframe =
    document.querySelector("iframe");
  // Elimina el iframe del documento
  iframe.parentNode.removeChild(iframe);
}

function loadAssets() {
  loadCSS();
  injectModal();
}

window.addEventListener(
  "load",
  loadAssets
);
