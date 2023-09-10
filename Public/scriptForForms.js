const forms = document.querySelector('.content'),
                logInBtn = document.getElementById("logInBtn"),
                changeBtn = document.getElementById("changeBtn"),
                showPasswordBtn = document.getElementById("showPasswordBtn"),
                showPasswordBtn2 = document.getElementById("showPasswordBtn2"),
                password = document.getElementById("password"),
                email2 = document.getElementById("email2"),
                name2 = document.getElementById("name2"),
                password2 = document.getElementById("password2"),
                nameError = document.getElementById("nameError"),
                emailError = document.getElementById("emailError"),
                passwordError = document.getElementById("passwordError");



            changeBtn.innerText = 'Create account';
            changeBtn.addEventListener('click', () => {
                logIn.classList.toggle('hidden');
                signUp.classList.toggle('hidden');
                forms.classList.toggle('blackTheme');
                document.querySelectorAll('.signUpInputs').forEach(el => {
                    el.classList.toggle('blackInputs')
                })
                changeBtn.classList.toggle('blackTheme');
                if (!changeBtn.matches('.blackTheme')) {
                    changeBtn.innerText = "Login to account"
                }else {
                    changeBtn.innerText = 'Create account';
                }
            })

            //'Show Password' Button
            const showPassword = (passwordTyped, checkbox) => {
                if (checkbox.checked){
                    passwordTyped.type = 'text'
                } else {
                    passwordTyped.type = 'password'
                }
            };
            showPasswordBtn.addEventListener('click', () => {
                showPassword(password, showPasswordBtn);
            });
            showPasswordBtn2.addEventListener('click', () => {
                showPassword(password2, showPasswordBtn2);
            });


            //validating form
            signUp.addEventListener('submit', (e) => {
                let messageForName = [],
                messageForPassword = [];
                messageForEmail = [];
                passwordError.innerHTML = null;
                nameError.innerHTML = null;
                emailError.innerHTML = null;
                name2.classList.remove('errorInput');
                password2.classList.remove('errorInput');
                email2.classList.remove('errorInput');

                //NAME VALIDATION
                if (name2.value == '' || name2.value == null) {
                    messageForName.push('Enter your name')
                }else if (name2.value.length <= 3){
                    messageForName.push('Name length must be longer than 3 characters')
                } else if (name2.value.length >= 12) {
                    messageForName.push('Name length must be shorter than 12 characters')
                } else if (name2.value == '' || name2.value == null){
                    messageForName.push('Enter your name')
                }
                
                //PASSWORD VALIDATION
                if (password2.value == ''|| password.value == null){
                    messageForPassword.push('Enter your password')
                }else if (password2.value.length <= 5){
                    messageForPassword.push('Password can\'t be shorter than 5')
                }else if (password2.value.length > 20){
                    messageForPassword.push('Password can\'t be longer than 20')
                }
                if (/^\D+$/.test(password2.value)){
                messageForPassword.push('Must contain numbers')
                } 
                //EMAIL VALIDATION
                if(email2.value == '' || email2.value == null){
                    messageForEmail.push('Enter your email');
                }else if(!/^([\w-\.]+)@([a-z]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(email2.value)){
                    messageForEmail.push('Invalid email')
                }
            

                if (messageForName.length > 0) {
                    e.preventDefault();
                    nameError.append(messageForName.join(' | '));
                    name2.classList.add('errorInput');
                }
                if (messageForPassword.length > 0) {
                    e.preventDefault();
                    passwordError.append(messageForPassword.join(' | '));
                    password2.classList.add('errorInput');
                }
                if (messageForEmail.length > 0){
                    e.preventDefault();
                    emailError.append(messageForEmail.join(' | '))
                    email2.classList.add('errorInput')
                }
                
            })