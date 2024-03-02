import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export const EditarUsuarioModal = ({ showModal, onClose, usuario }) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    telefono: '',
    idRol: '',
  });

  useEffect(() => {
    // Solo carga los detalles del usuario cuando el componente se monta
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7222/api/usuario/${usuario.idUsuario}`);
        if (response.ok) {
          const userData = await response.json();
          setFormData(userData);
        } else {
          console.error('Error al obtener detalles del usuario');
        }
      } catch (error) {
        console.error('Error de red al obtener detalles del usuario', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [usuario.idUsuario]);


  const handleEditUser = async () => {
    try {
      const response = await fetch(`https://localhost:7222/api/usuario/${usuario.idUsuario}`, {
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
        console.error('Error al editar usuario');
      }
    } catch (error) {
      console.error('Error de red al editar usuario', error);
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
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Cargando detalles del usuario...</p>
        ) : (
          <Form>
            <Form.Group controlId="formNombreCompleto">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre completo"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCorreoElectronico">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el correo electrónico"
                name="correoElectronico"
                value={formData.correoElectronico}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formTelefono">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formIdRol">
              <Form.Label>Id del Rol</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el id del Rol"
                name="idRol"
                value={formData.idRol}
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
        <Button variant="primary" onClick={handleEditUser}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditarUsuarioModal;
