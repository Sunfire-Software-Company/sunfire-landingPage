document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const message = formData.get('message');
      
      // Validación básica
      if (!firstName.trim()) {
        alert('Por favor ingresa tu nombre');
        return;
      }
      
      if (!lastName.trim()) {
        alert('Por favor ingresa tu apellido');
        return;
      }
      
      if (!email.trim() || !email.includes('@')) {
        alert('Por favor ingresa un email válido');
        return;
      }
      
      if (!message.trim()) {
        alert('Por favor ingresa un mensaje');
        return;
      }
      
      // Crear mensaje para WhatsApp
const whatsappMessage = `Hola!, mi nombre es ${firstName || 'No proporcionado'} ${lastName || 'No proporcionado'}. Estoy interesado en algunas de las soluciones SunFire Software Company.

Aquí te comparto mi información:
Email: ${email || 'No proporcionado'}
Teléfono: ${phone || 'No proporcionado'}

Mensaje: ${message}`;
      
      // Número de WhatsApp (reemplaza con tu número real)
      const whatsappNumber = '9932911393'; 
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      // También puedes enviar por email
      const mailtoUrl = `mailto:hello@sunfire.com?subject=Contacto desde la web - ${firstName} ${lastName}&body=${encodeURIComponent(whatsappMessage)}`;
      
      // Preguntar al usuario qué método prefiere
      const userChoice = confirm('Estás a punto de contactar a Sunfire. ¿Quieres usar WhatsApp? (Aceptar para WhatsApp, Cancelar para Email)');
      
      if (userChoice) {
        window.open(whatsappUrl, '_blank');
      } else {
        window.location.href = mailtoUrl;
      }
      
      // Limpiar formulario
      form.reset();
    });
  }
});