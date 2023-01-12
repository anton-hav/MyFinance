import { Button } from "../../../imports/ui.imports";
import { Link } from "../../../imports/navigation.imports";

import "./pageNavBarItem.component.css";

export function PageNavBarItem(props) {
  const { pages } = props;
  return (
    <>
      {pages.map((page) => (
        <Link key={page} className="nav-link" to={`${page}/`}>
          <Button className="button">{page}</Button>
        </Link>
      ))}
    </>
  );
}
