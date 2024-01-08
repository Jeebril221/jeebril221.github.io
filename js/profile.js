async function loadProfile() {
    try {
        const authToken = localStorage.getItem('jwtToken');

        const userData = await fetchGraphQLData(queryUser, authToken);
        const user = userData.data.user[0]
        const userAudits = await fetchGraphQLData(
            `{
                audit(
                  where: {
                    auditorLogin: { _like: "djibsow" },
                  }
                  limit: 20
                  order_by: {createdAt: desc}
                ) {
                  grade
                  id
                  auditor {
                    login
                  }
                  group {
                    captainLogin
                    object {
                      name
                    }
                  }
                }
              }
              
              `, authToken);
        const audits = userAudits.data.audit
        console.log("User  Audits", userAudits);

        Profile(user)
        addAudits(audits)
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


function Profile(user){

    const dateOfBirthString = user.attrs.dateOfBirth;
    const dateOfBirth = new Date(dateOfBirthString);

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = dateOfBirth.toLocaleDateString('en-US', options);

    const ratio =  Math.round((user.auditRatio)*10 )/ 10
    const xps = user.xp.aggregate.sum.amount
    const xp = Math.ceil(xps/1000);

    const newHeader = `
    <met#aeb3b8et="utf-8">
    <title>Talent Profile</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="Free Website Template" name="keywords">
    <meta content="Free Website Template" name="description">

    <!-- Favicon -->
    <link href="img/favicon.ico" rel="icon">

    <!-- Google Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Icon Font Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Libraries Stylesheet -->
    <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="lib/lightbox/css/lightbox.min.css" rel="stylesheet">
    <link href="lib/animate/animate.min.css" rel="stylesheet">

    <!-- Customized Bootstrap Stylesheet -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Template Stylesheet -->
    <link href="css/style.css" rel="stylesheet">
    `

    const newBody = `
    <div class="container">
        <div class="row g-5">
            <div class="col-lg-4 sticky-lg-top vh-100">
                <div class="d-flex flex-column h-100 text-center overflow-auto shadow">
                    <img class="w-100 img-fluid mb-4" src="img/profile.png" alt="Image">
                    <button class="btn mt-2 btn-danger" id="logout">
                    <i class="bi bi-box-arrow-right"></i>
                    </button>
                    <h1 class="text-primary mt-2 ">${user.firstName} ${user.lastName}
                    </h1>
                    <div class="mb-4" style="height: 22px;">
                        <h4 class="typed-text-output d-inline-block text-light"></h4>
                        <div class="typed-text d-none">Recode Africa, With African Talents, Zone01 DAKAR</div>
                    </div>
                    <div class="d-flex justify-content-center mt-auto mb-3">
                        <h4 class="text-primary mt-2">Author : @djibsow</h4>
                        <a class="btn btn-secondary btn-square mx-1" href="#"><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-secondary btn-square mx-1" href="#"><i class="fab fa-facebook-f"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <!-- About Start -->
                <section class="py-5 border-bottom wow fadeInUp" data-wow-delay="0.1s">
                    <h1 class="title pb-3 mb-5">About Me</h1>
                    <p>Zone01 Dakar's talent.</p>
                    <div class="row mb-4">
                        <div class="col-sm-6 py-1">
                            <span class="fw-medium text-primary">Git:</span> ${user.login}
                        </div>
                        <div class="col-sm-6 py-1">
                            <span class="fw-medium text-primary">Id:</span> ${user.id}
                        </div>
                        <div class="col-sm-6 py-1">
                            <span class="fw-medium text-primary">Email:</span> ${user.email}
                        </div>
                        <div class="col-sm-6 py-1">
                            <span class="fw-medium text-primary">Campus:</span> ${user.campus}
                        </div>
                        <div class="col-sm-6 py-1">
                            <span class="fw-medium text-primary">Phone:</span> ${user.attrs.phone}
                        </div>
                        <div class="col-sm-6 py-1">
                            <span class="fw-medium text-primary">Last Degree:</span> ${user.attrs.lastDegree}
                        </div>
                        <div class="col-sm-6 py-1">
                            <span class="fw-medium text-primary">Date of Birth:</span> ${formattedDate}
                        </div>
                        <div class="col-sm-6 py-1">
                        <span class="fw-medium text-primary">Gender:</span> ${user.attrs.gender}
                    </div>
                    </div>
                    <div class="row g-4">
                        <div class="col-md-4 col-lg-6 col-xl-4">
                            <div class="d-flex bg-secondary p-4">
                                <h1 class="flex-shrink-0 display-5 text-primary mb-0" data-toggle="counter-up">${xp}</h1>
                                <div class="ps-3">
                                    <p class="mb-0">XP</p>
                                    <h5 class="mb-0">Amount</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-lg-6 col-xl-4">
                            <div class="d-flex bg-secondary p-4">
                                <h1 class="flex-shrink-0 display-5 text-primary mb-0" data-toggle="counter-up">${ratio}</h1>
                                <div class="ps-3">
                                    <p class="mb-0">Audit</p>
                                    <h5 class="mb-0">Ratio</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- About End -->

                <!-- Expericence Start -->
                <section class="py-5 wow fadeInUp" data-wow-delay="0.1s" id="section">
                </section>
                <!-- Expericence End -->

                <!-- Skills Start -->
                <section class="py-5 border-bottom wow fadeInUp" data-wow-delay="0.1s">
                    <h1 class="title pb-3 mb-5">Skills</h1>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="skill mb-4">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-2">HTML</p>
                                    <p class="mb-2">95%</p>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="skill mb-4">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-2">CSS</p>
                                    <p class="mb-2">85%</p>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="skill mb-4">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-2">PHP</p>
                                    <p class="mb-2">90%</p>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="skill mb-4">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-2">Javascript</p>
                                    <p class="mb-2">90%</p>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="skill mb-4">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-2">Angular JS</p>
                                    <p class="mb-2">95%</p>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-success" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="skill mb-4">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-2">Wordpress</p>
                                    <p class="mb-2">85%</p>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-info" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- Skills End -->

                <!-- Footer Start -->
                <section class="wow fadeIn" data-wow-delay="0.1s">
                    <div class="bg-secondary text-light text-center p-5">
                        <div class="d-flex justify-content-center mb-4">
                            <a class="btn btn-dark btn-square mx-1" href="#"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-dark btn-square mx-1" href="#"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-dark btn-square mx-1" href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a class="btn btn-dark btn-square mx-1" href="#"><i class="fab fa-instagram"></i></a>
                        </div>
                        <div class="d-flex justify-content-center mb-3">
                            <a class="text-light px-3 border-end" href="#">Privacy</a>
                            <a class="text-light px-3 border-end" href="#">Terms</a>
                            <a class="text-light px-3 border-end" href="#">FAQs</a>
                            <a class="text-light px-3" href="#">Help</a>
                        </div>
                        
                        <!--/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/-->
                        <p class="m-0">&copy; All Rights Reserved. Designed by <a href="https://htmlcodex.com">HTML Codex</a></p>
                    </div>
                </section>
                <!-- Footer End -->
            </div>
        </div>
    </div>

    
    <!-- Back to Top -->
    <a href="#" class="back-to-top"><i class="fa fa-angle-double-up"></i></a>
    
    <!-- JavaScript Libraries -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
    <script src="lib/wow/wow.min.js"></script>
    <script src="lib/typed/typed.min.js"></script>
    <script src="lib/easing/easing.min.js"></script>
    <script src="lib/waypoints/waypoints.min.js"></script>
    <script src="lib/counterup/counterup.min.js"></script>
    <script src="lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="lib/isotope/isotope.pkgd.min.js"></script>
    <script src="lib/lightbox/js/lightbox.min.js"></script>

    <!-- Contact Javascript File -->
    <script src="mail/jqBootstrapValidation.min.js"></script>
    <script src="mail/contact.js"></script>

    <!-- Template Javascript -->
    <script src="js/main.js"></script>
    <script src="js/app.js"></script>
    <script src="js/login.js"></script>
    <script src="js/profile.js"></script>
    <script src="js/statisticgraph.js"></script>
    <script src="js/graphql.js"></script>
    `

    
    document.head.innerHTML = newHeader;
    document.body.innerHTML = newBody;
}

function addAudits(audits) {
    console.log("auditsss ", audits);

    var parentElement = document.getElementById('section');
    const title = document.createElement('h1');
    title.classList.add('title', 'mb-5', 'pb-3');
    title.textContent = 'Your last 10 audits'

    parentElement.appendChild(title)
    audits.forEach(function (audit) {
        console.log("audiiit ", audit);
        if (audit.grade === null) {
            return;
        }
        
        var newAudit = document.createElement('div');
        newAudit.classList.add('position-relative', 'mb-4');

        var flecheIcon = document.createElement('span');
        flecheIcon.classList.add('bi', 'bi-arrow-right', 'fs-4', 'text-light', 'position-absolute');
        flecheIcon.style.top = '-5px';
        flecheIcon.style.left = '-50px';

        var titreElement = document.createElement('h5');
        titreElement.classList.add('mb-1');
        titreElement.textContent = audit.group.object.name;

        var entrepriseElement = document.createElement('p');
        entrepriseElement.classList.add('mb-2');
        entrepriseElement.innerHTML = audit.group.captainLogin + ' | ';

        var gradeElement = document.createElement('small');
        gradeElement.textContent = audit.grade !== 0 ? 'Pass' : 'Fail';
        gradeElement.style.color = audit.grade !== 0 ? 'green' : 'red';

        entrepriseElement.appendChild(gradeElement);

        newAudit.appendChild(flecheIcon);
        newAudit.appendChild(titreElement);
        newAudit.appendChild(entrepriseElement);
        // newAudit.appendChild(descriptionElement);

        parentElement.appendChild(newAudit);
    });
}
