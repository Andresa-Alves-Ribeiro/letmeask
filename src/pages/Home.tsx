import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Illustration from '../assets/Images/illustration.svg';
import logoimg from '../assets/Images/logo.svg';
import googleIconImg from '../assets/Images/google-icon.svg'
import { useNavigate } from "react-router-dom";
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function Home() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        navigate('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() ===  '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        
        if (!roomRef.exists()) {
            alert('Room does not exists!');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already closed!');
            return;
        }

        navigate(`/rooms/${roomCode}`);
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={Illustration} alt='Ilustração simbolizando perguntas e respostas' />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real.</p>
            </aside>

            <main>
                <div className='main-content'>
                    <img src={logoimg} alt='letmeask'/>

                    <button onClick={handleCreateRoom} className="create-room">
                    <img src={googleIconImg} alt='logo do google'/>
                    Crie sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type='text'
                        placeholder='Digite o código da sala'
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />

                        <Button type='submit'>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}