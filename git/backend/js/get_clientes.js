function getClientes(offset) {
    var query = window.location.search.substring(1);
    console.log("Query: " + query)
    var request = new XMLHttpRequest();
    //Accede a la session de la pagina
    username= sessionStorage.getItem("username");
    password= sessionStorage.getItem("password");
   
    request.open('GET', 'http://127.0.0.1:8000/clientes/?offset='+offset+'&limit=10', true);
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password))
    request.setRequestHeader("Authorization", "Basic " + btoa("user:user"));
    request.setRequestHeader("Content-Type", "application/json");

    const  tabla   = document.getElementById("tabla_clientes");

    var tblBody = document.createElement("tbody");
    var tblHead = document.createElement("thead");

    tblHead.innerHTML = `
        <tr>
            <th>OPCIONES</th>
            <th></th>
            <th>Borrar</th>
            <th>Sku</th>
           
        </tr>`;

    request.onload = () => {
        // Almacena la respuesta en una variable, si es 202 es que se obtuvo correctamente
        const response = request.responseText;
        const json = JSON.parse(response);
        console.log("Response " + response);
        console.log("Json " +  json);
        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
            window.location.replace("http://localhost:8080/validate/");
        }
        else if (request.status == 202){
            console.log(request);
            const response = request.responseText;
            const json = JSON.parse(response);
            console.log(json);
            for (let i = 0; i < json.length; i++) {
                var tr = document.createElement('tr');
                var get_producto = document.createElement('td');
                var sku = document.createElement('td');
                var producto = document.createElement('td');
                var precio = document.createElement('td');

                get_producto.innerHTML = "<a href='\\cliente\\get\\"+json[i].sku+"'>Ver</a>";
                sku.innerHTML = json[i].sku;
                producto.innerHTML = json[i].producto;
                precio.innerHTML = json[i].precio;

                tr.appendChild(get_producto);
                tr.appendChild(sku);
                tr.appendChild(producto);
                tr.appendChild(precio);
                
                tblBody.appendChild(tr);
            }
            tabla.appendChild(tblHead);
            tabla.appendChild(tblBody);
        }
    };
    request.send();
};