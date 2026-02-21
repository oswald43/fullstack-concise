import { connection } from "../db/connection.js";

const getCompanyTable = () => connection.table("company");

export async function getCompany(id) {
  return await getCompanyTable().first().where({ id });
}
