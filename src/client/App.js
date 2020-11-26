import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import styles from "./App.sass"

class App extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        };
        const endpoint = "http://localhost"
        const socket = socketIOClient(endpoint);
        socket.on("DHCP_STATUS", response => {
            this._incoming(response)
        });
    }

    _incoming = (response) => {
        const { messages } = this.state;
        this.setState({ messages: messages.concat([(typeof response === "object") ? JSON.stringify(response) : response]) })
    }

    componentDidMount() {
    }

    get messageQueue() {
        const { messages } = this.state;
        return messages.reverse().map((message, index) => {
            let DHCPCode = "";
            try {
                const obj = JSON.parse(message)
                DHCPCode = obj.DHCPCode
            }
            catch (e) {

            }
            return (
                <div key={index} className="">
                    <div className={styles.index}>{ messages.length - (index + 1) } : { DHCPCode }</div>
                    <div className={styles.message}>{ message }</div>
                </div>
            )
        })
    }

    render() {
        const { messages } = this.state;
        return (
            <div className={styles.container}>
                { !messages.length ? <p className={styles.loader}>Loading...</p> : null }
                <div className={styles.queueHolder}>
                    { messages.length ? this.messageQueue : null }
                </div>
            </div>
        );
    }
}
export default App;
