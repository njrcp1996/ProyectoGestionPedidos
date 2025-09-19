import mysql from "mysql2/promise";



const pool = mysql.createPool({
  host: "localhost",
  user: "root",      // usuario de XAMPP
  password: "",      // contraseña (si tienes una en MySQL, cámbiala aquí)
  database: "proyectopedidos",
});

export default pool;




 
