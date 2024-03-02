import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const CrearUsuarioModal = ({ showModal, onClose }) => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [telefono, setTelefono] = useState('');
  const [idRol, setIdRol] = useState('');

  const navigate = useNavigate(); 
  
  const handleCrearUsuario = async () => {
    try {
      const response = await fetch('https://localhost:7222/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreCompleto,
          correoElectronico,
          telefono,
          idRol,
        }),
      });

      if (response.ok) {
        navigate.push('/usuarios');
      } else {
        console.error('Error al crear usuario');
      }
    } catch (error) {
      console.error('Error de red al crear usuario', error);
    }
  };

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Inputs para los datos del usuario */}
          <Form.Group controlId="formNombreCompleto">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre completo"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group controlId="formCorreoElectronico">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre completo"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group controlId="formTelefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group controlId="formIdRol">
            <Form.Label>Id del Rol</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el id del Rol"
              value={idRol}
              onChange={(e) => setIdRol(e.target.value)}
            />
          </Form.Group>
          {/* ... (otros campos similares) */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleCrearUsuario}>
          Crear Usuario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CrearUsuarioModal;
