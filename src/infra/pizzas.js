import { collection, addDoc, getDocs, doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function inserirPizza(novaPizza) {
    const docRef = await addDoc(collection(db, "pizzas"), novaPizza);
    return docRef.id;
}

export async function alterarPizza(pizza) {
    await setDoc(doc(db, "pizzas", pizza.id), pizza);
}

export async function buscarPizzas() {
    let lista;
    await getDocs(collection(db, "pizzas")).then((querySnapshot) => {
        lista = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
    });

    // Função para classificar as Pizzas
    function compararPizzas(a, b) {
        // Primeiro, comparar por sabor
        if (a.sabor < b.sabor) return -1;
        if (a.sabor > b.sabor) return 1;

        // Se os sabores forem iguais, comparar por tamanho
        if (a.tamanho < b.tamanho) return 1;
        if (a.tamanho > b.tamanho) return -1;

        // Se as pizzas são iguais
        return 0;
    }

    // Já devolve as Pizzas classificadas por sabor e tamanho
    return lista.sort(compararPizzas);
}

export async function buscarPizzaPorId(id) {
    const docRef = doc(db, "pizzas", id);
    const document = await getDoc(docRef);
    return document.data();
}

export async function excluirPizza(id) {
    await deleteDoc(doc(db, "pizzas", id));
}
