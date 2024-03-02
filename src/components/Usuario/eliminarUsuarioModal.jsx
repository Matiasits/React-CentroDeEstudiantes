import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const EliminarUsuarioModal = ({ showModal, onClose, onConfirmDelete, usuarioSeleccionado }) => {
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {usuarioSeleccionado && usuarioSeleccionado.idUsuario ? (
          <p>¿Estás seguro de que deseas eliminar este usuario?</p>
        ) : (
          <p>Error: No se ha proporcionado un usuario válido.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        {usuarioSeleccionado && usuarioSeleccionado.idUsuario && (
          <Button variant="danger" onClick={onConfirmDelete}>
            Eliminar Usuario
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EliminarUsuarioModal;
