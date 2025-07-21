import { Link, useLocation } from "react-router";

const PageNotFound = () => {
  const pathname = useLocation().pathname;

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-2">
      <h1 className="text-center text-lg font-semibold">
        Sorry, the page you're looking for doesn't exist: {pathname}.
      </h1>
      <span>
        Go back to{" "}
        <Link to="/" className="text-primary">
          Home
        </Link>
      </span>
    </div>
  );
};

export default PageNotFound;
