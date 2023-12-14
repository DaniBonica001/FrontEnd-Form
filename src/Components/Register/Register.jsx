import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Styles from "./Register.module.css";
import user_icon from "../../assets/usuario.png";
import pass_icon from "../../assets/bloquear.png";

const baseUrl = "http://localhost:7841";

function Register() {
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

    if (data.Username != "") {
      console.log("Login successfull");
      //navigation("/register")
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h1 className={Styles.text}>Registro</h1>
        <div className={Styles.underline}></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={Styles.inputs}>
          <div className={Styles.input}>
            <img src={user_icon} alt="" width={30} />
            <input {...register("name")} type="text" placeholder="Nombre" />
          </div>

          <div className={Styles.input}>
            <img src={user_icon} alt="" width={30} />
            <input
              {...register("lastname")}
              type="text"
              placeholder="Apellido"
            />
          </div>

          <div className={Styles.input}>
            <img src={user_icon} alt="" width={30} />
            <input
              {...register("idNumber")}
              type="text"
              placeholder="Numero de identificacion"
            />
          </div>

          <div className={Styles.input}>
            <img src={user_icon} alt="" width={30} />
            <input {...register("email")} type="email" placeholder="Email" />
          </div>

          <div className={Styles.input}>
            <img src={user_icon} alt="" width={30} />
            <select
              name="tipoId"
              id="tipoId"
              onChange={(event) => setTipoIdValue(event.target.value)}
              {...register("tipoId")}
            >
              <option value="CC">Cedula de ciudadania</option>
              <option value="CE">Cedula de extranjeria</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="PP">Pasaporte</option>
            </select>
          </div>

          <div className={Styles.input}>
            <img src={user_icon} alt="" width={30} />
            <input
              {...register("username")}
              type="text"
              placeholder="Nombre de usuario"
            />
          </div>

          <div className={Styles.input}>
            <img src={pass_icon} alt="" width={30} />
            <input
              {...register("password")}
              type="password"
              placeholder="Contraseña"
            />
          </div>
        </div>

        <div className={Styles.buttons}>
          <Link to={"/"}>
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