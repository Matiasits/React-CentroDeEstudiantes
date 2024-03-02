import React, { useState, useEffect } from 'react';
import { Table, Alert, Carousel  } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

    
export const Carrusel = () => {
    return (
        <>
            <Carousel className="container mt-4 mb-4">
              {/* Aquí puedes agregar tus diapositivas del carrusel */}
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x400"  // Reemplaza con la URL de tus imágenes
                  alt="First slide"
                />
                {/* Puedes agregar contenido adicional para cada diapositiva si es necesario */}
                <Carousel.Caption>
                  <h3>Título de la Diapositiva</h3>
                  <p>Descripción de la diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
              
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x400"  // Reemplaza con la URL de tus imágenes
                  alt="First slide"
                />
                {/* Puedes agregar contenido adicional para cada diapositiva si es necesario */}
                <Carousel.Caption>
                  <h3>Título de la Diapositiva</h3>
                  <p>Descripción de la diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
              
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x400"  // Reemplaza con la URL de tus imágenes
                  alt="First slide"
                />
                {/* Puedes agregar contenido adicional para cada diapositiva si es necesario */}
                <Carousel.Caption>
                  <h3>Título de la Diapositiva</h3>
                  <p>Descripción de la diapositiva.</p>
                </Carousel.Caption>
              </Carousel.Item>
              {/* Agrega más elementos Carousel.Item según sea necesario */}
            </Carousel>
            
        </>
    );
}

export default Carrusel;