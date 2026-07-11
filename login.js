import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Login successful!");

        window.location.href = "dashboard.html";

    } catch (error) {

        let message = "Login failed.";

        switch (error.code) {

            case "auth/invalid-credential":
                message = "Incorrect email or password.";
                break;

            case "auth/user-not-found":
                message = "Account not found.";
                break;

            case "auth/wrong-password":
                message = "Incorrect password.";
                break;

            case "auth/invalid-email":
                message = "Invalid email address.";
                break;

            case "auth/too-many-requests":
                message = "Too many attempts. Please try again later.";
                break;

            default:
                message = error.message;
        }

        alert(message);
        console.error(error);
    }

});
