import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import styles from "./App.sass"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

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
        return messages.map((message, index) => {
            let DHCPCode = "";
            let arrowDirection = "";
            let description = "";
            try {
                const obj = JSON.parse(message)
                DHCPCode = obj.DHCPCode
                arrowDirection = obj.arrowDirection
                description = obj.description
            }
            catch (e) {

            }
            return (
                <div key={index} className={styles.messageBox}>
                    <div className={styles.index}>{index + 1} : {DHCPCode}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '2rem', background: 'crimson', margin: '5px' }}>
                        <ArrowComponent direction={arrowDirection} />
                    </div>
                    <div className={styles.queueHolder} style={{ background: "#7bb0de", margin: "5px" }}>
                        {description}
                    </div>
                    <div className={styles.message}>{message}</div>
                </div>
            )
        })
    }

    render() {
        const { messages } = this.state;
        return (
            <div className={styles.container}>
                { !messages.length ? <p className={styles.loader}>No DHCP messages to display</p> : null}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className={styles.clientBox} style={{ background: "#5e69ec" }}>
                        <div>
                            DHCP CLIENT
                        </div>
                    </div>
                    <div className={styles.queueHolder} style={{ maxWidth: "50%" }}>
                        {messages.length ? this.messageQueue : null}
                    </div>
                    <div className={styles.clientBox} style={{ background: "#43e81a" }}>
                        <div>
                            DHCP SERVER
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function ArrowComponent(props) {
    if (props.direction === "left") {
        return <FontAwesomeIcon icon={faLongArrowAltLeft} />
    } else if (arrowDirection === "right") {
        return <FontAwesomeIcon icon={faLongArrowAltRight} />
    } else {
        return ""
    }
}

export default App;
