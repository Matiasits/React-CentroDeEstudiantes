import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const EliminarRolModal = ({ showModal, onClose, onConfirmDelete, rolSeleccionado }) => {
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Rol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {rolSeleccionado && rolSeleccionado.idRol ? (
          <p>¿Estás seguro de que deseas eliminar este rol?</p>
        ) : (
          <p>Error: No se ha proporcionado un rol válido.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        {rolSeleccionado && rolSeleccionado.idRol && (
          <Button variant="danger" onClick={onConfirmDelete}>
            Eliminar Rol
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EliminarRolModal;
