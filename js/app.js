document.addEventListener('DOMContentLoaded', function(){

	const emailObj = {
		name: '',
		email: '',
		message: ''
	}

	// Select DOM elements
	const inputName = document.querySelector('#name');
	const inputEmail = document.querySelector('#email');
	const inputMessage = document.querySelector('#message');
	const form = document.querySelector('#form');
	const btnSubmit = document.querySelector('button.btn[type="submit"]');

	inputName.addEventListener('blur', validate);

	inputEmail.addEventListener('blur', validate);

	inputMessage.addEventListener('blur', validate);

	function validate(e){
		if (e.target.value.trim() === '') {
			showAlert(`The field ${e.target.id} is required`,e.target.parentElement);
			emailObj[e.target.name] = '';
			checkEmail();
			return;
		} 

		if(e.target.id === 'email' && !validateEmail(e.target.value)){
			showAlert('Not valid email', e.target.parentElement);
			emailObj[e.target.name] = '';
			checkEmail();
			return;
		}
		clearAlert(e.target.parentElement);

		emailObj[e.target.name] = e.target.value.trim().toLowerCase();

		checkEmail();
	}

	function showAlert(errorMessage, reference){
		clearAlert(reference);
		const error = document.querySelector('P');
		error.textContent = errorMessage;
		error.classList.add('text-danger', 'mt-1')

		reference.appendChild(error);
	}

	function clearAlert(reference){
		const alert = reference.querySelector('.text-danger');
		if (alert) {
			alert.remove();
		}
	}

	function validateEmail(email){
		const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
		const result = regex.test(email);
		return result;

	}

	function checkEmail() {
		console.log(emailObj)
		if (Object.values(emailObj).includes('')) {
			btnSubmit.disabled = true;
			return;
		} 
		btnSubmit.disabled = false;
	}
});

