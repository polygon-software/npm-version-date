import { format } from 'date-fns'
import pkgJson from "./pkgjson.js";

export default function versionAssembler(schema, V, increasePatch) {
  const date = new Date();
  return schema
    .split(".")
    .map((schema_part) => {
      if (schema_part === "V") { return V; }
      if (schema_part === "P") { return increasePatch ? `${Number(pkgJson.getPatch())+1}` : pkgJson.getPatch(); }
      return format(date, schema_part);
    })
    .join(".")
}
