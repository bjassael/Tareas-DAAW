Instrucciones API
=================

La API books funciona con Django Rest Framework.


Instrucciones para correr el servidor:

1. Instalar las dependencias. En caso de tener Pipenv instalado (es un manejador de dependecias), en el directorio donde se encuentra el Pipfile correr el comando `pipenv install`. Esto instala las depencias. En otro caso, instalar las dependencias a mano o como se prefiera (con pip o dentro de un ambiente virtual). Las dependecias se pueden ver en el Pipfile.
2. Correr las migraciones. Esto creará la base de datos. Dentro del ambiente donde se instalaron las dependencias (ya sea un ambiente virtual creado con Pipenv o no), en el directorio donde se encuentra el archivo `manage.py` ejecutar el comando: `./manage.py migrate`
3. Correr el servidor. En el mismo directorio anterior ejecutar: `./manage.py runserver`
4. El servidor debería estar accesible en: `localhost 8000`.