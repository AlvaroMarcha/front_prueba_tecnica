<template>
    <div>
        <h2>PANEL DE CONTROL</h2>
        <div class="form-add">
            <h2>CREAR USUARIO</h2>
            <form @submit.prevent="handlerAuxMethod">
                <input type="text" placeholder="Nombre" v-model="nameAdd">
                <input type="tel" placeholder="Numero" v-model="phoneAdd">
                <input type="email" placeholder="Email" v-model="emailAdd">
                <input type="text" placeholder="Contraseña" v-model="passwordAdd">
                <button type="submit">{{ statusButton }}</button>
            </form>
        </div>
        <h3>Lista de usuarios</h3>
        <table>
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>NOMBRE</th>
                    <th>NUMERO</th>
                    <th>EMAIL</th>
                    <th>CONTRASEÑA</th>
                    <th>ACCIONES</th>
                </tr>
            </thead>
            <!-- Here v-for to iterate elements (users) -->
            <tbody>
                <tr v-for="user in users" :key="user._id">
                    <td>{{ user._id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.password }}</td>
                    <td>
                        <button @click="editUser(user)" class="edit">Editar</button>
                        <button @click="deleteUser(user._id)" class="delete">Eliminar</button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="6">Usuarios desde Mongo Atlas</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>
<script setup>
import { ref } from "vue";

let statusButton = ref("Crear");
let isEditMode = ref(false);
let currentIdUpdateUser = ref("");

let users = ref([]);
const nameAdd = ref("");
const phoneAdd = ref("");
const emailAdd = ref("");
const passwordAdd = ref("");

//Method to get all users to list
const getUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    const dataUsers = await response.json();
    users.value = dataUsers;
}

getUsers();

//Method to add user
const addUser = async () => {
    const newUser = {
        name: nameAdd.value,
        phone: phoneAdd.value,
        email: emailAdd.value,
        password: passwordAdd.value
    };

    const response = await fetch("http://localhost:3000/users/add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser),
        }
    );

    if (response.ok) {
        console.log("Ok - agrego");
        await getUsers();
    } else {
        console.log("ERROR");
    }

    nameAdd.value = "";
    phoneAdd.value = "";
    emailAdd.value = "";
    passwordAdd.value = "";
}

//Method to delete user
const deleteUser = async (id) => {
    const response = await fetch("http://localhost:3000/users/delete/" + id,
        {
            method: "DELETE"
        }
    );

    if (response.ok) {
        console.log("Ok - elimino");
        await getUsers();
    } else {
        console.log("ERROR");
    }

}

//Method to update user
const editUser = async (user) => {
    isEditMode.value = true;
    statusButton.value = "Guardar";
    currentIdUpdateUser.value = user._id;

    nameAdd.value = user.name;
    phoneAdd.value = user.phone;
    emailAdd.value = user.email;
    passwordAdd.value = user.password;

}

const updateUser = async () => {
    const updateUser = {
        name: nameAdd.value,
        phone: phoneAdd.value,
        email: emailAdd.value,
        password: passwordAdd.value
    }

    const response = await fetch("http://localhost:3000/users/update/" + currentIdUpdateUser.value,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateUser)

        }
    );

    if (response.ok) {
        console.log("Ok - actualizo");
    } else {
        console.log("ERROR");
    }

}

//Method to handle submit update/create
const handlerAuxMethod = async () => {
    if (isEditMode.value) {
        await updateUser();
        console.log("Handler - actualizo");

        
    } else {
        await addUser();
        console.log("Handler - añado");
        

        
    }
    await getUsers();

    nameAdd.value = "";
    phoneAdd.value = "";
    emailAdd.value = "";
    passwordAdd.value = "";

    // Restablecer los estados
    isEditMode.value = false;
    statusButton.value = "Crear";
    currentIdUpdateUser.value = "";

}


</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}

div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;

    background: linear-gradient(#434b56, white);

}

h2 {
    display: block;
    width: 100%;
    height: 70px;
    text-align: center;
    padding-top: 15px;
    background-color: rgb(25, 49, 84);
    color: white;

}

h3 {
    display: block;
    width: 100%;
    height: 30px;
    text-align: center;
    padding-top: 5px;
    margin-bottom: 20px;
    background-color: #434b56;
    color: white;

}

table,
tr,
td,
th {
    border: 1px solid rgba(0, 59, 103, 0.799);
}

th {
    color: rgb(0, 47, 81);
}

td {
    text-align: center;
    color: white;
}

td button {
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;

    transition: all 0.5s ease;
}

td button.edit {
    width: max-content;
    background-color: rgb(0, 47, 81);
    color: yellow;
    margin-right: 5px;
}

td button.edit:hover {
    width: max-content;
    background-color: yellow;
    color: rgb(0, 47, 81);
    margin-right: 5px;
    font-weight: bolder;
}

td button.delete {
    width: max-content;
    background-color: rgb(0, 47, 81);
    color: red;
}

td button.delete:hover {
    width: max-content;
    background-color: rgb(253, 35, 35);
    color: rgb(0, 47, 81);
    font-weight: bolder;
}

.form-add {
    display: flex;
    width: 100%;
    height: max-content;
    padding: 20px;
}

.form-add form {
    display: flex;
    justify-content: center;
    align-items: center;


}

.form-add form input {
    display: block;
    width: 150px;
    height: 30px;
    text-align: center;

}

.form-add form button {
    display: block;
    width: 150px;
    height: 30px;
    border: none;
    border-bottom-right-radius: 5px;
    background-color: green;
    color: rgb(0, 47, 81);
    font-weight: bolder;
    cursor: pointer;

}

.form-add form button:hover {
    color: rgb(0, 47, 81);
    background-color: darkgreen;
}
</style>