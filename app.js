document.addEventListener("DOMContentLoaded", () => {
    const participantForm = document.getElementById("participantForm");
    const participantNameInput = document.getElementById("participantName");
    const participantList = document.getElementById("participantList");
    const expenseParticipant = document.getElementById("expenseParticipant");

    let participants = []; // Usamos un array para los participantes
    let expenses = []; // Usamos un array para los gastos

    participantForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = participantNameInput.value.trim();

        if (name.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            return;
        }

        if (participants.includes(name)) {
            alert("El nombre ya está registrado.");
            return;
        }

        participants.push(name);

        // Añadir a la lista de participantes
        const li = document.createElement("li");
        li.textContent = name;
        participantList.appendChild(li);

        // Añadir al selector de responsable de gasto
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        expenseParticipant.appendChild(option);

        // Limpiar el input
        participantNameInput.value = "";
    });

    const expenseForm = document.getElementById("expenseForm");
    const expenseType = document.getElementById("expenseType");
    const expenseDescription = document.getElementById("expenseDescription");
    const expenseAmount = document.getElementById("expenseAmount");

    expenseForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const type = expenseType.value;
        const description = expenseDescription.value.trim();
        const amount = parseFloat(expenseAmount.value);
        const participant = expenseParticipant.value;

        // Validaciones
        if (description.length < 3) {
            alert("La descripción debe tener al menos 3 caracteres.");
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            alert("El importe debe ser un número positivo.");
            return;
        }

        if (!participant) {
            alert("Debe seleccionar un responsable.");
            return;
        }

        // Crear elemento de gasto
        const expense = { type, description, amount, participant };
        expenses.push(expense);

        const li = document.createElement("li");
        li.textContent = `${participant} pagó ${amount.toFixed(2)}€ en ${type}: ${description}`;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete-button");
        li.appendChild(deleteButton);
        expenseList.appendChild(li);

        deleteButton.addEventListener("click", () => {
            expenses = expenses.filter(exp => exp !== expense); // Eliminar el gasto de la lista de gastos
            expenseList.removeChild(li);
        });

        expenseDescription.value = "";
        expenseAmount.value = "";
        expenseType.selectedIndex = 0;
        expenseParticipant.selectedIndex = 0;
    });

    const closeTripButton = document.getElementById("closeTripButton");
    const compensationList = document.getElementById("compensationList");

    closeTripButton.addEventListener("click", () => {
        if (participants.length === 0 || expenses.length === 0) {
            alert("Debe haber participantes y al menos un gasto para cerrar el viaje.");
            return;
        }

        // 1. Calcular el total de los gastos
        let totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        // 2. Calcular lo que cada participante debería haber pagado
        const amountPerParticipant = totalAmount / participants.length;

        // 3. Calcular cuánto ha pagado cada participante
        let payments = participants.map(participant => {
            let totalPaid = 0;
            expenses.forEach(expense => {
                if (expense.participant === participant) {
                    totalPaid += expense.amount;
                }
            });
            return { participant, totalPaid };
        });

        // 4. Calcular las compensaciones
        const balances = payments.map(payment => ({
            participant: payment.participant,
            balance: payment.totalPaid - amountPerParticipant
        }));

        // 5. Calcular las transferencias necesarias para equilibrar los pagos
        const positiveBalances = balances.filter(balance => balance.balance > 0);
        const negativeBalances = balances.filter(balance => balance.balance < 0);

        // Mostrar las transferencias necesarias
        compensationList.innerHTML = ""; // Limpiar la lista de compensaciones

        while (positiveBalances.length > 0 && negativeBalances.length > 0) {
            const positive = positiveBalances.pop();
            const negative = negativeBalances.pop();
            const transferAmount = Math.min(positive.balance, -negative.balance);

            const li = document.createElement("li");
            li.textContent = `${negative.participant} debe pagar ${transferAmount.toFixed(2)}€ a ${positive.participant}`;
            compensationList.appendChild(li);

            positive.balance -= transferAmount;
            negative.balance += transferAmount;

            // Actualizar los balances
            if (positive.balance > 0) positiveBalances.push(positive);
            if (negative.balance < 0) negativeBalances.push(negative);
        }
    });

    const newTripButton = document.getElementById("newTripButton");

    newTripButton.addEventListener("click", () => {
        // Limpiar el localStorage
        localStorage.clear();

        // Limpiar las listas de participantes y gastos en la interfaz
        participantList.innerHTML = "";
        expenseList.innerHTML = "";
        compensationList.innerHTML = "";

        // Limpiar los formularios
        participantNameInput.value = "";
        expenseDescription.value = "";
        expenseAmount.value = "";
        expenseParticipant.selectedIndex = 0;

        // Limpiar las variables de participantes y gastos
        participants = [];
        expenses = [];

        // Mostrar mensaje de confirmación
        alert("El viaje ha sido reiniciado. ¡Listo para planificar otro!");
    });
});
