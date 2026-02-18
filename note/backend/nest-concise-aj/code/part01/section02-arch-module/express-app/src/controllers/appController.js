import { getHelloService } from "../services/appService";

export function getHello(req, res) {
  return res.send(getHelloService());
}
