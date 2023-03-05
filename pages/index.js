import TableView from "../components/TableView";
import config from "../public/config.json";

export default function Index() {
  return <TableView {...config} />;
}
