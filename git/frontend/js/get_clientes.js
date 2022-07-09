function getClientes() {

    var request = new XMLHttpRequest();
    //Accede a la session de la pagina
    usernombre = window.prompt('Usernombre:')
    password = window.prompt('Password:')

    request.open('GET', "https://8000-citlalysoro-proyectoapi-mof65rxhuri.ws-us53.gitpod.io/clientes/");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Authorization", "Basic " + btoa(usernombre + ":" + password))
    request.setRequestHeader("content-type", "application/json");
    
    const  tabla   = document.getElementById("tabla_clientes");
    
    var tblBody = document.createElement("tbody");
    var tblHead = document.createElement("thead");

    tblHead.innerHTML = `
        <tr>
            <th>ID Cliente</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Detalle</th>
            <th>Actualizar</th>
            <th>Eliminar</th>
        </tr>`;

    request.onload = () => {
        // Almacena la respuesta en una variable, si es 202 es que se obtuvo correctamente
        const response = request.responseText;
        const json = JSON.parse(response);
        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
        }
        else if (request.status == 202){
            const response = request.responseText;
            const json = JSON.parse(response);
            for (let i = 0; i < json.length; i++) {
                var tr          = document.createElement('tr');
                var id_cliente  = document.createElement('td');
                var nombre      = document.createElement('td');
                var email       = document.createElement('td');
                var detalle     = document.createElement('td');
                var actualizar     = document.createElement('td');
                var eliminar     = document.createElement('td');

                
                id_cliente.innerHTML    = json[i].id_cliente;
                nombre.innerHTML        = json[i].nombre;
                email.innerHTML         = json[i].email;
                detalle.innerHTML       = "<a href='/pages/get_cliente.html?"+json[i].id_cliente+"'>Detalle</a";
                actualizar.innerHTML       = "<a href='/pages/update_cliente.html?"+json[i].id_cliente+"'>Actualizar</a";
                eliminar.innerHTML       = "<a href='/pages/delete_cliente.html?"+json[i].id_cliente+"'>Eliminar</a";

                tr.appendChild(id_cliente);
                tr.appendChild(nombre);
                tr.appendChild(email);
                tr.appendChild(detalle);
                tr.appendChild(actualizar);
                tr.appendChild(eliminar);

                
                tblBody.appendChild(tr);
            }
            tabla.appendChild(tblHead);
            tabla.appendChild(tblBody);
        }
    };
    request.send();
}