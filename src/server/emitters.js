export const watchDHCP = (socket, client) => {
    client.on('message', function (data) {
        let DHCPCode = "UNKNOWN"
        switch(data.options[53]) {
            case 1:
                DHCPCode = "DHCP DISCOVER"
                break
            case 2:
                DHCPCode = "DHCP OFFER"
                break
            case 3:
                DHCPCode = "DHCP REQUEST"
                break
            case 4:
                DHCPCode = "DHCP DECLINE"
                break
            case 5:
                DHCPCode = "DHC PACK"
                break
            case 6:
                DHCPCode = "DHCP NAK"
                break
            case 7:
                DHCPCode = "DHCP RELEASE"
                break
            case 8:
                DHCPCode = "DHCP INFORM"
                break
        }
        socket.emit("DHCP_STATUS", {
            ...data,
            DHCPCode
        });
    });
}
