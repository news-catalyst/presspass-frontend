import re
parse_host_header = re.compile(r"^(?P<host>[^:]+|\[.+\])(?::(?P<port>\d+))?$")


class Rerouter:
    def request(self, flow):
        m = parse_host_header.match(flow.request.host_header)
        host_header = m.group("host").strip("[]")
        if host_header == "api.dev.presspass.com":
            flow.request.host_header = "dev.squarelet.com"
            flow.request.port = 80
        elif host_header == "www.dev.presspass.com":
            flow.request.port = 3000
        else:
            flow.request.host_header = "example.com"
            flow.request.host = "example.com"
            flow.request.port = 80

addons = [Rerouter()]