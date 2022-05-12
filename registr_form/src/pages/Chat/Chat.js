import { useEffect } from "react"
import socketIOClient from 'socket.io-client'
import './Chat.css'

function Chat() {
    useEffect(() => {
        const socket = socketIOClient('http://localhost:4000')
        socket.on('FormApi', (data) => {
            // console.log(data);
        })
        socket.emit('H1', { data: 'Ann' })
    }, [])
    return (<>
        <div className="main_chat">
            
        </div>

    </>)
}
export default Chat