import React, { useEffect, useRef, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import Button from "../components/Button";

var stompClient = null;

const Chat = () => {
  //Los hoooks useState tienen valores de entrada y una función para actualizar los estado
  const [messages, setMessages] = useState([]);
  const [inputMessages, setInputMessages] = useState("");
  const [conectarActivo, setConectarActivo] = useState(false);
  const [desconectarActivo, setDesconectarActivo] = useState(false);
  //El hook useRef utilzamos para hacer el scroll automáticamente a la parte inferior de la lista cuando se agregan nuevos mensajes.
  const mensajesRef = useRef(null);
  //Es una función de manejo de eventos 
  const handleConectarClick = () => {
    //Es para activar el estado 'conectarActivo'
    setConectarActivo(true);
    //Es para desactivar el estado 'desconectarActivo'
    setDesconectarActivo(false);
    //Es para establecer la conexión con el servidor 'WebSocket'
    conectar();
  };

  const handleDesconectarClick = () => {
    //Es para desactivar el estado 'conectarActivo'
    setConectarActivo(false);
    //Es para activar el estado 'desconectarActivo'
    setDesconectarActivo(true);
    //Es para cerrar la conexión con el servidor 'WebSocket'
    desconectar();
  };
  //Esta función crea la conexión con el servidor 'WebSocket'
  const conectar = () => {
    //se crea una instancia de SockJS con la URL del servidor WebSocket ("http://localhost:8181/ws" en este caso) utilizando new SockJS("http://localhost:8181/ws")
    let Sock = new SockJS("http://localhost:8181/ws");
    //la función over() se utiliza para obtener un cliente Stomp sobre la instancia de SockJS, que se guarda en la variable stompClient
    stompClient = over(Sock);
    //En la función connect() del cliente Stomp para establecer la conexión con el servidor WebSocket
    stompClient.connect({}, onConnected, (e) => console.log(e));
  };
  //Esta función cierra la conexión con el servidor 'WebSocket'
  const desconectar = () => {
    //Si stompClient existe, se llama a la función disconnect() del cliente Stomp para cerrar la conexión con el servidor.
    if (stompClient) {
      stompClient.disconnect();
      console.log("desconectado");
    }
  };
  //Es una función de devolución de llamada que se ejecuta cuando la conexión con el servidor WebSocket es exitosa
  const onConnected = () => {
    //Se imprime en la consola el mensaje "connected" cuando la conexión con el servidor WebSocket es exitosa
    console.log("connected");
    //Utiliza el cliente Stomp (stompClient) para suscribirse a un destino específico de mensajes en el servidor WebSocket
    stompClient.subscribe("/destino/mensaje", mensajeRecibido);
  };
  //Es una función de devolución de llamada que se ejecuta cuando se recibe un mensaje del servidor WebSocket
  const mensajeRecibido = (payload) => {
    const parsedBody = JSON.parse(payload.body);
    //Utiliza la función setMessages() para actualizar el estado de los mensajes en la aplicación de chat
    setMessages((prevMessages) => [...prevMessages, parsedBody]);
    //Realiza un desplazamiento al último mensaje
    scrollToLastMessage();
  };
  //Es una función que se ejecuta cuando el usuario envía un mensaje desde la interfaz de usuario
  const enviarMensaje = () => {
    if (stompClient && inputMessages.trim() !== "") {
      let sendBid = {
        mensaje: inputMessages,
      };
      //Utiliza el cliente Stomp (stompClient) para enviar un mensaje al servidor WebSocket
      stompClient.send("/app/saludo", {}, JSON.stringify(sendBid));
      //Utiliza la función setInputMessages() para limpiar el contenido del input de mensajes en la interfaz de usuario después de enviar el mensaje
      setInputMessages("");
    }
  };
  //es una función que se encarga de desplazar la vista de la interfaz de usuario hasta el final de la ventana de chat
  const scrollToLastMessage = () => {
    //Verifica si la referencia mensajesRef existe en el DOM
    if (mensajesRef.current) {
      //Actualiza la posición de desplazamiento y actualiza la posición de desplazamiento vertical del elemento
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  };
  //Es una constante que almacena el código numérico correspondiente a la tecla "Enter" en el teclado
  const ENTER_KEY_CODE = 13;
  //Es una función de manejo de eventos que se ejecuta cuando se detecta una pulsación de tecla en el input de mensajes
  const handleEnterKey = (event) => {
    //Verifica si el código de la tecla presionada (event.keyCode) coincide con el código de la tecla "Enter" almacenado en la constante ENTER_KEY_CODE
    if (event.keyCode === ENTER_KEY_CODE) {
      //Detecta que se presionó la tecla "Enter", llama a la función enviarMensaje() que se encarga de enviar el mensaje al servidor
      enviarMensaje();
    }
  };
  //Es un efecto de React que se ejecuta cuando el estado messages cambia
  useEffect(() => {
    //Llama a la función scrollToLastMessage() para desplazar la vista hasta el último mensaje cada vez que el estado messages cambie, osea muestra el último mensaje
    scrollToLastMessage();
  }, [messages]);

  return (
    //Es el contenedor principal de la aplicación de chat
    <div className="containerChat">
      {/* Es el contenedor que representa la sección de conexión, contiene dos botones para "Conectar" y "Desconectar" la conexión WebSocket */}
      <div className="conexion">
        <label>Conexión de WebSocket:</label>
        <div className="buttonCD">
          {/* Acá se muestra múltiples funciones, que son componentes */}
          <Button
            className={conectarActivo ? "buttonConectar activo" : "buttonDefault"}
            onClick={handleConectarClick}
            titulo="Conectar"
          />
          <Button
            className={desconectarActivo ? "buttonDesconectar activo" : "buttonDefault"}
            onClick={handleDesconectarClick}
            titulo="Desconectar"
          />
        </div>
      </div>
      {/* Es el contenedor que representa la cabecera de la aplicación de chat */}
      <div className="header">
        <h1 className="title">
          React Chat App || chatting!</h1>
      </div>
      {/* Es el contenedor principal del contenido principal de la aplicación de chat */}
      <div className="main">
        {/* Es el contenedor que representa la sección de mensajes del chat, tiene una referencia mensajesRef asociada a él, que se utiliza para acceder a este elemento en el DOM y manipular la posición de desplazamiento vertical */}
        <div className="contenedorChat" ref={mensajesRef}>
          {/* Es una expresión de mapeo en línea que filtra los mensajes en el estado messages para obtener aquellos que tienen un mensaje válido (no vacío ni con espacios en blanco) y luego los representa como elementos de mensaje en la interfaz de usuario, y utiliza una clave única key para identificar cada mensaje en el mapeo */}
          {messages.filter((item) => item.mensaje && item.mensaje.trim() !== "").map((item, key) => (
            <div
              key={key}
              className="mensajeEnviado"
            >
              <div>{item.mensaje}</div>
            </div>
          ))}
        </div>
        <div className="input-button">
          <input
            className="inputF"
            onKeyDown={handleEnterKey}
            placeholder="Escribir mensaje aquí ..."
            type="text"
            onChange={(e) => setInputMessages(e.target.value)}
            value={inputMessages}
          ></input>
          <Button className="buttonF" onClick={enviarMensaje} titulo="Enviar" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
