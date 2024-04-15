import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../infra/firebase";

export function logarUsuario(user, setUser) {
    if (user) {
        signInWithEmailAndPassword(auth, user.email, user.senha)
            .then((userCredential) => {
                setUser((actualUser) => {
                    const userReturn = {
                        ...actualUser,
                        ["id"]: userCredential.user.uid,
                    };
                    return userReturn;
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    } else {
        alert(`Login Inválido.`);
    }
}

export function deslogarUsuario(user, setUser) {
    signOut(auth)
        .then(() => {
            setUser({ id: "", email: "", senha: "" });
        })
        .catch((error) => {
            console.log(error);
        });
}

export function criarConta(user, setUser) {
    createUserWithEmailAndPassword(auth, user.email, user.senha)
        .then((credentials) => {
            setUser((actualUser) => {
                const newUser = {
                    ...actualUser,
                    ["id"]: credentials.user.uid,
                };
                return newUser;
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, " ", errorMessage);
        });
}
