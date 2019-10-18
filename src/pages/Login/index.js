import React, {useState} from 'react';
import api from '../../services/api';

export default function Login({history}) {

    const [email, setEmail] = useState(''); //desestruturar dois valores retornados do estado input

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/sessions', { email });

        const { _id } = response.data;
        localStorage.setItem('user', _id);

        history.push('/dashboard');
    }

    return (
        <>
            <p>
                Ofereça <strong>Spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa!
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button type="submit" className="btn">ENTRAR</button>
            </form>
        </>
    );
}