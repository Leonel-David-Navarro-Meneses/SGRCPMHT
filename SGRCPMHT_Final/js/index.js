const usuario = document.getElementById('user');
const password = document.getElementById('pass');
const formulario = document.getElementById('formLogin');

formulario.addEventListener('submit', login);

function login(e){
    e.preventDefault();
    
let usuarioVal = usuario.value;
let passwordVal = password.value;

if(usuarioVal == '' || passwordVal == ''){
    creaMensaje('Verifica los campos' , 'danger');
    return;
}

 console.log('el valor para user es:' + usuarioVal);
 console.log('el valor para password es:' + passwordVal);

  if(localStorage.getItem('usuario')){
    let objeto = JSON.parse(localStorage.getItem('usuario'));

    if(usuarioVal == objeto.user && passwordVal == objeto.pass ){
        creaMensaje('inicio de sesion exitoso', 'success');
        localStorage.setItem('sesion' , 'activa');
        setTimeout(function(){
             window.open('./inicio.html', '_set');
        },2000);
    } else {
        creaMensaje('usuario incorrecto', 'danger');
    }
  } else {
    creaMensaje('No hay registros', 'danger');
  }

}