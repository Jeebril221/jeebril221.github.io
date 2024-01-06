async function loadProfile() {
    try {
        const authToken = localStorage.getItem('jwtToken');

        const userData = await fetchGraphQLData(queryUser, authToken);
        
        // console.log("Auth Token", token);
        // console.log("User  Data", userData);
        
        mainContainer.innerHTML = `
            <h1>Hello there!</h1>
            <h2 id="username">Username: ${userData.data.user[0].login}</h2>
            <h3 id="firstName">First Name: ${userData.data.user[0].firstName}</h3>
            <h3 id="lastName">Last Name: ${userData.data.user[0].lastName}</h3>
            <a id="logout" href="#">Log out</a>
        `;

        document.getElementById('logout').addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.clear();
            loadSignInPage();
        });

    } catch (error) {
        console.error('Error loading profile:', error.message);
        // Handle error, for example, redirect to login page
        // loadSignInPage();
    }
}
