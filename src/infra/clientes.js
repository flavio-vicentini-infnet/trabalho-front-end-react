import { collection, addDoc, getDocs, getDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function inserirCliente(novoCliente) {
    const docRef = await addDoc(collection(db, "clientes"), novoCliente);
    return docRef.id;
}

export async function alterarCliente(cliente) {
    await setDoc(doc(db, "clientes", cliente.id), cliente);
}

export async function buscarClientes() {
    let lista;
    await getDocs(collection(db, "clientes")).then((querySnapshot) => {
        lista = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
    });

    function compararClientes(a, b) {
        if (a.nome < b.nome) return -1;
        if (a.nome > b.nome) return 1;

        return 0;
    }

    return lista.sort(compararClientes);
}

export async function buscaCliente(id) {
    const docRef = doc(db, "clientes", id);
    const document = await getDoc(docRef);
    return document.data();
}

export async function excluirCliente(id) {
    await deleteDoc(doc(db, "clientes", id));
}
