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
  const [tipoIdValue, setTipoIdValue] = useState();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      idNumber: "",
      email: "",
      tipoId: "",
      username: "",
      password: "",
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
    if (event.name == "" || event.lastname == "" || event.idNumber == "" || event.email=="" || event.tipoId=="" || event.username=="" || event.password=="") {
      handleError();
    } else {
      onSubmit(event);
    }
  };

  const onSubmit = async (event) => {
    const { data } = await axios.post(
      `${baseUrl}/api/personas/register`,
      {
        name: event.name,
        lastname: event.lastname,
        idNumber: event.idNumber,
        email: event.email,
        tipoId: tipoIdValue,
        username: event.username,
        password: event.password,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": baseUrl,
        },
      }
    );

    console.log("respuesta del back del registro");
    console.log(data);
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
            <input {...register("name")} type="text" placeholder="Nombre" onChange={handleInputChange}/>
          </div>

          <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
            <img src={user_icon} alt="" width={30} />
            <input
              {...register("lastname")}
              type="text"
              placeholder="Apellido" onChange={handleInputChange}
            />
          </div>

          <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
            <img src={tarjeta_icon} alt="" width={30} />
            <input
              {...register("idNumber")}
              type="text"
              placeholder="Numero de identificacion" onChange={handleInputChange}
            />
          </div>

          <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
            <img src={email_icon} alt="" width={30} />
            <input {...register("email")} type="email" placeholder="Email" onChange={handleInputChange}/>
          </div>

          <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
            <img src={tarjeta_icon} alt="" width={30} />
            <select
              name="tipoId"
              id="tipoId"
              onChange={(event) => {
                setTipoIdValue(event.target.value);
                handleInputChange;
              }}
              {...register("tipoId")}
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
              {...register("username")}
              type="text"
              placeholder="Nombre de usuario" onChange={handleInputChange}
            />
          </div>

          <div className={[Styles.input, `${error? Styles.inputError: ""}`].join(' ')}>
            <img src={pass_icon} alt="" width={30} />
            <input
              {...register("password")}
              type="password"
              placeholder="Contraseña" onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={Styles.buttons}>
          <Link to={"/"} className={Styles.noUnderline}>
            <button type="submit" className={Styles.buttonGray}>
              Ingresar
            </button>
          </Link>

          <button className={Styles.buttonSubmit}>Registrar</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
