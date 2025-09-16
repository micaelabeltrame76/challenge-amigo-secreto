// Guarda los nombres que ingresa el usuario.
let listaDeAmigos = [];

// Agrega un amigo a la lista.
function agregarAmigo() {
    let nombreDeAmigo = document.getElementById("amigo").value.trim();

    // Si el input está vacío..
    if (nombreDeAmigo === "") {
        alert("Por favor, insertá un nombre.");
        return;
    }

    //Formatea el nombre con mayúsculas iniciales y elimina espacios extras.
    nombreDeAmigo = nombreDeAmigo
        .toLowerCase() //Convierte todas las letras a minúsculas.
        .split(" ") // Divide el texto en palabras usando los espacios.
        .filter(Boolean) //Elimina los elementos “vacíos” del arreglo.
        .map(p => p.charAt(0).toUpperCase() + p.slice(1)) // Pone la primera letra en mayúscula y el resto en minúscula.
        .join(" "); //Une todas las palabras de nuevo en un solo string, separadas por espacios.

    // Evita duplicados.
    let yaExiste = listaDeAmigos.some(nombre => nombre.toLowerCase() === nombreDeAmigo.toLowerCase());
    if (yaExiste) {
        alert(`El nombre "${nombreDeAmigo}" ya está en la lista.`);
        limpiarCaja();
        return;
    }

    // Agrega el nombre a la lista y actualiza la pantalla.
    listaDeAmigos.push(nombreDeAmigo);
    actualizarListaPantalla();
    limpiarCaja();
    document.getElementById("resultado").innerHTML = ""; // Limpia resultado previo
    console.log(listaDeAmigos);
}

// Limpia el input.
function limpiarCaja() {
    document.getElementById("amigo").value = "";
}

// Actualiza la lista visible en pantalla.
function actualizarListaPantalla() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    listaDeAmigos.forEach(nombre => {
        const li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    //Si la lista está vacía, no sortea y envia una alerta.
      if (listaDeAmigos.length === 0) {
        alert("No hay amigos en la lista para sortear.");
        return;
    }

    //Si hay menos de dos amigos, no tiene sentido sortear. Por lo tanto, envia una alerta.
    if (listaDeAmigos.length < 2) {
        alert("Necesitás al menos 2 amigos para hacer un sorteo.");
        return;
    }

     // Selecciona un índice aleatorio.
    let indiceAleatorio = Math.floor(Math.random() * listaDeAmigos.length);
    let amigoSecreto = listaDeAmigos[indiceAleatorio]; 

    // Elimina al amigo sorteado para que no se repita.
    listaDeAmigos.splice(indiceAleatorio, 1);

    // Muestra el resultado.
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `Tu amigo secreto es: <strong>${amigoSecreto}</strong>`;

    // Actualiza la lista visible en pantalla.
    actualizarListaPantalla();
}

// Permite agregar un amigo presionando Enter.
document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita recargar la página.
        agregarAmigo();
    }
});
