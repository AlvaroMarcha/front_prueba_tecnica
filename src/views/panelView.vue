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



</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}

div{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;

    background: linear-gradient(#434b56, white);

}

h2{
    display: block;
    width: 100%;
    height: 70px;
    text-align: center;
    padding-top: 15px;
    background-color: rgb(25, 49, 84);
    color: white;

}

h3{
    display: block;
    width: 100%;
    height: 30px;
    text-align: center;
    padding-top: 5px;
    margin-bottom: 20px;
    background-color: #434b56;
    color: white;

}

table, tr, td, th{
    border: 1px solid rgba(0, 59, 103, 0.799);
}

th{
    color: rgb(0, 47, 81);
}

td{
    text-align: center;
    color: white;
}


</style>