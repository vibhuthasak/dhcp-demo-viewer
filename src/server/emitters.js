export const watchDHCP = (socket, client) => {
    client.on('message', function (data) {
        let DHCPCode = "UNKNOWN"
        let arrowDirection = ""
        switch(data.options[53]) {
            case 1:
                DHCPCode = "DHCP DISCOVER"
                arrowDirection = "right"
                break
            case 2:
                DHCPCode = "DHCP OFFER"
                arrowDirection = "left"
                break
            case 3:
                DHCPCode = "DHCP REQUEST"
                arrowDirection = "right"
                break
            case 4:
                DHCPCode = "DHCP DECLINE"
                arrowDirection = "left"
                break
            case 5:
                DHCPCode = "DHC PACK"
                arrowDirection = "left"
                break
            case 6:
                DHCPCode = "DHCP NAK"
                arrowDirection = "left"
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
            arrowDirection
        });
    });
}
