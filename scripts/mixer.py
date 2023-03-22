def getPart(address):
    addr = address[2:]  # Remove the "0x" prefix

    x = addr[0:1]
    r = addr[1:5]
    w = addr[5:9]
    z = addr[9:13]
    s = addr[13:17]
    v = addr[17:21]
    y = addr[21:25]
    u = addr[25:29]
    t = addr[29:]  # Adjust this line to capture the remaining characters

    return r, s, t, u, v, w, x, y, z
