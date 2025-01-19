<template>
    <form @submit.prevent="login">
        <input type="text" v-model="email" placeholder="Email">
        <input type="password" v-model="password" placeholder="Password">
        <button type="submit">Entrar</button>
        <p class="msg">{{ message }}</p>
    </form>

</template>
<script setup>
import { useRouter } from 'vue-router';
const router=useRouter();

import {ref} from "vue";
let message=ref("Introduce tus credenciales");
let email="";
let password="";
// Function to get all users
const login= async()=>{
    const response=await fetch("http://localhost:3000/users");
    const dataUser=await response.json();

    const findUser=dataUser.some((user)=>{
        let status=false;
        if(user.email==email && user.password==password){
            status=true;
        }
        message.value=ref("El usuario no existe o las credenciales son incorrectas");
        return status;
    });

    if(findUser){
        console.log("El usuario ha sido encontrado -> Dele pa dentro");
        router.push("/panel");
    }else{
        console.log("El usuario no se ha encontrado -> Mi loco dele pa fuera");
    }
}



</script>
<style scoped>
form{
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 300px;
    margin: auto;
    margin-top: 100px;
    border-radius: 20px;
    background-color: #434b56;
    box-shadow: 
    4px 4px 10px rgb(0, 110, 137),
    -4px -4px 10px rgba(0, 110, 137, 0.321);
}
input{
    width: 80%;
    height: 40px;
    text-align: center;
    outline: none;
    border-radius: 5px;
    font-size: medium;
    transition: all 0.4s ease-in-out;
}
input:focus{
    background-color: rgba(214, 214, 214, 0.851);
    color: rgb(0, 93, 159);
}
input:focus::placeholder{
    color: white;
}

button{
    display: block;
    width: 50%;
    height: 45px;
    font-size: medium;
    cursor: pointer;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    transition: all 0.4s ease-in-out;
    background-color: white;
    color: #434b56;

}

button:hover{
    background-color: rgb(0, 93, 159);
    color: white;
    transform: scale(1.1);
    box-shadow: 
    4px 4px 20px rgb(255, 255, 255),
    -4px -4px 20px rgba(255, 255, 255, 0.321);
}

.msg{
    color: white;

}
</style>