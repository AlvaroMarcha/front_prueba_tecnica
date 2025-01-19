<template>
    <form @submit.prevent="login">
        <input type="text" v-model="email" placeholder="Email">
        <input type="password" v-model="password" placeholder="Password">
        <button type="submit">Entrar</button>
    </form>

</template>
<script setup>
import { useRouter } from 'vue-router';

const router=useRouter();
let email="";
let password="";

//Method to login user
const login=()=>{
    if(email==="admin" && password==="1234"){
        router.push("/panel");
        alert("Credenciales correctas");
    }else{
        alert("Credenciales incorrectas");
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
    width: 50%;
    height: 250px;
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
</style>