$(() => {
    const newTaskInput = $("#new-task");
    const addTaskButton = $("#add-task");

    // Agregar evento al presionar "Enter"
    newTaskInput.on("keydown", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    addTaskButton.on("click", addTask);

    function addTask() {
        const taskText = newTaskInput.val();
        if (taskText.trim() !== "") {
            const taskItem = $("<li>");
            const taskTextElement = $("<span>").text(taskText);
            const buttonContainer = $("<div>").addClass("button-container");
            const doneButton = $("<button>").text("Completar").addClass("done-button");
            const editButton = $("<button>").text("Editar").addClass("edit-button");
            const deleteButton = $("<button>").text("Eliminar").addClass("delete-button");

            function showToast(message) {
                const toast = $("#toast");
                toast.text(message);
                toast.show();
                setTimeout(function () {
                    toast.hide();
                }, 3000); // Ocultar el toast después de 3 segundos (ajusta el tiempo según tus preferencias)
            }

            doneButton.on("click", function() {
                if (taskItem.hasClass("completed")) {
                    // Tarea deshecha
                    taskItem.removeClass("completed");
                    doneButton.text("Completar");
                    deleteButton.show();
                    $("#todo-tasks").append(taskItem);
                    showToast("Tarea deshecha");
                } else {
                    // Tarea completada
                    taskItem.addClass("completed");
                    doneButton.text("Deshacer");
                    deleteButton.hide();
                    $("#completed-tasks").append(taskItem);
                    showToast("Tarea completada");
                }
            });

            editButton.on("click", function() {
                const newText = prompt("Editar tarea:", taskTextElement.text());
                if (newText !== null) {
                    taskTextElement.text(newText);
                }
            });

            deleteButton.on("click", function() {
                if (taskItem.closest("#deleted-tasks").length > 0) {
                    // Restaurar tarea
                    taskItem.removeClass("deleted");
                    deleteButton.text("Eliminar");
                    doneButton.show();
                    $("#todo-tasks").append(taskItem);
                    showToast("Tarea restaurada");
                } else {
                    // Eliminar tarea
                    taskItem.addClass("deleted");
                    deleteButton.text("Restaurar");
                    doneButton.hide();
                    $("#deleted-tasks").append(taskItem);
                    showToast("Tarea eliminada");
                }
            });

            buttonContainer.append(editButton, doneButton, deleteButton);
            taskItem.append(taskTextElement, buttonContainer);
            $("#todo-tasks").append(taskItem);
            newTaskInput.val("");
        }
    }
});