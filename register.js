import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        // Create Firebase account
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        // Save display name
        await updateProfile(user, {
            displayName: name
        });

        // Create Firestore user document
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,

            wallet: 0,

            totalOrders: 0,

            totalSpent: 0,

            accountType: "User",

            createdAt: serverTimestamp()
        });

        alert("Registration successful!");

        window.location.href = "dashboard.html";

    } catch (error) {

        alert(error.message);

        console.error(error);

    }

});
