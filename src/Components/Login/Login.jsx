import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Styles from './Login.module.css'
import user_icon from '../../assets/usuario.png'
import pass_icon from '../../assets/bloquear.png'

const baseUrl = "http://localhost:7841";


function Login() {

    const {register, handleSubmit} = useForm({
        defaultValues:{
            username:"",
            password:""
        }
    })


    const onSubmit = async (event)=>{
        const {data} = await axios.post(
            `${baseUrl}/api/usuarios/login`,
            {
                username: event.username,
                password: event.password
            },
            {
                headers:{
                    "Access-Control-Allow-Origin": baseUrl
                }
            }
        )

        if (data.Username != ""){
            console.log("Login successfull")
            alert("El usuario ha sido encontrado en la base de datos exitosamente")
        }else{
            alert("El usuario no ha sido encontrado en la base de datos")
        }
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.header}>
                <h1 className={Styles.text}>Ingreso</h1>
                <div className={Styles.underline}></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={Styles.inputs}>
                    <div className={Styles.input}>
                        <img src={user_icon} alt="" width={30}/>
                        <input {...register("username")} type="text" placeholder="Nombre de usuario"/>
                    </div>

                    <div className={Styles.input}>
                        <img src={pass_icon} alt="" width={30}/>
                        <input {...register("password")} type="password" placeholder="Contraseña"/>
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