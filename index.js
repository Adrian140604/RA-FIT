document.addEventListener('DOMContentLoaded', () => {

    // Datos del formulario de eventos
    const eventForm = document.getElementById('event-form');

    const eventName = document.getElementById('event-name');
    const eventDate = document.getElementById('event-date');
    const eventPrice = document.getElementById('event-price');
    const eventLocation = document.getElementById('event-location');

    const url = "http://localhost:3000/";


    // Cargar las ubicaciones en el select del formulario del evento
    const loadLocations = async () => {
        try {
            const resp = await fetch(url + "locations");
            const locations = await resp.json();

            locations.forEach((loc) => {
                const newOpt = document.createElement('option');
                newOpt.value = loc.id;
                newOpt.textContent = loc.name;

                eventLocation.appendChild(newOpt);
            })
            
        } catch (e) {
            console.error('No se han podido cargar las ubicaciones en el select del formulario', e);
        }

    }

    loadLocations();


    // Errores para las validaciones de los formularios
    let errors = document.createElement('div');

    // Recojo la tabla del html
    const eventsBodyTable = document.querySelector('tbody');

    // Recojo el select de eventos del formulario de participantes
    const participantEvent = document.getElementById('participant-event');


    // Registrar evento nuevo
    eventForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const eventNameValue = eventName.value;
        const eventDateValue = eventDate.value;
        const eventPriceValue = eventPrice.value;
        const eventLocationValue = eventLocation.value;

        // Validaciones y mensaje de error
        let validFlag = true;
        errors.innerHTML = "";
        if (eventForm.contains(errors)) {
            eventForm.removeChild(errors);
        }

        if (eventNameValue.length < 3) {
            errors.innerHTML += "<div>El nombre del evento debe tener mínimo 3 carácteres</div>";
            validFlag = false;
        }

        // Todos los datos son válidos
        if (validFlag) {
            try {
                const res = await fetch(url + "events", {
                                        method: 'POST',
                                        headers: ({ "Content-Type": "application/json"}),
                                        body: JSON.stringify({name: eventNameValue, date: eventDateValue, locationId: eventLocationValue, price: eventPriceValue})
                                    })
                const event = await res.json();

                alert("Evento añadido correctamente");
                eventForm.reset();

                
                // Busco el nombre de la localización

                const respLocations = await fetch(url + "locations/" + event.locationId);
                const location = await respLocations.json();

                // Lo añado a la tabla
                const row = document.createElement('tr');
                row.innerHTML = `
                                <td><a href='details.html?id=${event.id}'>${event.name}</a></td>
                                <td>${event.date}</td>
                                <td>${location.name}</td>
                                <td>0</td>
                                <td>0</td>
                                `;

                row.id = "event" + event.id; // Le añado un id para modificarlo luego rápidamente

                eventsBodyTable.appendChild(row);


                // Lo añado al select del formulario de participantes
                
                const newOpt = document.createElement('option');
                newOpt.value = event.id;
                newOpt.textContent = event.name;

                participantEvent.appendChild(newOpt);


            } catch (e) {
                console.error('No se ha podido añadir el evento, ', e);
            }

        // Algún dato es inválido
        } else {
            eventForm.appendChild(errors);
        }

    })


    // Datos del formulario de participante
    const participantForm = document.getElementById('participant-form');

    const participantName = document.getElementById('participant-name');
    const participantEmail = document.getElementById('participant-email');


    // Rellenar select eventos en el formulario de participantes
    const loadEvents = async () => {
        try {
            const resp = await fetch(url + "events");
            const events = await resp.json();

            events.forEach((event) => {
                const newOpt = document.createElement('option');
                newOpt.value = event.id;
                newOpt.textContent = event.name;

                participantEvent.appendChild(newOpt);
            })
            
        } catch (e) {
            console.error('No se han podido cargar las ubicaciones en el select del formulario', e);
        }

    }

    loadEvents();



    // Creo las variables para detectar rápido el evento con más participantes
    let biggestEvent = "";
    let maxParticipants = 0;


    // Registrar participante nuevo
    participantForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const participantNameValue = participantName.value;
        const participantEmailValue = participantEmail.value;
        const participantEventValue = participantEvent.value;

        // Validaciones y mensaje de error
        const validFlag = true;
        errors.innerHTML = "";
        if (participantForm.contains(errors)) {
            participantForm.removeChild(errors);
        }

        if (participantNameValue.length < 5) {
            errors.innerHTML += "<div>El nombre del participante debe tener mínimo 5 carácteres</div>";
            validFlag = false;
        }

        if (!participantEmailValue.includes('@')) {
            errors.innerHTML += "<div>El email del participante debe ser válido</div>";
            validFlag = false;
        }

        if (!participantEventValue) {
            errors.innerHTML += "<div>Debe seleccionar un evento válido asociado al participante</div>";
            validFlag = false;
        }

        // Todos los datos son válidos
        if (validFlag) {
            try {
                await fetch(url + "participants", {
                    method: 'POST',
                    headers: ({ "Content-Type": "application/json"}),
                    body: JSON.stringify({name: participantNameValue, email: participantEmailValue, eventId: participantEventValue})
                })
                alert("Participante añadido correctamente");
                participantForm.reset();


                // Actualizar la tabla con el nuevo participante (añado 1 participante al evento y añado la recaudación de éste)
                const participantEvent = document.getElementById("event" + participantEventValue);
                let numParticActual = parseInt(participantEvent.children[3].textContent);
                numParticActual += 1;
                participantEvent.children[3].textContent = numParticActual;

                if (parseInt(participantEvent.children[3].textContent) > maxParticipants) {
                    maxParticipants = parseInt(participantEvent.children[3].textContent);
                    
                    try {
                        const resp = await fetch(url + "events/" + participantEventValue);
                        const event = await resp.json();
                        biggestEvent = event;

                        checkBiggestEvent();

                    } catch (e) {
                        console.error('Error al actualizar el evento con más participantes, ', e);
                    }
                    
                }


                // Actualizar total recaudado de la tabla

                let numRecaudActual = parseInt(participantEvent.children[4].textContent);
                    
                    try {
                        const resp = await fetch(url + "events/" + participantEventValue);
                        const event = await resp.json();
                        
                        numRecaudActual += parseInt(event.price);
                        participantEvent.children[4].textContent = parseInt(numRecaudActual);
                        

                    } catch (e) {
                        console.error('Error al actualizar el evento con más participantes, ', e);
                    }
                    
                


            } catch (e) {
                console.error('No se ha podido añadir el participante, ', e);
            }

        // Algún dato es inválido
        } else {
            eventForm.appendChild(errors);
        }

    })


    // Cargar tabla de eventos Y rellenar el evento con más participantes

    const retrieveEventList = async () => {
        try {
            const resp = await fetch(url + "events");
            const events = await resp.json();

            events.forEach(async event => {

                const respLocations = await fetch(url + "locations/" + event.locationId);
                const location = await respLocations.json();


                const respParticipants = await fetch(url + "participants");
                const participants = await respParticipants.json();
                const filteredParticipants = participants.filter(part => part.eventId === event.id);
                
                const numParticipants = filteredParticipants.length;
                const maxRecaudation = event.price * numParticipants;
                

                // Guardo el evento con más participantes
                if (biggestEvent === "" || maxParticipants < numParticipants) {
                    biggestEvent = event;
                    maxParticipants = numParticipants;

                }


                const row = document.createElement('tr');
                row.innerHTML = `
                                <td><a href='details.html?id=${event.id}'>${event.name}</a></td>
                                <td>${event.date}</td>
                                <td>${location.name}</td>
                                <td>${numParticipants}</td>
                                <td>${maxRecaudation}</td>
                                `;

                row.id = "event" + event.id; // Le añado un id para modificarlo luego rápidamente

                eventsBodyTable.appendChild(row);

                checkBiggestEvent();
            })


        } catch (e) {
            console.error('Error al intentar cargar la lista de eventos, ', e);
        }


    }

    retrieveEventList();
    
    // Actualizo los datos del evento con más participantes
    const nameMaxEvent = document.getElementById('popular-event-name');
    const participantsMaxEvent = document.getElementById('popular-event-participants');

    const checkBiggestEvent =  () => {
        nameMaxEvent.textContent = biggestEvent.name;
        participantsMaxEvent.textContent = maxParticipants;
    }

})