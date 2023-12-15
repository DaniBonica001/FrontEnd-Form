import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import Styles from "./Register.module.css";
import tarjeta_icon from "../../assets/identificacion.png";
import email_icon from "../../assets/correo.png";
import user_icon from "../../assets/usuario.png";
import pass_icon from "../../assets/bloquear.png";

const baseUrl = import.meta.env.VITE_CONNECCTION_STRING;

function Register() {
  const [error, setError] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      Nombre: "",
      Apellido: "",
      NumeroIdentificacion: "",
      Email: "",
      TipoIdentificacion: "",
      Usuario1: "",
      Pass: "",
    },
  });

  function handleError() {
    setError((error) => !error);
  }

  const handleInputChange = () => {
    // Elimina la clase de error cuando el usuario comienza a escribir
    if (error) {
      setError(false);
    }
  };

  const fieldValidation = (event) => {
    if (
      event.Nombre == "" ||
      event.Apellido == "" ||
      event.NumeroIdentificacion == "" ||
      event.Email == "" ||
      event.TipoIdentificacion == "" ||
      event.Usuario1 == "" ||
      event.Pass == ""
    ) {
      handleError();
    }else{
      onsubmit(event)
    }
  };

  const onSubmit = async (event) => {
    console.log("evento");
    console.log(event);

    const { data } = await axios.post(
      `${baseUrl}/api/personas/register`,
      {
        Nombre: event.Nombre,
        Apellido: event.Apellido,
        NumeroIdentificacion: event.NumeroIdentificacion,
        Email: event.Email,
        TipoIdentificacion: event.TipoIdentificacion,
        Usuario1: event.Usuario1,
        Pass: event.Pass,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": baseUrl,
        },
      }
    );

    console.log("respuesta del back del registro");
    console.log(data);

    if (data == "CREATED") {
      alert("Usuario creado correctamente");
    } else {
      alert("Error al crear el usuario");
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h1 className={Styles.text}>Registro</h1>
        <div className={Styles.underline}></div>
      </div>

      <form onSubmit={handleSubmit(fieldValidation)}>
        <div className={Styles.inputs}>
          <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
            <img src={user_icon} alt="" width={30} />
            <input {...register("Nombre")} type="text" placeholder="Nombre" />
          </div>

          <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
            <img src={user_icon} alt="" width={30} />
            <input
              {...register("Apellido")}
              type="text"
              placeholder="Apellido"
            />
          </div>

          <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
            <img src={tarjeta_icon} alt="" width={30} />
            <input
              {...register("NumeroIdentificacion")}
              type="text"
              placeholder="Numero de identificacion"
            />
          </div>

          <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
            <img src={email_icon} alt="" width={30} />
            <input {...register("Email")} type="email" placeholder="Email" />
          </div>

          <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
            <img src={tarjeta_icon} alt="" width={30} />
            <select
              {...register("TipoIdentificacion")}
              className={Styles.customSelect}
            >
              <option value="CC">Cedula de ciudadania</option>
              <option value="CE">Cedula de extranjeria</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="PP">Pasaporte</option>
            </select>
          </div>

          <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
            <img src={user_icon} alt="" width={30} />
            <input
              {...register("Usuario1")}
              type="text"
              placeholder="Nombre de usuario"
            />
          </div>

          <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
            <img src={pass_icon} alt="" width={30} />
            <input
              {...register("Pass")}
              type="password"
              placeholder="Contraseña"
            />
          </div>
        </div>

        <div className={Styles.buttons}>
          <Link to={"/"} className={Styles.noUnderline}>
            <button className={Styles.buttonGray}>Ingresar</button>
          </Link>

          <button className={Styles.buttonSubmit} type="submit">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
