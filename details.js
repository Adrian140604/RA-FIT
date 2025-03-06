document.addEventListener('DOMContentLoaded', () => {
    
    // Recojo el id del evento enviado en el enlace
    const parametros = new URLSearchParams(window.location.search);
    const eventId = parametros.get('id');


    // Información del evento
    // Recojo los datos de la información
    const nameEvent = document.getElementById('event-name');
    const dateEvent = document.getElementById('event-date');
    const locationEvent = document.getElementById('event-location');

    const url = "http://localhost:3000/";

    // Relleno la información del evento
    const fillInformation = async () => {

        try {
            
            const res = await fetch(url + "events/" + eventId);
            const event = await res.json();

            nameEvent.textContent = event.name;
            dateEvent.textContent = event.date;

            try {

                const res = await fetch(url + "locations/" + event.locationId);
                const loc = await res.json();

                locationEvent.textContent = loc.name;

            } catch (e) {
                onsole.error('Error al rellenar la ubicación del evento, ', e);
            }

        } catch (e) {
            console.error('Error al rellenar la información del evento, ', e);
        }

    }

    fillInformation();


    // Participantes del evento
    // Recojo los datos
    const participantList = document.getElementById('participant-list');

    // Relleno los participantes del evento seleccionado
    const fillParticipants = async () => {

        try {

            const resp = await fetch(url + "participants");
            const participants = await resp.json();
            const filteredParticipants = participants.filter(partic => partic.eventId === eventId);

            filteredParticipants.forEach(p => {
                const row = document.createElement('li');
                row.innerHTML = `${p.name}: ${p.email}`;

                participantList.appendChild(row);
            })


        } catch (e) {
            console.error ("Error al cargar la lista de participantes del evento, ", e);
        }

    }

    fillParticipants();



    // Buscar participantes
    // Recojo los datos
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Errores
    let errors = document.createElement('div');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        errors.innerHTML = "";
        if (searchForm.contains(errors)) {
            searchForm.removeChild(errors);
        }

        searchResults.innerHTML = "";

        searchValue = searchInput.value;
        
        // Validación 3 carácteres mínimo para la búsqueda
        if(searchValue && searchValue.length >= 3) {

            const resp = await fetch(url + "participants");
            const participants = await resp.json();
            const filteredParticipants = participants.filter(partic => partic.eventId === eventId && (partic.name.includes(searchValue) || partic.email.includes(searchValue)) 
            );

            filteredParticipants.forEach(p => {
                const row = document.createElement('li');
                row.innerHTML = `${p.name}: ${p.email}`;

                searchResults.appendChild(row);
            })


        } else {
            errors.innerHTML += "<div>La búsqueda debe tener mínimo 3 carácteres</div>";
            searchForm.appendChild(errors);
        }

    })


})