import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Styles from './Login.module.css'
import user_icon from '../../assets/usuario.png'
import pass_icon from '../../assets/bloquear.png'
import { useState } from "react";

const baseUrl = import.meta.env.VITE_CONNECCTION_STRING;

function Login() {
    
    const [error,setError]=useState(false)

    const {register, handleSubmit,reset} = useForm({
        defaultValues:{
            username:"",
            password:""
        }
    })

    function handleError(){
        setError((error)=> !error)
    }

    const handleInputChange = () => {
        // Elimina la clase de error cuando el usuario comienza a escribir
        if (error) {
            setError(false);
        }
    }

    const fieldValidation = (event) =>{
        if (event.username == '' || event.password == ''){
            handleError()
        }else{
            
            onSubmit(event.username,event.password)
        }
    }
    
    const onSubmit = async (username,password)=>{

        const {data} = await axios.post(
            `${baseUrl}/api/usuarios/login`,
            {
                username: username,
                password: password
            },
            {
                headers:{
                    "Access-Control-Allow-Origin": baseUrl
                }
            }
        )

        //console.log("respuesta del back del login")
        //console.log(data)

        
        if (data.username != ''){
            console.log("Login successfull")
            alert("El usuario ha sido encontrado en la base de datos exitosamente")
            reset()
        }else {
            alert("El usuario no ha sido encontrado en la base de datos")
            reset()
        }
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.header}>
                <h1 className={Styles.text}>Ingreso</h1>
                <div className={Styles.underline}></div>
            </div>

            <form onSubmit={handleSubmit(fieldValidation)}>
                <div className={Styles.inputs}>

                    <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
                        <img src={user_icon} alt="" width={30}/>
                        <input {...register("username")} type="text" placeholder="Nombre de usuario" onChange={handleInputChange}/>
                    </div>

                    <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
                        <img src={pass_icon} alt="" width={30}/>
                        <input {...register("password")} type="password" placeholder="Contraseña" onChange={handleInputChange}/>
                    </div>
                </div>
                
                <div className={Styles.buttons}>
                    <button type="submit" className={Styles.buttonSubmit}>Ingresar</button>

                    <Link to={"/register"} className={Styles.noUnderline}>
                    <button className={Styles.buttonGray}>Registrar</button>
                    </Link>
                   
                </div>
            </form>
           
        </div>
     );
}

export default Login;