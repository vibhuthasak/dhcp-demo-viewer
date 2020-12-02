export const watchDHCP = (socket, client) => {
    client.on('message', function (data) {
        let DHCPCode = "UNKNOWN"
        let arrowDirection = ""
        let description = ""
        switch (data.options[53]) {
            case 1:
                DHCPCode = "DHCP DISCOVER"
                arrowDirection = "right"
                description = `A user turns on a computer with a DHCP client. The client computer sends a broadcast request (called a DISCOVER or DHCPDISCOVER), looking for a DHCP server to answer. The router directs the DISCOVER packet to the correct DHCP server. The server receives the DISCOVER packet. DHCPDISCOVER message can be broadcasted constantly during a scenario where DHCP server IP pool is exceeded.`
                break
            case 2:
                DHCPCode = "DHCP OFFER"
                arrowDirection = "left"
                description = `The DHCP Offer message broadcasted is delivered to all the clients on the same subnet network, including the one that sent the DHCP Discover message.`
                break
            case 3:
                DHCPCode = "DHCP REQUEST"
                arrowDirection = "right"
                description = `The client, having received the DHCP Offer message, recognizes there is a DHCP server available on the same subnet. Then it broadcasts a DHCP Request message to the server over the Ethernet network, requesting network configuration data including an IP address for itself`
                break
            case 4:
                DHCPCode = "DHCP DECLINE"
                arrowDirection = "left"
                break
            case 5:
                DHCPCode = "DHC PACK"
                arrowDirection = "left"
                description = `DHCP PACK message indicates DHCP connectivity has been successfully established`
                break
            case 6:
                DHCPCode = "DHCP NAK"
                arrowDirection = "left"
                description = `DHCP NAK indicates client is trying to request an IP which has been already reserved and DHCP server denies the request for the same IP which could lead to an IP conflict.`
                break
            case 7:
                DHCPCode = "DHCP RELEASE"
                arrowDirection = "right"
                break
            case 8:
                DHCPCode = "DHCP INFORM"
                arrowDirection = "right"
                break
        }
        socket.emit("DHCP_STATUS", {
            ...data,
            DHCPCode,
            arrowDirection,
            description
        });
    });
}
