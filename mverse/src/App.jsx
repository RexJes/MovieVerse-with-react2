import { useEffect, useState } from "react";
import "./App.css";
import { getPopularMovieList, getOngoingMovieList, searchMovie } from "./api";
import darkMode from "./main";
import reRender from "./main";
import NavigationBar from "./components/NavigationBar";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [ongoingMovies, setOngoingMovieList] = useState([]);

  useEffect(() => {
    // Trending / Popular
    getPopularMovieList().then((result) => {
      setPopularMovies(result);
    });

    // Ongoing
    getOngoingMovieList().then((result) => {
      setOngoingMovieList(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div key={i} className="col">
          <div className="card gb">
            <a
              href="detailMovie.html"
              className="teks"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            >
              <img
                src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
                className="card-img-top gambar"
                alt="..."
              />
              <div className="card-body teks">
                <h5 className="card-title">{movie.title}</h5>
                <div className="Movie-id">ID:{movie.id}</div>
                <p className="card-text">
                  Rate: {movie.vote_average} ({movie.popularity})
                </p>
                <p className="overview">{movie.overview}</p>
              </div>
            </a>

            {/* Card modal */}

            <div
              className="modal fade"
              id="exampleModal1"
              tabIndex="-"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <img
                      src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
                      className="img-fluid gambar"
                      alt=""
                    />
                  </div>
                  <div className="modal-body" style={{ color: "black" }}>
                    <h1
                      className="modal-title fs-5"
                      style={{ color: "black" }}
                      id="exampleModalLabel"
                    >
                      {movie.title}
                    </h1>
                    <p>{movie.overview}</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <a href="">
                      <button
                        type="button"
                        className="btn btn-warning"
                        style={{ color: "black" }}
                        id="exampleModalLabel"
                      >
                        Watch now
                      </button>
                    </a>
                    <button
                      type="button"
                      className="btn btn-warning"
                      style={{ color: "black" }}
                      id="exampleModalLabel"
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      style={{ color: "black" }}
                      id="exampleModalLabel"
                    >
                      Add to watchlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/*Card  Modal */}
          </div>
        </div>
      );
    });
  };

  const OngoingMovieList = () => {
    return ongoingMovies.map((movie, i) => {
      return (
        <div key={i} className="col">
          <div className="card gb">
            <a
              href="detailMovie.jsx"
              className="teks"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            >
              <img
                src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
                className="card-img-top gambar"
                alt="..."
              />
              <div className="card-body teks">
                <h5 className="card-title">{movie.title}</h5>
                <div className="Movie-id">ID:{movie.id}</div>
                <p className="card-text">
                  Rate: {movie.vote_average} ({movie.popularity})
                </p>
                <p className="overview">{movie.overview}</p>
              </div>
            </a>
          </div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length >= 1) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
      setOngoingMovieList(query.results);
      console.log({ query: query });
    }
  };

  return (
    <>
      {/* <NavigationBar></NavigationBar> */}
      {/* Header Start */}
      <header className="shadow">
        <div className="Movie-container"></div>

        {/* modal sign in */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  style={{ color: "black" }}
                  id="exampleModalLabel"
                >
                  Sign In
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label"
                      style={{ color: "black" }}
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    <div
                      id="emailHelp"
                      className="form-text"
                      style={{ color: "black" }}
                    >
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                      style={{ color: "black" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleCheck1"
                      style={{ color: "black" }}
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    style={{ color: "black" }}
                  >
                    Submit
                  </button>
                  <br />
                  <br />
                  <h6 style={{ color: "black" }}>
                    dint have account?
                    <button
                      type="submit"
                      className="btn btn-link"
                      style={{ color: "black" }}
                    >
                      Sign up here
                    </button>
                  </h6>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* modal sign in */}
        {/* nav */}
        <nav className="my-navbar navbar navbar-expand-lg">
          <div className="container">
            <a className="my-logo navbar-brand" href="index.html">
              <hr />
              <span>M</span>ovie<span>V</span>erse
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    // onClick={reRender()}
                    id="home"
                    className="nav-link my-hover"
                    aria-current="page"
                    href="index.html"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link my-hover" href="#">
                    Movie Collection
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link my-hover" href="detailMovie.html">
                    Random
                  </a>
                </li>
              </ul>
              <div className="row">
                <div className="col-9">
                  {/* sign in */}
                  <div className="container">
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Sign In
                    </button>
                  </div>
                  {/* sign in */}
                </div>
                <div className="col-3 center">
                  {/* menu bar */}
                  <div className="btn-group dropstart">
                    <button
                      type="button"
                      className="btn my-hover"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        fill="currentColor"
                        className="bi bi-list"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                        />
                      </svg>
                    </button>
                    <ul className="dropdown-menu ">
                      {/* Dropdown menu links */}
                      <li className="my-burgMenu">
                        <a className="dropdown-item" href="#">
                          {" "}
                          Watchlist
                        </a>
                      </li>
                      <li className="my-burgMenu">
                        <a className="dropdown-item" href="#">
                          Notify List
                        </a>
                      </li>
                      <li className="my-burgMenu">
                        <a className="dropdown-item" href="#">
                          Favorite
                        </a>
                      </li>
                      <li className="my-burgMenu">
                        <a className="dropdown-item" href="#">
                          Downloaded
                        </a>
                      </li>
                      <li className="my-burgMenu">
                        <a
                          // onClick={darkMode()}
                          id="mode"
                          className="dropdown-item"
                          href="#"
                        >
                          Dark Mode
                        </a>
                      </li>
                      <li className="my-burgMenu">
                        <a className="dropdown-item" href="#">
                          Setting
                        </a>
                      </li>
                      {/* Dropdown menu links */}
                    </ul>
                  </div>
                  {/* menu bar */}
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* nav */}
        {/* Header Carousel Start */}
        <div className="carouselExampleSlidesOnly">
          <div
            id="carouselExampleCaptions"
            className="mycarousel carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={0}
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={1}
                aria-label="Slide 2"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={2}
                aria-label="Slide 3"
              />
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <video
                  src="Assetss/Loop video/BA (online-video-cutter.com) hemat.webm"
                  className="d-block w-100"
                  alt="..."
                  autoPlay
                  loop
                  muted
                />
                <div className="carousel-caption d-md-block">
                  <a href="detailMovie.html" className="teks">
                    <h1 style={{ color: "#FFC107" }}>Blue Archive</h1>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti, eius.
                    </p>
                  </a>
                </div>
              </div>
              <div className="carousel-item">
                <video
                  src="Assetss/Loop video/Wakanda s1 (online-video-cutter.com).webm"
                  className="d-block w-100"
                  alt="..."
                  autoPlay
                  loop
                  muted
                />
                <div className="carousel-caption  d-md-block">
                  <a href="detailMovie.html" className="teks">
                    <h1 style={{ color: "#FFC107" }}>Wakanda Forever</h1>
                    <p>
                      Some representative placeholder content for the first
                      slide.
                    </p>
                  </a>
                </div>
              </div>
              <div className="carousel-item">
                <video
                  src="Assetss/Loop video/videoplayback_online-video-cutter.com.webm"
                  className="d-block w-100"
                  alt="..."
                  autoPlay
                  loop
                  muted
                />
                <div className="carousel-caption d-md-block">
                  <a href="detailMovie.html" className="teks">
                    <h1 style={{ color: "#FFC107" }}>The Walking Death</h1>
                    <p>
                      Some representative placeholder content for the first
                      slide.
                    </p>
                  </a>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        {/* Header Carousel END */}
      </header>
      {/* Header END */}
      {/* Content START */}
      <main>
        {/* Bread crum */}
        <div className="container mt-5">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item ">
                <a href="index.html" className="teks">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {" "}
              </li>
            </ol>
          </nav>
        </div>
        {/* Bread crum */}
        {/* Continue to watch START */}
        <section className="section-1 container">
          <div
            id="carouselExampleIndicators"
            className="carousel slide kotakctw"
          >
            <div className="p-5 mt-5 carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="Assetss/BA/shitim chest.jpg"
                        alt=""
                        className="img-fluid gambar"
                      />
                    </div>
                    <div className="col-md-6">
                      <a href="detailMovie.html" className="teks my-hover">
                        <h4 className="mt-5" style={{ color: "#FFC107" }}>
                          Continue to Watch
                        </h4>
                        <h1 style={{ color: "white" }}>Blue Archive</h1>
                        <p style={{ color: "white" }}>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Hic, neque.
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="Assetss/BA/2.png"
                        alt=""
                        className="img-fluid gambar"
                      />
                    </div>
                    <div className="col-md-6">
                      <a href="detailMovie.html" className="teks my-hover">
                        <h4 className="mt-5" style={{ color: "#FFC107" }}>
                          Continue to Watch
                        </h4>
                        <h1>Blue Archive</h1>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Hic, neque.
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="Assetss/BA/3.png"
                        alt=""
                        className="img-fluid gambar"
                      />
                    </div>
                    <div className="col-md-6">
                      <a href="detailMovie.html" className="teks my-hover">
                        <h4 className="mt-5" style={{ color: "#FFC107" }}>
                          Continue to Watch
                        </h4>
                        <h1>Blue Archive</h1>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Hic, neque.
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <br />
            </div>
            {/* indicator */}
            <div className="col-12">
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={0}
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={1}
                  aria-label="Slide 2"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={2}
                  aria-label="Slide 3"
                />
              </div>
            </div>
          </div>
          {/* carrousel */}
        </section>
        {/* Continue to watch END*/}

        {/* search bar */}
        <div className="searchbar container">
          <form className="d-flex mt-5" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search something here"
              aria-label="Search"
              onChange={({ target }) => search(target.value)}
            />
            <button className="btn btn-warning" type="submit">
              Search
            </button>
          </form>
        </div>
        {/* search bar */}

        {/* Grid 1 Trening START*/}
        <div className="container mt-5">
          <div className="row">
            <div className="row">
              <div className=" col-sm-10">
                <h3 className=" ">Trending Now</h3>
              </div>
              <div className=" col-sm-2">
                <h5 className="btn center">Show all</h5>
              </div>
            </div>

            {/* grid */}
            <div className="container mt-2">
              <div className="row row-cols-1 row-cols-md-4 g-4">
                <PopularMovieList />
              </div>
            </div>
            {/* grid */}
          </div>
        </div>
        {/* Gridd 1 Trending END*/}

        {/* Grid 2 START */}
        <div className="container mt-5">
          <div className="row">
            <div className="row">
              <div className=" col-sm-10">
                <h3 className=" ">Ongoing Now</h3>
              </div>
              <div className=" col-sm-2">
                <h5 className="btn center">Show all</h5>
              </div>
            </div>

            {/* grid */}
            <div className="container mt-2">
              <div className="row row-cols-1 row-cols-md-4 g-4">
                <OngoingMovieList />
              </div>
            </div>
            {/* grid */}
          </div>
        </div>
        {/* Grid 2 END */}
      </main>
      {/* Content END */}

      {/* Footer START */}
      <footer>
        <div className="footer">
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-2 mt-5">
                <a
                  href="index.html"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <h4 href="index.html">MovieVerse</h4>
                </a>
                <p className="mt-5">© 2023 MovieVerse</p>
              </div>
              {/* Teks */}
              <div className="col-md-3">
                <ul style={{ listStyle: "none" }}>
                  <h6 className="mt-5">Didn't see what you want?</h6>
                  <li>
                    <a
                      href="#"
                      className="mt-3"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Upcoming
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="mt-3"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Most Requested
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="mt-3"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Request Movie
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <ul style={{ listStyle: "none" }}>
                  <h6 className="mt-5">Need Help?</h6>
                  <li>
                    <a
                      href="#"
                      className="mt-3"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="mt-3"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasScrolling"
                      aria-controls="offcanvasScrolling"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Contact us
                    </a>
                  </li>
                </ul>
              </div>
              {/* test chat */}
              <div
                className="offcanvas offcanvas-start"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabIndex={-1}
                id="offcanvasScrolling"
                aria-labelledby="offcanvasScrollingLabel"
              >
                <div className="offcanvas-header">
                  <h5
                    className="offcanvas-title teks"
                    id="offcanvasScrollingLabel"
                  >
                    Need more help?
                  </h5>
                  <button
                    type="button"
                    className="btn-close bg-light"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  />
                </div>
                <div className="offcanvas-body">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label teks"
                    >
                      Your name
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label teks"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="movieverse@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label teks"
                    >
                      Tell us
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={3}
                      defaultValue={""}
                    />
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-warning mb-3">
                      Send
                    </button>
                  </div>
                </div>
              </div>
              {/* test chat */}
              <div className="col-md-4">
                <h6 className="mt-5">Follow us</h6>
                <a href="" className="m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </a>
                <a href="" className="m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </a>
                <a href="" className="m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                </a>
                <a href="" className="m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    className="bi bi-youtube"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                  </svg>
                </a>
              </div>
              {/* Teks */}
            </div>
          </div>
        </div>
      </footer>
      {/* Footer END */}
      {/* Script */}
      {/* Script */}
    </>
  );
}

export default App;
