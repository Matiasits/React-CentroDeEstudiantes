import React, { useState, useEffect } from 'react';
import { Table, Alert  } from 'react-bootstrap';
import { ImSpinner3 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import Carrusel from '../Carrusel/carrusel';
import EditarRolModal from './editarRolModal'
import EliminarRolModal from './eliminarRolModal';
import CrearRolModal from './crearRolModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './rol.css';

export const Rol = () => {
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rol, setRol] = useState([]);
  const [error, setError] = useState(null);
  const [showEliminarModal, setShowEliminarModal] = useState(false);

    const handleOpenCrearModal = () => setShowCrearModal(true);
    const handleCloseCrearModal = () => {
      setShowCrearModal(false);
      setMensajeExito("Rol creado exitosamente.");
    };

    const handleOpenEditarModal = (rol) => {
      setRolSeleccionado(rol);
      setShowEditarModal(true);
    };
    const handleCloseEditarModal = () => {
      setShowEditarModal(false);
      setRolSeleccionado(null);
    };
    
    const handleOpenEliminarModal = (rol) => {
      setRolSeleccionado(rol);
      setShowEliminarModal(true);
    };
    const handleCloseEliminarModal = () => {
    setShowEliminarModal(false);
    setRolSeleccionado(null);
    setMensajeExito("Rol eliminado exitosamente.");
    }
  
  const handleConfirmDelete = async () => {
    try {
      if (rolSeleccionado && rolSeleccionado.idRol) {
        const response = await fetch(`https://localhost:7222/rol/${rolSeleccionado.idRol}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          fetchData(); 
        } else {
          console.error('Error al eliminar rol');
        }
      } else {
        console.error('Rol seleccionado o su ID es nulo o indefinido');
      }
    } catch (error) {
      console.error('Error de red al eliminar rol', error);
    } finally {
        handleCloseEditarModal();
    }
  };

  const fetchData = async () => {
    try {
      let response = await fetch("https://localhost:7222/rol");
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      let json = await response.json();
      setRol(json);
    } catch (error) {
      setError(`Error al obtener datos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [rolSeleccionado]);


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
                <th>Nombre de Rol</th>
                <th>
                  <Link onClick={handleOpenCrearModal} className="btn btn-primary">Crear</Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {rol.map((rol) => (
                <tr key={rol.idRol}>
                  <td>{rol.idRol}</td>
                  <td>{rol.nombreRol}</td>
                  <td>
                    <Link onClick={() => handleOpenEditarModal(rol)} className="btn btn-secondary">Editar</Link>
                    <Link
                      onClick={() => handleOpenEliminarModal(rol)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </Link>                 
                </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <CrearRolModal showModal={showCrearModal} onClose={handleCloseCrearModal} />
          {rolSeleccionado && (
            <EditarRolModal
              showModal={showEditarModal}
              onClose={handleCloseEditarModal}
              rol={rolSeleccionado}
            />
          )}
          
          
          <EliminarRolModal
              showModal={showEliminarModal}
              onClose={handleCloseEliminarModal}
              onConfirmDelete={handleConfirmDelete}
              rolSeleccionado={rolSeleccionado}
            />
        </>
      )}
      </div>
    </>
  );
};

export default Rol;
