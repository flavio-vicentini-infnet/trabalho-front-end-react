import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function inserirPedido(novopedido) {
    const docRef = await addDoc(collection(db, "pedidos"), novopedido);
    return docRef.id;
}

export async function buscarPedidos() {
    let lista;
    await getDocs(collection(db, "pedidos")).then((querySnapshot) => {
        lista = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
    });

    function compararPedidos(a, b) {
        if (a.horaPedido < b.horaPedido) return 1;
        if (a.horaPedido > b.horaPedido) return -1;

        return 0;
    }

    return lista.sort(compararPedidos);
}

export async function excluirPedido(id) {
    await deleteDoc(doc(db, "pedidos", id));
}
