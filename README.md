# SobreRuedas

**Proyecto final de DAW (Autoescuela 2.0)**

**Nombre del proyecto:** SobreRuedas

**Alumnos:** Marta Corchado, Juan Oliva

**Dirección:** http://sobreruedas-dova.rhcloud.com/

**Descripción básica:**

Es una web de una autoescuela (para conseguir la licencia de tipo "B"), mostrando el seguimiento del alumno al administrador y al propio alumno, además de tener más roles.

**Analisis funcional:**

Bases de datos formada por alumnos, profesores y administradores.

La primera funcionalidad es la del registro de usuarios. Se pueden cambiar datos posteriormente.

En la parte del administrador se podrán realizar funciones administrativas. También tendrá acceso a un seguimiento de los alumnos, donde se podrá ver el historial de exámenes, los pagos efectuados y pendientes y se puede apuntar a los diversos tipo de examen.

La parte del alumno tendrá un gráfico donde se mostrará en que momento se encuentra en el proceso de la obtención de la licencia: estudiando la teórica, realizando las clases prácticas o preparándose para subir al examen final.

Si se encuentra en la parte de la teoría, tendrá acceso a los test online y a pequeñas explicaciones clave, así como a videos cortos de alguna explicación. Se estudiará la viabilidad el pago online.

Si se encuentra en la parte práctica, tendrá acceso al horario de prácticas de su profesor, para escoger la hora. La cancelación de las prácticas se harán con una antelación de 24 horas, sino la práctica se cobrará igualmente. Se estudiará la viabilidad el pago online.

En la parte del profesor tendrá el acceso al horario de prácticas.

Todos los roles tendrán habilitada una parte social donde figurarán: ofertas especiales "Last minute", orla de los alumnos aprobados (fotografías con el carnet o la L), horarios generales de teórica, práctica y atención al cliente, formulario de consultas y enlaces a las principales redes sociales.

**Análisis no funcional:**

MEAN

Html5-CSS3-Jquery-Bootstrap

**Instalación e inicio:**

Para instalar este proyecto primero hay que clonarlo desde git con la siguiente función desde la línea de comando:

git clone https://github.com/CorchadoMarta/SobreRuedas.git

Después se instalan los módulos predefinidos:

npm install

Ahora ya está el proyecto instalado. Para arrancar el servidor hay que utilizar la siguiente función:

node app.js

Al hacer esto empezará a funcionar un servidor local en la dirección:

/localhost:2626

Ya está instalado y funcionando. Lo siguiente que vamos a hacer es ir a la página de registro, y añadir dos usuarios. Uno deberá de tener como nombre 'admin' y otro como nombre deberá tener 'profesor'. Una vez creados estos usuarios, vamos a otorgarles privilegios especiales. Volvemos a la línea de comando y ejecutamos un script que hará la función:

./admin-profe.sh

Con esto ya tenemos el servidor en marcha y tenemos dos usuarios especiales; un administrador y un profesor.

