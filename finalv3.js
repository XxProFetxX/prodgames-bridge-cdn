function loadCSS() {
  var head = document.head;
  var link =
    document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href =
    "https://cdn.jsdelivr.net/gh/XxProFetxX/prodgames-bridge-cdn/style.css";
  head.appendChild(link);
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
                        src="https://angelomiosg.com/naves/?v=${random}&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJmaW5hbmNpZXJhLmNvbXBhcnRhbW9zQGdtYWlsLmNvbSIsInJvbGVzIjoiQyIsImlhdCI6MTY3NjIzNjczMiwiZXhwIjoxNjc2MjQwMzMyfQ.9QJsqvepVoqdwZd4ezkhlwEMGkQGfSaiyMNk0l-Zu_Q&idPlayer=1&idClient=2&idGame=1"
                        width="360" height="740"></iframe>
                    </div>
                </div>
            </div>`;
  document.body.insertAdjacentHTML(
    "beforeend",
    modal
  );
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
