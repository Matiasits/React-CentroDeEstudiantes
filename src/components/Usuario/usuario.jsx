import React, { useState, useEffect } from 'react';
import { Table, Alert, Carousel  } from 'react-bootstrap';
import { ImSpinner3 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import CrearUsuarioModal from './crearUsuarioModal';
import EditarUsuarioModal from './editarUsuarioModal'; 
import EliminarUsuarioModal from './eliminarUsuarioModal'; 
import Carrusel from '../Carrusel/carrusel'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './usuario.css';

export const Usuario = () => {
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);
  const [error, setError] = useState(null);
  const [showEliminarModal, setShowEliminarModal] = useState(false);

  const handleOpenCrearModal = () => setShowCrearModal(true);

  const handleCloseCrearModal = () => {
    setShowCrearModal(false);
    setMensajeExito("Usuario creado exitosamente.");
  };

  const handleOpenEditarModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowEditarModal(true);
  };

  const handleCloseEditarModal = () => {
    setShowEditarModal(false);
    setUsuarioSeleccionado(null);
  };

  const handleOpenEliminarModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowEliminarModal(true);
  };
  
  const handleCloseEliminarModal = () => {
  setShowEliminarModal(false);
  setUsuarioSeleccionado(null);
  setMensajeExito("Usuario eliminado exitosamente.");
  }
  
  const handleConfirmDelete = async () => {
    try {
      if (usuarioSeleccionado && usuarioSeleccionado.idUsuario) {
        const response = await fetch(`https://localhost:7222/api/usuario/${usuarioSeleccionado.idUsuario}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          fetchData(); // Asegúrate de que fetchData maneje el estado de usuarioSeleccionado correctamente
        } else {
          console.error('Error al eliminar usuario');
        }
      } else {
        console.error('Usuario seleccionado o su ID es nulo o indefinido');
      }
    } catch (error) {
      console.error('Error de red al eliminar usuario', error);
    } finally {
      // Cierra el modal después de eliminar el usuario, independientemente del resultado
      handleCloseEliminarModal();
    }
  };

  const fetchData = async () => {
    try {
      let response = await fetch("https://localhost:7222/api/usuario");
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      let json = await response.json();
      setUsuario(json);
    } catch (error) {
      setError(`Error al obtener datos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [usuarioSeleccionado]);


  return (
    <>
    
    <Carrusel />
    
      {mensajeExito && (
        <Alert variant="success" onClose={() => setMensajeExito(null)} dismissible>
          {mensajeExito}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      
      
      <div className="container mt-4">
      {loading ? (
        <div className='spinner'><ImSpinner3 /></div>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Id Rol</th>
                <th>
                  <Link onClick={handleOpenCrearModal} className="btn btn-primary">Crear</Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {usuario.map((usuario) => (
                <tr key={usuario.idUsuario}>
                  <td>{usuario.idUsuario}</td>
                  <td>{usuario.nombreCompleto}</td>
                  <td>{usuario.correoElectronico}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.idRol}</td>
                  <td>
                    <Link onClick={() => handleOpenEditarModal(usuario)} className="btn btn-secondary">Editar</Link>
                    <Link
                      onClick={() => handleOpenEliminarModal(usuario)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </Link>                 
                </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <CrearUsuarioModal showModal={showCrearModal} onClose={handleCloseCrearModal} />
          {usuarioSeleccionado && (
            <EditarUsuarioModal
              showModal={showEditarModal}
              onClose={handleCloseEditarModal}
              usuario={usuarioSeleccionado}
            />
          )}
          
          
          <EliminarUsuarioModal
              showModal={showEliminarModal}
              onClose={handleCloseEliminarModal}
              onConfirmDelete={handleConfirmDelete}
              usuarioSeleccionado={usuarioSeleccionado}
            />
        </>
      )}
      </div>
    </>
  );
};

export default Usuario;
