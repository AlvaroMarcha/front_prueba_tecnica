<template>
    <div>
        <h2>PANEL DE CONTROL</h2>
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
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user._id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.password }}</td>
                    <td>
                        <button>Editar</button>
                        <button @click="deleteUser(user._id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="6">Usuarios desde Mongo Atlas</td>
                </tr>
            </tfoot>
        </table>
        <div class="add">
            +
        </div>
        <div class="form-add">
            <form @submit.prevent="addUser">
                <input type="text" placeholder="Nombre" v-model="nameAdd">
                <input type="tel" placeholder="Numero" v-model="phoneAdd">
                <input type="email" placeholder="Email" v-model="emailAdd">
                <input type="text" placeholder="Contraseña" v-model="passwordAdd">
                <button type="submit">Crear</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";

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
        console.log("Ok");
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
const deleteUser=async(id)=>{
    const response = await fetch("http://localhost:3000/users/delete/"+id,
        {
            method: "DELETE"
        }
    );

    if (response.ok) {
        console.log("Ok");
        await getUsers();
    } else {
        console.log("ERROR");
    }

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

.add {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background: green;
    color: white;
    border-radius: 50%;
    cursor: pointer;

    position: fixed;
    bottom: 20px;
    right: 20px;

}
</style>