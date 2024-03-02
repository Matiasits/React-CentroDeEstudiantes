import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const CrearRolModal = ({ showModal, onClose }) => {
  const [idRol, setIdRol] = useState('');
  const [nombreRol, setNombreRol] = useState('');

  const navigate = useNavigate();

  const handleCrearRol = async () => {
    try {
      const response = await fetch('https://localhost:7222/rol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idRol,
          nombreRol,
        }),
      });

      if (response.ok) {
        navigate.push('/rol');
      } else {
        console.error('Error al crear rol');
      }
    } catch (error) {
      console.error('Error de red al crear rol', error);
    }
  };

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Rol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formIdRol">
            <Form.Label>ID del Rol</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el ID del Rol"
              value={idRol}
              onChange={(e) => setIdRol(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formNombreRol">
            <Form.Label>Nombre del Rol</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del Rol"
              value={nombreRol}
              onChange={(e) => setNombreRol(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleCrearRol}>
          Crear Rol
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CrearRolModal;
