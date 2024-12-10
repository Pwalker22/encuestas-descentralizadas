document.getElementById('form-candidato').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const imagen = document.getElementById('imagen').value;


  fetch('http://localhost:3000/api/candidatos/saveCandidato', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, descripcion, imagen }),
  })
  .then(response => response.json())
  .then(data => {
    alert("Candidato Inscrito!");
    cerrarFormularioInscripcion(); 
    actualizarFormularioVotacion(); 
  })
  .catch(error => console.error('Error al inscribir el candidato:', error));
});


function actualizarFormularioVotacion() {
  const select = document.getElementById("candidato");
  select.innerHTML = ''; 

  // Obtener candidatos desde el backend
  fetch('http://localhost:3000/api/candidatos/Candidatos')
    .then(response => response.json())
    .then(candidatos => {
      candidatos.forEach(candidato => {
        const option = document.createElement("option");
        option.value = candidato._id; 
        option.textContent = candidato.nombre;
        select.appendChild(option);
      });
    })
    .catch(error => console.error('Error al obtener los candidatos:', error));
}


document.getElementById('form-voto').addEventListener('submit', function(e) {
  e.preventDefault();
  const candidatoId = document.getElementById('candidato').value;


  fetch(`http://localhost:3000/api/candidatos/votar/${candidatoId}`, {
    method: 'PUT',
  })
  .then(response => response.json())
  .then(data => {
    alert("Gracias por votar!");
    cerrarFormularioVotacion(); 
  })
  .catch(error => console.error('Error al votar:', error));
});


function verResultados() {
  fetch('http://localhost:3000/api/candidatos/resultados')
    .then(response => response.json())
    .then(candidatos => {
      const resultadosVoto = document.getElementById("resultados-voto");
      resultadosVoto.innerHTML = "<h4>Resultados de la Votación:</h4>";
      const listaResultados = document.createElement("ul");

    
      candidatos.sort((a, b) => b.votos - a.votos).forEach(candidato => {
        const item = document.createElement("li");
        item.innerHTML = `${candidato.nombre}: ${candidato.votos} votos <img src="${candidato.imagen}" alt="${candidato.nombre}" width="50" height="50">`;
        listaResultados.appendChild(item);
      });

      resultadosVoto.appendChild(listaResultados);
    })
    .catch(error => console.error('Error al obtener los resultados:', error));
}


function cerrarFormularioInscripcion() {
  document.getElementById('form-candidato').reset(); 
  document.getElementById('formulario-inscripcion').style.display = 'none'; 
}


function cerrarFormularioVotacion() {
  document.getElementById('form-voto').reset(); 
  document.getElementById('formulario-votacion').style.display = 'none'; 
}


function irAInscripcion() {
  document.getElementById('formulario-inscripcion').style.display = 'block'; 
  document.getElementById('votar-inscribir').style.display = 'none'; 
}


function irAVotacion() {
  document.getElementById('formulario-votacion').style.display = 'block'; 
  document.getElementById('votacion').style.display = 'none'; 
}


function mostrarImagen() {
  const urlImagen = document.getElementById('imagen').value;
  const imagenPreview = document.getElementById('imagen-preview');
  const candidatoImagen = document.getElementById('candidato-imagen');

  if (urlImagen) {
  
    const img = new Image();
    img.onload = function() {
      candidatoImagen.src = urlImagen;
      imagenPreview.style.display = 'block'; 
    };
    img.onerror = function() {
      imagenPreview.style.display = 'none'; 
    };
    img.src = urlImagen; n
  } else {
    imagenPreview.style.display = 'none'; 
  }
}
