import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export const EditarRolModal = ({ showModal, onClose, rol }) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombreRol: '',
  });

  useEffect(() => {
    const fetchRolDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7222/rol/${rol.idRol}`);
        if (response.ok) {
          const rolData = await response.json();
          setFormData(rolData);
        } else {
          console.error('Error al obtener detalles del rol');
        }
      } catch (error) {
        console.error('Error de red al obtener detalles del rol', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRolDetails();
  }, [rol.idRol]);


  const handleEditRol = async () => {
    try {
      const response = await fetch(`https://localhost:7222/rol/${rol.idRol}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Cierra el modal después de editar exitosamente
        handleClose();
        // Puedes agregar una función adicional aquí para notificar sobre la edición
      } else {
        console.error('Error al editar rol');
      }
    } catch (error) {
      console.error('Error de red al editar rol', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleClose = () => {
    // Cierra el modal
    onClose();
    // Puedes agregar más lógica aquí si es necesario
  };

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Rol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Cargando detalles del Rol...</p>
        ) : (
          <Form>
            <Form.Group controlId="formnombreRol">
              <Form.Label>Nombre del Rol</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del rol"
                name="nombreRol"
                value={formData.nombreRol}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleEditRol}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditarRolModal;
