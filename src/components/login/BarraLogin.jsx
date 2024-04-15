import Login from "./Login";

export default function BarraLogin({ user, setUser }) {
    return (
        <>
            <Login user={user} setUser={setUser} />
        </>
    );
}
