document.addEventListener("DOMContentLoaded", () => {
    console.log("new DOMContentLoaded ", location.pathname);
    check()
    // localStorage.clear();

});

const SIGNIN_ENDPOINT = '/auth/signin';
const mainContainer = document.getElementById('app')

function loadSignInPage(){
    mainContainer.innerHTML = `
    <!-- div for signin -->
    <div class="signin" id="signinContainer">
      <div class="loginContainer login-email">
        <div class="login-email">
          <p class="login-text" style="font-size: 2rem; font-weight: 800">Login</p>
          <div class="input-group">
            <input type="email" placeholder="Email or Nickname" name="username" id="username" required />
          </div>
          <div class="input-group">
            <input type="password" placeholder="Password" name="password" id="password" required />
          </div>
          <div class="input-group">
            <button id="signin-btn" class="btn">Login</button>
          </div>
          <p id="error-msg"></p>
        </div>
      </div>
    </div>
    <!-- end signin div -->
    `;

    document.getElementById('signin-btn').addEventListener('click', async function (event) {
        event.preventDefault();
        console.log("button clicked");

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if(username === ""){
            document.getElementById('error-msg').innerHTML = "Please check your credentials and try again";
            document.getElementById('error-msg').style.color = 'red'
            document.getElementById('error-msg').style.margin = '5px'
            return
        }
        try {
            const token = await signIn({ username, password });
            // Redirect or perform other actions upon successful authentication

            if(token){
                console.log('Successfully authenticated. JWT:', token);
                // mainContainer.innerHTML = `
                // <h1>Hello ${username}!</h1>`
                loadProfile();
                loginInfo = username
            }
        } catch (error) {
          // Handle authentication error (display error message to the user, etc.)
            console.error('Login error:', error.message);
            document.getElementById('error-msg').innerHTML = error.message + "Please check your credentials and try again";
            document.getElementById('error-msg').style.color = 'red'
            document.getElementById('error-msg').style.margin = '5px'

        }
    });
}

async function signIn(credentials) {
    try {
        const authHeader = `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`;
        const token = await fetchData(SIGNIN_ENDPOINT, 'POST', null, authHeader);
        // Store the obtained JWT securely (in this case, using localStorage)
        localStorage.setItem('jwtToken', token);
        console.log("token from signin ", token);

        return token;

    } catch (error) {
        console.error('Authentication error:', error.message);
        throw new Error('Authentication failed.');
    }
}

function check(){
    if (localStorage.getItem('jwtToken')) {
      console.log("i aaaaam hereeeee");
        loadProfile();
    } else {
        loadSignInPage();
    }
}

