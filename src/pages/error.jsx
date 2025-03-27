import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // Kiểm tra nếu error không phải là object mong đợi
  const errorMessage = error && typeof error === "object" ? error.statusText || error.message || "Unknown error" : "Unknown error";


  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <div>
        <Link to="/">
          <button>Go to Home</button>
        </Link>
      </div>
    </div>
  );
}