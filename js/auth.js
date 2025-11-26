// Lógica de Login (validación básica + remember)
const emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const $=sel=>document.querySelector(sel);

const email=$('#email');
const emailError=$('#emailError');
const pass=$('#password');
const passError=$('#passwordError');
const form=$('#loginForm');
const toggle=document.querySelector('.toggle-pass');
const success=$('#successMsg');

const setError=(el,msg)=>{
  el.textContent=msg||"";
  const input=el.previousElementSibling?.querySelector('input')||null;
  if(input) input.setAttribute('aria-invalid', msg? 'true':'false');
};

toggle.addEventListener('click',()=>{
  const isPassword=pass.type==='password';
  pass.type= isPassword ? 'text' : 'password';
  toggle.textContent = isPassword ? '🙈' : '👁️';
  toggle.setAttribute('aria-label', isPassword? 'Ocultar contraseña':'Mostrar contraseña');
  pass.focus();
});

email.addEventListener('input',()=>{
  setError(emailError, email.value && !emailRe.test(email.value) ? 'Formato de correo no válido.' : '');
});

pass.addEventListener('input',()=>{
  setError(passError, pass.value && pass.value.length<6 ? 'Mínimo 6 caracteres.' : '');
});

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  let ok=true;
  if(!email.value){ setError(emailError,'Este campo es obligatorio.'); ok=false; }
  else if(!emailRe.test(email.value)){ setError(emailError,'Formato de correo no válido.'); ok=false; } else setError(emailError,'');

  if(!pass.value){ setError(passError,'Este campo es obligatorio.'); ok=false; }
  else if(pass.value.length<6){ setError(passError,'Mínimo 6 caracteres.'); ok=false; } else setError(passError,'');

  if(!ok){ success.style.display='none'; return; }

  const remember=$('#remember').checked;
  if(remember){ localStorage.setItem('lastEmail', email.value); }
  else{ localStorage.removeItem('lastEmail'); }

  success.style.display='block';
  // TODO: Redirigir a un dashboard simulado
  // location.href = '/dashboard.html';
});

window.addEventListener('DOMContentLoaded',()=>{
  const saved=localStorage.getItem('lastEmail');
  if(saved){ email.value=saved; email.dispatchEvent(new Event('input')); }
});